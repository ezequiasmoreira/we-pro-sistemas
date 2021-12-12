(function () {
    'use strict';
    
    angular.module('public')
        .controller('controller', controller);    
        
    function controller(
        $state,
        $urlRouter){

        var url = $urlRouter.location.replace('/','');
        $state.go(url);      
       
        if (($urlRouter.location === '/inicio') || ($urlRouter.location === '') || ($urlRouter.location === '/')){
            setTimeout(function(){
                angular.element('#index').triggerHandler('click');
            });
        }       
    }
})();   