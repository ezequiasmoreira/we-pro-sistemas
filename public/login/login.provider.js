angular.module('login')
.config(function($stateProvider){ 
    var usuario = {
        name: 'usuario-cadastro',
        url: 'usuario-cadastro',
        templateUrl:'/site/usuario/cadastro.html'
    }
    $stateProvider.state(usuario);
});