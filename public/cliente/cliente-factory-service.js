angular.module("projetoTecnico").factory("clienteFactoryService", function ($http,config) {
    
	var _salvar = function (cliente) {   
		return $http.post(config.baseUrl + '/clientes', cliente);  	
	};

	var _atualizar = function (cliente) {   
		return $http.put(config.baseUrl + '/clientes/'+cliente.id, cliente);  	
	};

	var _obterTodos = function () {   
		return $http.get(config.baseUrl + '/clientes');  	
	};

	var _excluir = function (cliente) {   
		return $http.delete(config.baseUrl + '/clientes/' + cliente.id);  	
	};

	var _novo = function ($scope) {   
		$scope.cliente = {};
		$scope.estados =[];
        $scope.listaClientes = [];
        $scope.telefones = [];    
        $scope.enderecos = [];
        $scope.cliente.telefones = [];
        $scope.cliente.enderecos = [];  	
	};

	return {
		salvar: _salvar,
		atualizar: _atualizar,
		obterTodos: _obterTodos,
		excluir: _excluir,
		novo: _novo
	};
});