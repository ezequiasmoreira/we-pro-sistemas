angular.module('projetoTecnico').controller('clienteController', function($scope,clienteFactorySpec,enderecoFactorySpec,telefoneFactorySpec,
    telefoneFactoryService,enderecoFactoryService,clienteFactoryService,$stateParams){  
    
    clienteFactoryService.novo($scope);   
    enderecoFactoryService.popularEstados($scope);
    //console.log($stateParams.clienteId)
    $scope.salvarTelefone = function(telefone) { 
        try{
            telefoneFactorySpec.validarTelefone(telefone);
           if (telefone.$$hashKey == undefined){
                $scope.telefones.push(telefone);
            }else{
               for(i in $scope.telefones) {
                    if($scope.telefones[i].$$hashKey == $scope.telefone.$$hashKey) {
                        $scope.telefones[i] = $scope.telefone;
                        $scope.cliente.telefones[i] = telefoneFactoryService.new($scope.telefone);
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
        $scope.cliente.telefones = []; 

        $scope.telefones.filter(function(telefone){
            $scope.cliente.telefones.push(telefoneFactoryService.new(telefone));
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
                        $scope.cliente.enderecos[i] = enderecoFactoryService.new($scope.endereco);
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
        $scope.cliente.enderecos = []; 

        $scope.enderecos.filter(function(endereco){
            $scope.cliente.enderecos.push(enderecoFactoryService.new(endereco));
        });   
    }

    $scope.editarEndereco = function(endereco) {
        enderecoFactoryService.popularEstados($scope);         
        enderecoFactoryService.editarEndereco($scope,endereco);        
        $('#modalEndereco').modal("show");
    }

    $scope.cadastrarCliente = function(cliente) {    
        try{
            cliente.telefones = $scope.telefones;
            $scope.enderecos = $scope.enderecos.filter(function(endereco){
                endereco.estadoId = endereco.estadoId > 0 ? endereco.estadoId : endereco.cidade.estado.id;
                endereco.cidade = {id:(endereco.cidadeId > 0 ? endereco.cidadeId : endereco.cidade.id)}                
                return endereco;
            }); 
            cliente.enderecos = $scope.enderecos;
            clienteFactorySpec.validarCliente(cliente);
            enderecoFactorySpec.validarEnderecoPrincipal(cliente.enderecos);

            $scope.mensagemSucesso = "";
            if(cliente.id){
                clienteFactoryService.atualizar($scope.cliente).then(success, error);
            }else{
                clienteFactoryService.salvar($scope.cliente).then(success, error);
            }       

            function success(response){ 
                $scope.cliente.id = response.data.id 
                $scope.mensagemSucesso = "Cliente salvo com sucesso";
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

    $scope.editarCliente = function(cliente) {
        $scope.cliente = cliente;
        $scope.telefones = cliente.telefones;
        $scope.enderecos = cliente.enderecos;
        $('#modalPesquisaCliente').modal("hide");
    }

    $scope.excluirCliente = function(clienteExcluir) {
        clienteFactoryService.excluir(clienteExcluir).then(success, error);

        function success(){ 
            $scope.listaClientes = $scope.listaClientes.filter(function(cliente){
                if(cliente.$$hashKey != clienteExcluir.$$hashKey){
                    return cliente;
                }
            });  
        }

        function error(response){ 
            $scope.mensagemPesquisarCliente = response.data.message;
            return;
        }                 
    }
    $scope.popularCidades = function(estadoId) { 
        enderecoFactoryService.popularCidadesPorEstado(estadoId,$scope);
    }
    
    $scope.pesquisarClientes = function() { 
        $scope.mensagemPesquisarCliente = "";      
        clienteFactoryService.obterTodos().then(success, error);            

        function success(response){ 
            $scope.listaClientes = response.data;
        }

        function error(response){ 
            $scope.mensagemPesquisarCliente = response.data.message;
            return;
        }         
    }
    
    $scope.novo = function() {   
        clienteFactoryService.novo($scope); 
        enderecoFactoryService.popularEstados($scope);
    }
});