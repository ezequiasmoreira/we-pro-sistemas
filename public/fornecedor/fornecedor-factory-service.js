angular.module("projetoTecnico").factory("fornecedorFactoryService", function ($http,config) {
    
	var _salvar = function (fornecedor) {   
		return $http.post(config.baseUrl + '/fornecedors', fornecedor);  	
	};

	var _atualizar = function (fornecedor) {   
		return $http.put(config.baseUrl + '/fornecedors/'+fornecedor.id, fornecedor);  	
	};

	var _obterTodos = function () {   
		return $http.get(config.baseUrl + '/fornecedors');  	
	};

	var _excluir = function (fornecedor) {   
		return $http.delete(config.baseUrl + '/fornecedors/' + fornecedor.id);  	
	};

	var _novo = function ($scope) {   
		$scope.fornecedor = {};
		$scope.estados =[];
        $scope.listaFornecedors = [];
        $scope.telefones = [];    
        $scope.enderecos = [];
        $scope.fornecedor.telefones = [];
        $scope.fornecedor.enderecos = [];  	
	};

	return {
		salvar: _salvar,
		atualizar: _atualizar,
		obterTodos: _obterTodos,
		excluir: _excluir,
		novo: _novo
	};
});