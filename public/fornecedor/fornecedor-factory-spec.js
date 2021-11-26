angular.module("projetoTecnico").factory("fornecedorFactorySpec", function () {
    
	let _validarFornecedor = function (fornecedor) {
		if (!fornecedor.nome)	throw "Nome obrigatório";
		if (!fornecedor.sobrenome)	throw "Sobrenome obrigatório";
		if (!fornecedor.cpfCnpj) throw "Cpf/Cnpj obrigatório";
		if (!fornecedor.telefones.length) throw "Telefone obrigatório";
		if (!fornecedor.enderecos.length) throw "Endereço obrigatório";
		return true;
	};
	
	return {
		validarFornecedor: _validarFornecedor
	};
});