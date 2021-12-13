angular.module("componentes").factory("utilFactorySpec", function () {    
	
	var _validarEmail = function (email, $scope) { 		 
		var regex = /\S+@\S+\.\S+/;
		if(!regex.test(email)){
            if ($scope) angular.element('#email').focus();
			throw "Email inválido";
		}
		return true;
	};
	
	return {
		validarEmail: _validarEmail
	};
});