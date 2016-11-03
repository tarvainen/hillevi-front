(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Services', []);

    /**
     * Service initializations.
     */
    angular.module('Inspector.Services')
        .factory('InspectorDataService', InspectorDataService)
    ;
    
    ////////////////

    /**
     * Base data service for all the inspector interfaces.
     *
     * @constructor
     */
    function InspectorDataService () {
        // TODO: implement
        return {};
    }

})();