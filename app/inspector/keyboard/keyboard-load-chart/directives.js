(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Keyboard.Load.Directives', []);

    angular.module('Inspector.Keyboard.Load.Directives')
        .directive('loadBgc', loadBgc)
    ;

    //////////////

    /**
     * Directive for dynamically loading the background color for the keyboard layout.
     *
     * @returns {*}
     */
    function loadBgc () {
        return {
            restrict: 'EA',
            scope: {
                loadBgc: '='
            },
            link: link
        };

        function link (scope, element, attrs) {
            scope.$watch('loadBgc', function (valueNew, valueOld) {
                valueNew = valueNew || 0.0;
                angular.element(element).css('background', 'rgba(255, 0, 0, ' + valueNew + ')');
            });
        }
    }

})();