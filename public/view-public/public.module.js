
(function () {
    'use strict';
    angular.module('public', ['componentes','ngRoute','ui.router'])
    .config(function($routeProvider){  
    
        $routeProvider.when('inicio',{
            templateUrl:'view-public/index.html',
            controller: 'controller'
        });

        $routeProvider.otherwise({ redirectTo: 'inicio'});
    });
})(); 