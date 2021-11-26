angular.module("projetoTecnico").factory("utilFactorySpec", function () {    
	
	let _validarEmail = function (email, $scope) { 		 
		let regex = /\S+@\S+\.\S+/;
		if(!regex.test(email)){
            if ($scope) $scope.$broadcast('validarEmail');
			throw "Email inválido";
		}
		return true;
	};
	
	return {
		validarEmail: _validarEmail
	};
});