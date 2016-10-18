(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('ApiDataManager.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('ApiDataManager.Controllers')
        .controller('ApiDataManager.MainController', MainController)
        .controller('ApiDataManager.AddRowDialogController', AddDataDialogController)
    ;

    //////////////////

    MainController.$inject = ['ApiDataManagerDataService', '$toast', '$q', '$dialog'];

    /**
     * Main controller for the api data manager interface.
     *
     * @param {*}   ApiDataManagerDataService
     * @param {*}   $toast
     * @param {*}   $q
     * @param {*}   $dialog
     *
     * @constructor
     */
    function MainController (ApiDataManagerDataService, $toast, $q, $dialog) {
        var vm = this;

        vm.selectedRows = [];
        vm.page = 1;
        vm.limit = 10;

        /**
         * Function for fetching APIs for the select input.
         */
        vm.fetchApis = function fetchApis () {
            vm.apis = [];
            vm.selectedApi = null;
            vm.loading = true;

            ApiDataManagerDataService.getInterfaces()
                .then(onSuccess, onError)
                .finally(onDone)
            ;

            /**
             * Called when the list of APIs is fetched successfully.
             *
             * @param {*}   data
             */
            function onSuccess (data) {
                vm.apis = data.data;
            }
        };

        /**
         * Loads the api's data when the api selection is changed.
         */
        vm.loadData = function loadData () {
            var page = vm.page;
            vm.data = [];
            vm.columns = [];
            vm.selectedColumns = [];
            vm.loading = true;

            var params = {
                id: vm.selectedApi
            };

            var dataCall = ApiDataManagerDataService.getData(params);
            var metaCall = ApiDataManagerDataService.getSchema(params);

            vm.dataFetcher = dataCall;

            $q.all([dataCall, metaCall])
                .then(onData, onError)
                .finally(onDone)
            ;

            /**
             * Called when the api's data is fetched.
             *
             * @param {*}   data
             */
            function onData (data) {
                vm.data = data[0].data;
                vm.columns = data[1].data;
                vm.page = page;
            }
        };

        /**
         * Removes the rows from the currently selected api.
         */
        vm.removeRows = function removeRows () {
            vm.loading = true;
            var rows = vm.selectedRows.map(function (item) {
                return item.ID;
            });

            var params = {
                id: vm.selectedApi,
                rows: rows.join(',')
            };

            ApiDataManagerDataService.remove(params)
                .then(onRemove, onError)
                .finally(onDone)
            ;

            /**
             * Called after the rows are removed successfully and the data loading starts again.
             */
            function onRemove () {
                $toast('ROWS_REMOVED_SUCCESSFULLY');

                vm.loadData();
            }
        };

        /**
         * Add data to the dialog.
         */
        vm.addData = function addData () {
            $dialog({
                controller: 'ApiDataManager.AddRowDialogController',
                template: 'web/templates/api-data-manager/partials/add-data-dialog.html',
                locals: {
                    schema: vm.columns,
                    api: vm.selectedApi
                }
            }).then(onSave);

            function onSave () {
                vm.loadData();
            }
        };

        /**
         * Called when the data fetch is failed.
         */
        function onError () {
            $toast('DATA_FETCH_FAILED');
        }

        /**
         * Called when the query is done completely.
         */
        function onDone () {
            vm.loading = false;
        }

        vm.fetchApis();
    }

    AddDataDialogController.$inject = ['locals', 'ApiDataManagerDataService', '$q'];

    /**
     * Controller for the data adding dialog.
     *
     * @param {*}    locals
     * @param {*}    ApiDataManagerDataService
     * @param {*}    $q
     *
     * @constructor
     */
    function AddDataDialogController (locals, ApiDataManagerDataService, $q) {
        var vm = this;

        vm.schema = locals.schema;
        vm.form = {};

        vm.onSave = function onSave () {
            vm.loading = true;
            var deferred = $q.defer();
            
            ApiDataManagerDataService
                .saveApiDataRow({
                    data: vm.form,
                    api: locals.api
                }).then(onSuccess, onError);

            function onSuccess () {
                deferred.resolve();
            }
            
            function onError () {
                deferred.reject();
            }

            return deferred.promise;
        };
    }

})();