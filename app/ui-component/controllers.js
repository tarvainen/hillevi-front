(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('UiComponent.Controllers', []);

    /**
     * Controller definitions.
     */
    angular.module('UiComponent.Controllers')
        .controller('SimpleCardController', SimpleCardController)
        .controller('TranscludeCardController', TranscludeCardController)
        .controller('ProgressCardController', ProgressCardController)
        .controller('ChartCardController', ChartCardController)
    ;

    /////////////////

    /**
     * Controller for the simple card directive.
     *
     * @constructor
     */
    function SimpleCardController () {
        var vm = this;
    }

    /**
     * Controller for the transclude card directive.
     *
     * @constructor
     */
    function TranscludeCardController () {
        var vm = this;
    }

    ProgressCardController.$inject = ['api'];

    /**
     * Controller for the progress card directive.
     *
     * @constructor
     */
    function ProgressCardController (api) {
        var vm = this;

        if (vm.url) {
            api.route(vm.url).then(onSuccess);
        }

        /**
         * Fired when the data is fetched from the server successfully.
         *
         * @param {*} data
         */
        function onSuccess (data) {
            vm.progress = data.data.progress;
            vm.model = data.data.model;
        }
    }

    ChartCardController.$inject = ['api'];

    /**
     * Controller for the chart card directive.
     *
     * @param {*} api
     *
     * @constructor
     */
    function ChartCardController (api) {
        var vm = this;

        if (vm.url) {
            api.route(vm.url).then(onSuccess);
        }

        /**
         * Fired when the data is fetched from the server successfully.
         *
         * @param {*} data
         */
        function onSuccess (data) {
            vm.model = data.data;
        }
    }

})();