(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Filters.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('Filters.Controllers')
        .controller('GenericFilterController', GenericFilterController)
    ;

    ///////////

    GenericFilterController.$inject = ['FilterDataService'];

    /**
     * Controller for the generic filter.
     *
     * @param  {*} FilterDataService
     *
     * @constructor
     */
    function GenericFilterController (FilterDataService) {
        var vm = this;

        FilterDataService
            .getOptions(vm.action)
            .then(onSuccess)
        ;

        function onSuccess (data) {
            vm.options = data.data;
        }
    }

})();