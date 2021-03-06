(function () {
    'use strict';

    /**
     * Application injections.
     */
    angular.module('Hillevi.Applications', [
        'Login', 'Settings', 'Dashboard',
        'ApiManager', 'ApiDataManager',
        'Notifications', 'Graph', 'Filters',
        'Inspector', 'UiComponent', 'AppSettings'
    ]);

})();