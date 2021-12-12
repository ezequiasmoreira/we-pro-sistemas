angular.module('public').controller('controller', function(
    utilFactorySpec,$http,$state,$urlRouter){
        
    var url = $urlRouter.location.replace('/','');
    $state.go(url);

   if (($urlRouter.location === '/inicio') || ($urlRouter.location === '') || ($urlRouter.location === '/')){
        setTimeout(function(){
            angular.element('#index').triggerHandler('click');
        });
    }
});