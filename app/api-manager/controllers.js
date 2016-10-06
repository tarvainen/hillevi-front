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
    ;

    ////////////////////

    MainController.$inject = ['api', '$toast', '$mdDialog', '$confirm', 'md5'];

    /**
     * Main controller for the api manager interface.
     *
     * @param   {*} api
     * @param   {*} $toast
     * @param   {*} $mdDialog
     * @param   {*} $confirm
     * @param   {*} md5
     *
     * @constructor
     */
    function MainController (api, $toast, $mdDialog, $confirm, md5) {
        var vm = this;

        vm.selected = [];
        vm.selectedColumn = [];

        /**
         * Loads the interface data to the ui.
         */
        vm.load = function load () {
            vm.loading = true;

            // Fetch all the interfaces
            api.route('interface/all')
                .then(onSuccess, onError)
                .finally(onDone)
            ;

            // Fetch field types
            api.route('interface/fields/types')
                .then(onTypes, onError)
            ;

            api.route('interface/types')
                .then(onApiTypes, onError)
            ;

            /**
             * Fired when the field types are fetched from the server.
             *
             * @param   {*}   data
             */
            function onTypes (data) {
                vm.fieldTypes = data.data;
            }

            /**
             * Fired when the api types are fetched from the server.
             *
             * @param   {*} data
             */
            function onApiTypes (data) {
                vm.apiTypes = data.data;
            }

            /**
             * Called when the data fetch is succeeded.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.data = data.data;
            }

            /**
             * Called on the data fetch fail.
             */
            function onError () {
                $toast('DATA_FETCH_FAILED');
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
            api.route('interface/update', vm.api)
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
            } else {
                vm.api = null;
            }
        };

        /**
         * Fires when we cancel the api edition dialog.
         */
        vm.cancel = function cancel () {
            vm.api = null;
            vm.selected = [];
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
                api.route('interface/delete/' + vm.api.id)
                    .then(onSuccess, onError)
                    .finally(onDone)
                ;

                /**
                 * Fires when the api removal is done.
                 */
                function onSuccess () {
                    $toast('DELETED');
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
         * Adds a column to the api.
         */
        vm.addApiColumn = function () {
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
    }

    CreateApiDialogController.$inject = ['$mdDialog', 'api', '$toast', 'locals'];

    /**
     * The controller for the create api dialog.
     *
     * @param   {*} $mdDialog
     * @param   {*} api
     * @param   {*} $toast
     * @param   {*} locals
     *
     * @constructor
     */
    function CreateApiDialogController ($mdDialog, api, $toast, locals) {
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

            api.route('interface/create', vm.form)
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

})();