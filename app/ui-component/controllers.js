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

})();