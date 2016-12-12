(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('ApiManager.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('ApiManager.Controllers')
        .controller('ApiManager.MainController', MainController)
        .controller('ApiManager.CreateApiDialogController', CreateApiDialogController)
        .controller('ApiPreviewDialogController', ApiPreviewDialogController)
    ;

    ////////////////////

    MainController.$inject = [
        'ApiManagerDataService', '$toast', '$mdDialog', '$confirm', '$dialog', 'md5', '$mdSidenav', '$q'
    ];

    /**
     * Main controller for the api manager interface.
     *
     * @param   {*} ApiManagerDataService
     * @param   {*} $toast
     * @param   {*} $mdDialog
     * @param   {*} $confirm
     * @param   {*} $dialog
     * @param   {*} md5
     * @param   {*} $mdSidenav
     * @param   {*} $q
     *
     * @constructor
     */
    function MainController (ApiManagerDataService, $toast, $mdDialog, $confirm, $dialog, md5, $mdSidenav, $q) {
        var vm = this;

        vm.selected = [];
        vm.selectedColumn = [];
        vm.page = 1;
        vm.limit = 10;

        /**
         * Loads the interface data to the ui.
         */
        vm.load = function load () {
            vm.loading = true;

            $q.all([
                ApiManagerDataService.getInterfaces(),
                ApiManagerDataService.getFieldTypes(),
                ApiManagerDataService.getApiTypes(),
                ApiManagerDataService.getAggregates()
            ]).then(onSuccess).finally(onDone);

            /**
             * Called when the data fetch is succeeded.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.data = data[0].data;
                vm.fieldTypes = data[1].data;
                vm.apiTypes = data[2].data;
                vm.aggregates = data[3].data;
            }

            /**
             * Called after the query is completed.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        /**
         * Saves the interface information to the database.
         */
        vm.save = function save () {
            ApiManagerDataService.saveApi(vm.api)
                .then(onSuccess, onError)
                .finally(onDone)
            ;

            /**
             * Called when the data is saved successfully.
             */
            function onSuccess () {
                $toast('SAVE_SUCCESSFULL');
                vm.load();
            }

            /**
             * Called when the save fails miserably.
             */
            function onError () {
                $toast('SAVE_FAILED');
            }

            /**
             * Called always after query.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        /**
         * Fires when the row is selected.
         *
         * @param {*}   row
         */
        vm.onSelect = function onSelect (row) {
            vm.selectedColumn = [];
            $mdSidenav('right').open();

            if (!vm.selected.length <= 1) {
                vm.api = angular.copy(row);
            } else {
                vm.api = null;
            }
        };

        /**
         * Fires when the row is deselected.
         */
        vm.onDeselect = function onDeselect () {
            if (vm.selected.length === 1) {
                vm.api = vm.selected[0];
                $mdSidenav('right').open();
            } else {
                vm.api = null;
                $mdSidenav('right').close();
            }
        };

        /**
         * Fires when we cancel the api edition dialog.
         */
        vm.cancel = function cancel () {
            vm.api = null;
            vm.selected = [];
            $mdSidenav('right').close();
        };

        /**
         * Opens a new api creation tool.
         */
        vm.createNewApi = function createNewApi ($event) {
            $mdDialog.show({
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: 'web/templates/api-manager/partials/dialog-create-api.html',
                controller: 'ApiManager.CreateApiDialogController',
                controllerAs: 'vm',
                locals: {
                    'apiTypes': vm.apiTypes
                }
            }).then(onSave);

            /**
             * Fires when the new API is saved an the dialog is closed.
             * Then we need to refresh data on the table.
             */
            function onSave () {
                vm.load();
            }
        };

        /**
         * Removes all selected apis.
         */
        vm.removeApis = function () {
            $confirm('ARE_YOU_SURE').then(onConfirm);

            /**
             * Fires when the user presses ok in the confirm dialog.
             */
            function onConfirm () {
                ApiManagerDataService.removeApi(vm.api.id)
                    .then(onSuccess, onError)
                    .finally(onDone)
                ;

                /**
                 * Fires when the api removal is done.
                 */
                function onSuccess () {
                    $toast('DELETED');
                    $mdSidenav('right').close();
                }

                /**
                 * Fired when the api removal fails.
                 */
                function onError () {
                    $toast('DELETION_FAILED');
                }

                /**
                 * Fired after the deletion query either fails or completes.
                 */
                function onDone () {
                    vm.api = null;
                    vm.selected = [];
                    vm.load();
                }
            }
        };

        /**
         * Preview the created api schema.
         */
        vm.preview = function preview () {
            $dialog({
                controller: 'ApiPreviewDialogController',
                template: 'web/templates/api-manager/partials/api-preview.html',
                locals: {
                    api: vm.api
                }
            });
        };

        /**
         * Adds a column to the api.
         */
        vm.addApiColumn = function () {
            vm.api.columns = vm.api.columns || {};

            vm.api.columns[md5.createHash(Date.now() + '')] = {
                field: '',
                type: 'integer'
            };
        };

        /**
         * Removes the interface's column or columns.
         */
        vm.removeApiColumn = function removeApiColumn () {
            for (var i = 0; i < vm.selectedColumn.length; i++) {
                delete vm.api.columns[vm.selectedColumn[i]];
            }

            vm.selectedColumn = [];

            $toast('REMEMBER_TO_SAVE_CHANGES');
        };

        /**
         * Function to fetch api hook for the selected api.
         *
         * @returns {*}
         */
        vm.fetchApiHook = function fetchHook () {
            return ApiManagerDataService.getHook(vm.api);
        };
    }

    CreateApiDialogController.$inject = ['$mdDialog', 'ApiManagerDataService', '$toast', 'locals'];

    /**
     * The controller for the create api dialog.
     *
     * @param   {*} $mdDialog
     * @param   {*} ApiManagerDataService
     * @param   {*} $toast
     * @param   {*} locals
     *
     * @constructor
     */
    function CreateApiDialogController ($mdDialog, ApiManagerDataService, $toast, locals) {
        var vm = this;

        vm.apiTypes = locals.apiTypes;

        /**
         * Cancels the api creation and closes the dialog.
         */
        vm.cancel = function cancel () {
            $mdDialog.cancel();
        };

        /**
         * Saves the new interface created in the UI.
         */
        vm.save = function save () {
            vm.loading = true;

            ApiManagerDataService.create(vm.form)
                .then(onSuccess, onError)
                .finally(onDone)
            ;

            /**
             * Closes the dialog after the new API is saved.
             */
            function onSuccess () {
                $toast('SAVE_SUCCESSFULL');
                $mdDialog.hide(true);
            }

            /**
             * Fired if the API saving fails.
             */
            function onError () {
                $toast('SAVE_FAILED');
            }

            /**
             * Always fires after the query is done.
             */
            function onDone () {
                vm.loading = false;
            }
        };
    }

    ApiPreviewDialogController.$inject = ['ApiManagerDataService', '$http'];

    /**
     * Controller for the api preview dialog.
     *
     * @param {*} ApiManagerDataService
     * @param {*} $http
     *
     * @constructor
     */
    function ApiPreviewDialogController (ApiManagerDataService, $http) {
        var vm = this;

        // Fetch sample json what we should expect to get
        vm.sampleJson = ApiManagerDataService
            .fetchSampleJson(angular.copy(vm.api.columns))
        ;

        /**
         * Test that the defined api works.
         */
        vm.test = function test () {
            vm.loading = true;

            ApiManagerDataService.test(vm.api.url)
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Success handler.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.fetchedData = data.data;
            }

            /**
             * Do finally.
             */
            function onDone () {
                vm.loading = false;
            }
        };
    }

})();