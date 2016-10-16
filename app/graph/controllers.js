(function () {
    'use strict';

    angular.module('Graph.Controllers', []);

    angular.module('Graph.Controllers')
        .controller('Graph.MainController', MainController)
        .controller('Graph.SettingsController', SettingsController)
    ;

    ////////////////

    MainController.$inject = ['$scope', 'GraphDataService', '$prompt', '$confirm', '$timeout', '$dialog'];

    /**
     * Main controller for the graph interface.
     *
     * @param {*} $scope
     * @param {*} GraphDataService
     * @param {*} $prompt
     * @param {*} $confirm
     * @param {*} $timeout
     * @param {*} $dialog
     *
     * @constructor
     */
    function MainController ($scope, GraphDataService, $prompt, $confirm, $timeout, $dialog) {
        var vm = this;

        vm.columns = [];
        vm.chartTypes = [];
        vm.scales = [];
        vm.settings = [];

        $scope.$watch('vm.setting', settingWatcher);

        function settingWatcher (valueNew, valueOld) {
            if (valueNew && valueNew !== valueOld) {
                angular.forEach(vm.settings, function (setting) {
                   if (setting.id == valueNew) {
                       vm.graph = setting.setting;
                   }
                });
            }
        }

        /**
         * Initialize the interface's data.
         */
        vm.init = function init () {
            GraphDataService
                .getColumns()
                .then(onSuccess);

            function onSuccess (data) {
                vm.columns = data.data;

                vm.reset();
            }
        };

        /**
         * Load data by the settings.
         */
        vm.load = function load () {
            vm.loading = true;
            vm.data = {};

            if ($scope.form_search_settings.$invalid) {
                return;
            }

            var params = angular.copy(vm.graph);
            params.scale = vm.scales[vm.graph.scale].type;

            GraphDataService.getData(params)
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Called when the data fetch is done.
             *
             * @param {*}   data
             */
            function onSuccess (data) {
                vm.data = data.data;
            }

            /**
             * Called after the query is done.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        /**
         * Reset the search setting.
         */
        vm.reset = function reset () {
            vm.graph = {
                chartType: 0,
                scale: 0
            };

            vm.setting = -1;
            vm.data = {};
            vm.graph.endDateTime = new Date();
            vm.graph.startDateTime = new Date(new Date().setDate(vm.graph.endDateTime.getDate() - 1));
        };

        /**
         * Save the search setting.
         */
        vm.save = function save () {
            var opts = {
                title: 'GIVE_THIS_SEARCH_A_NAME',
                textContent: 'DESC_GIVE_THIS_SEARCH_A_NAME',
                placeholder: 'NAME_FOR_YOUR_SAVED_SEARCH',
                value: vm.graph.name
            };

            $prompt(opts)
                .then(onConfirm);

            /**
             * Called when the user hits ok in the name input prompt.
             *
             * @param {string} name
             */
            function onConfirm (name) {
                if (!name) {
                    $toast('CANT_SAVE_UNNAMED_SETTING');
                    return;
                }

                if (name === vm.graph.name) {
                    $confirm('DO_WE_OVERWRITE_OLD_SETTING')
                        .then(overwrite, saveNew);
                } else {
                    saveNew();
                }

                /**
                 * Case we overwrite the existing saved search with this.
                 */
                function overwrite () {
                    vm.graph.name = name;

                    GraphDataService.saveSettings({
                        id: vm.graph.id,
                        name: name,
                        settings: vm.graph
                    }).then(onSave);
                }

                /**
                 * Case we want to save new setting.
                 */
                function saveNew () {
                    vm.graph.name = name;

                    GraphDataService.saveSettings({
                        name: name,
                        settings: vm.graph
                    }).then(onSave);
                }

                /**
                 * Called when the setting is saved.
                 *
                 * @param data
                 */
                function onSave (data) {
                    vm.settings.push(data.data);

                    $timeout(function () {
                        vm.setting = data.data.id;
                    });

                    vm.reload();
                }
            }
        };

        /**
         * Reload filters.
         */
        vm.reload = function reload () {
            $scope.$broadcast('reloadFilters');
        };

        /**
         * Open the setting dialog.
         */
        vm.openSettings = function openSettings () {
            $dialog({
                controller: 'Graph.SettingsController',
                template: 'web/templates/graph/partials/settings.html'
            }).then(onSave);

            function onSave () {
                vm.reload();
            }
        };

        vm.init();
    }

    SettingsController.$inject = ['$mdDialog'];

    /**
     * Controller for the settings dialog.
     *
     * @constructor
     */
    function SettingsController () {
        var vm = this;

        vm.save = function save () {
            // TODO: implement save
        };
    }

})();