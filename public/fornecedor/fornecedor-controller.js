(function () {
    'use strict';

angular
    .module('projetoTecnico')
    .controller('fornecedorController', fornecedorController);

    fornecedorController.$inject = [
        '$scope',
        'fornecedorFactorySpec',
        'enderecoFactorySpec',
        'telefoneFactorySpec',
        'telefoneFactoryService',
        'enderecoFactoryService',
        'fornecedorFactoryService',
        '$state'
    ]

    function fornecedorController ($scope,fornecedorFactorySpec,enderecoFactorySpec,telefoneFactorySpec,
    telefoneFactoryService,enderecoFactoryService,fornecedorFactoryService,$state){  
    
    fornecedorFactoryService.novo($scope);   
    enderecoFactoryService.popularEstados($scope);   

    $scope.salvarTelefone = function(telefone) { 
        try{
            telefoneFactorySpec.validarTelefone(telefone);
           if (telefone.$$hashKey == undefined){
                $scope.telefones.push(telefone);
            }else{
               for(i in $scope.telefones) {
                    if($scope.telefones[i].$$hashKey == $scope.telefone.$$hashKey) {
                        $scope.telefones[i] = $scope.telefone;
                        $scope.fornecedor.telefones[i] = telefoneFactoryService.new($scope.telefone);
                    }
                }
            }

            $scope.mensagem = "";
            $scope.telefone = {};            
            $('#modalTelefone').modal("hide");
        }catch (exception) {
            $scope.mensagem = exception
            return;
        } 
    }

    $scope.excluirTelefone = function(telefoneExcluir) {
        $scope.telefones = telefoneFactoryService.excluirTelefone($scope.telefones,telefoneExcluir); 
        $scope.fornecedor.telefones = []; 

        $scope.telefones.filter(function(telefone){
            $scope.fornecedor.telefones.push(telefoneFactoryService.new(telefone));
        });   
    }

    $scope.editarTelefone = function(telefone) {
        telefoneFactoryService.editarTelefone($scope,telefone);       
        $('#modalTelefone').modal("show");
    }

    $scope.salvarEndereco = function(endereco) {
        try{
            enderecoFactorySpec.validarEndereco(endereco);            
            enderecoFactoryService.configurarEnderecoPrincipal($scope,endereco)
            if (endereco.$$hashKey == undefined){
                $scope.enderecos.push(enderecoFactoryService.new(endereco));
            }else{
                for(i in $scope.enderecos) {
                    if($scope.enderecos[i].$$hashKey == $scope.endereco.$$hashKey) {
                        $scope.enderecos[i] = $scope.endereco;  
                        console.log($scope.enderecos[i])
                        console.log(enderecoFactoryService.new($scope.endereco))                  
                        $scope.fornecedor.enderecos[i] = enderecoFactoryService.new($scope.endereco);
                    }
                }
            }

            $scope.mensagem = "";
            $scope.endereco = [];
            $('#modalEndereco').modal("hide");
        }catch (exception) {
            $scope.mensagem = exception
            return;
        } 
    }

    $scope.excluirEndereco = function(enderecoExcluir) {
        $scope.enderecos = enderecoFactoryService.excluirEndereco($scope.enderecos,enderecoExcluir);
        $scope.fornecedor.enderecos = []; 

        $scope.enderecos.filter(function(endereco){
            $scope.fornecedor.enderecos.push(enderecoFactoryService.new(endereco));
        });   
    }

    $scope.editarEndereco = function(endereco) {
        enderecoFactoryService.popularEstados($scope);         
        enderecoFactoryService.editarEndereco($scope,endereco);        
        $('#modalEndereco').modal("show");
    }

    $scope.cadastrarFornecedor = function(fornecedor) {    
        try{
            fornecedor.telefones = $scope.telefones;
            $scope.enderecos = $scope.enderecos.filter(function(endereco){
                endereco.estadoId = endereco.estadoId > 0 ? endereco.estadoId : endereco.cidade.estado.id;
                endereco.cidade = {id:(endereco.cidadeId > 0 ? endereco.cidadeId : endereco.cidade.id)}                
                return endereco;
            }); 
            fornecedor.enderecos = $scope.enderecos;
            fornecedorFactorySpec.validarFornecedor(fornecedor);
            enderecoFactorySpec.validarEnderecoPrincipal(fornecedor.enderecos);

            $scope.mensagemSucesso = "";
            if(fornecedor.id){
                fornecedorFactoryService.atualizar($scope.fornecedor).then(success, error);
            }else{
                fornecedorFactoryService.salvar($scope.fornecedor).then(success, error);
            }       

            function success(response){ 
                $scope.fornecedor.id = response.data.id 
                $scope.mensagemSucesso = "Fornecedor salvo com sucesso";
            }

            function error(response){ 
                $scope.mensagem = response.data.message;
                return;
            } 
            $timeout( function(){ $scope.mensagemSucesso = ""; }, 100); 
        }catch (exception) {
            $scope.mensagem = exception
            return;
        }          
    }

    $scope.editarFornecedor = function(fornecedor) {
        $scope.fornecedor = fornecedor;
        $scope.telefones = fornecedor.telefones;
        $scope.enderecos = fornecedor.enderecos;
        $('#modalPesquisaFornecedor').modal("hide");
    }

    $scope.excluirFornecedor = function(fornecedorExcluir) {
        fornecedorFactoryService.excluir(fornecedorExcluir).then(success, error);

        function success(){ 
            $scope.listafornecedores = $scope.listafornecedores.filter(function(fornecedor){
                if(fornecedor.$$hashKey != fornecedorExcluir.$$hashKey){
                    return fornecedor;
                }
            });  
        }

        function error(response){ 
            $scope.mensagemPesquisarFornecedor = response.data.message;
            return;
        }                 
    }
    $scope.popularCidades = function(estadoId) { 
        enderecoFactoryService.popularCidadesPorEstado(estadoId,$scope);
    }
    
    $scope.pesquisarfornecedores = function() { 
        $scope.mensagemPesquisarFornecedor = "";      
        fornecedorFactoryService.obterTodos().then(success, error);            

        function success(response){ 
            $scope.listafornecedores = response.data;
        }

        function error(response){ 
            $scope.mensagemPesquisarFornecedor = response.data.message;
            return;
        }         
    }
    
    $scope.novo = function() { 
        //$state.go('cliente-cadastro',{clienteId:123});
        fornecedorFactoryService.novo($scope); 
        enderecoFactoryService.popularEstados($scope);
    }
};
})();