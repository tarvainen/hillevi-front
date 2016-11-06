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

})();