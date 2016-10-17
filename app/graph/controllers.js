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
                        setting: vm.graph
                    }).then(onSave);
                }

                /**
                 * Case we want to save new setting.
                 */
                function saveNew () {
                    vm.graph.name = name;

                    GraphDataService.saveSettings({
                        name: name,
                        setting: vm.graph
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

    SettingsController.$inject = ['GraphDataService'];

    /**
     * Controller for the settings dialog.
     *
     * @param {*}   GraphDataService
     *
     * @constructor
     */
    function SettingsController (GraphDataService) {
        var vm = this;

        vm.selectedSettings = [];

        /**
         * Save settings.
         */
        vm.save = function save (setting) {

        };

        /**
         * Saves the single setting on the fly.
         *
         * @param {*} setting
         */
        vm.saveSettings = function saveSettings (setting) {
            GraphDataService.saveSettings(setting);
        };

        /**
         * Load settings data.
         */
        vm.load = function load () {
            vm.loading = true;

            GraphDataService.getSavedSettings()
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Fired when the setting is saved.
             *
             * @param  {*}  data
             */
            function onSuccess (data) {
                vm.savedSettings = data.data;
            }

            /**
             * Fired after the query is done.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        /**
         * Remove saved settings.
         */
        vm.removeSavedSettings = function removeSavedSettings () {
            GraphDataService
                .removeSavedSettings({
                    settings: vm.selectedSettings
                }).then(onSuccess)
            ;

            /**
             * Fired after we had removed search settings.
             */
            function onSuccess () {
                vm.load();
            }
        };

        vm.load();
    }

})();