angular.module('projetoTecnico')
.directive("clienteListagem", function() {
    var ddo = {};
    
    ddo.restric = "AE";

    ddo.templateUrl = "cliente/cliente-listagem.html"
    
    return ddo;
});