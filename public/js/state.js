angular.module('projetoTecnico').config(function($stateProvider){  
    
    var fornecedor = {
        name: 'fornecedor-cadastro',
        url: 'fornecedor-cadastro',
        templateUrl:'fornecedor/fornecedor.html'
    }

    var cliente = {
        name: 'cliente-cadastro',
        url: 'cliente-cadastro',
        templateUrl:'cliente/cliente.html',
        //params: {'clienteId':null}
    }

    $stateProvider.state(fornecedor);
    $stateProvider.state(cliente);
});