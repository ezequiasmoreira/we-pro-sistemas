angular.module('projetoTecnico', ['projetoTecnicoDiretivas','componentes','ngRoute','ui.router','ngSanitize','ui.select'
])
.config(function($routeProvider){  
    
    $routeProvider.when('/inicio',{
        templateUrl:'visao-geral.html',
        controller: 'projetoTecnicoController'
    });

    $routeProvider.when('/cliente-cadastro',{
        templateUrl:'cliente/cliente.html',
        controller: 'clienteController',
    });
    
    $routeProvider.when('/fornecedor-cadastro',{
        templateUrl:'fornecedor/fornecedor.html',
        controller: 'fornecedorController'
    });

    $routeProvider.otherwise({ redirectTo: '/inicio'});
})
.filter('propsFilter', function() {
    return function(items, props) {
      var out = [];
  
      if (angular.isArray(items)) {
        items.forEach(function(item) {
          var itemMatches = false;
  
          var keys = Object.keys(props);
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }
  
          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }
  
      return out;
    };
  });;