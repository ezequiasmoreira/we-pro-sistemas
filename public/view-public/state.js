angular.module('public').config(function($stateProvider){  
    
    var index = {
        name: 'index',
        url: 'inicio',
        templateUrl:'view-public/index.html'
    }

    var sobre = {
        name: 'sobre',
        url: 'sobre',
        templateUrl:'view-public/sobre/about.html'
    }

    var servico = {
        name: 'servico',
        url: 'servico',
        templateUrl:'view-public/servico/service.html'
    }

    var equipe = {
        name: 'equipe',
        url: 'equipe',
        templateUrl:'view-public/equipe/team.html'
    }

    var projeto = {
        name: 'projeto',
        url: 'projeto',
        templateUrl:'view-public/projeto/portfolio.html'
    }

    var blog = {
        name: 'blog',
        url: 'blog',
        templateUrl:'view-public/blog/blog.html'
    }

    var informativo = {
        name: 'informativo',
        url: 'informativo',
        templateUrl:'view-public/informativo/single.html'
    }

    var contato = {
        name: 'contato',
        url: 'contato',
        templateUrl:'view-public/contato/contact.html'
    }

    $stateProvider.state(index);
    $stateProvider.state(sobre);
    $stateProvider.state(servico);
    $stateProvider.state(equipe);
    $stateProvider.state(projeto);
    $stateProvider.state(blog);
    $stateProvider.state(informativo);
    $stateProvider.state(contato);
});