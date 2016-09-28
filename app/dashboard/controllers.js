(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Dashboard.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('Dashboard.Controllers')
        .controller('Dashboard.MainController', MainController)
    ;
    
    //////////////

    /**
     * Main controller for the dashboard application.
     *
     * @constructor
     */
    function MainController () {
        var vm = this;
    }

})();