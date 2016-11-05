(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Apps', [
        'Inspector.Apps.Services',
        'Inspector.Apps.Controllers',
        'Inspector.Apps.Directives',
        'Inspector.Apps.UsagePerTime'
    ]);

})();