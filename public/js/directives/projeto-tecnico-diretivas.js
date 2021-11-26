angular.module('projetoTecnicoDiretivas',[])
.directive('senhaFocus', function() {
    var ddo = {};
    ddo.restrict = "A";

    ddo.link = function(scope, element) {
        scope.$on('validarSenha',function() {
            element[0].focus();
        });
    }
    return ddo;
})
.directive('emailFocus', function() {
    var ddo = {};
    ddo.restrict = "A";

    ddo.link = function(scope, element) {
        scope.$on('validarEmail',function() {
            element[0].focus();
        });
    }
    return ddo;
})