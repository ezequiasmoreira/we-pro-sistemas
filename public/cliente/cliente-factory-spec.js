angular.module("projetoTecnico").factory("clienteFactorySpec", function () {
    
	let _validarCliente = function (cliente) {
		if (!cliente.nome)	throw "Nome obrigatório";
		if (!cliente.sobrenome)	throw "Sobrenome obrigatório";
		if (!cliente.cpfCnpj) throw "Cpf/Cnpj obrigatório";
		if (!cliente.telefones.length) throw "Telefone obrigatório";
		if (!cliente.enderecos.length) throw "Endereço obrigatório";
		return true;
	};
	
	return {
		validarCliente: _validarCliente
	};
});