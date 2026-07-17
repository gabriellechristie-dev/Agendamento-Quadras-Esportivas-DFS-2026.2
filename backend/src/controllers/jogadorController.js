export const cadastrarJogador = async (request, response) => {
    try {
        const { nome, email, telefone } = request.body;

        if (!nome?.trim() || !email?.trim() || !telefone?.trim()) {
            return response.status(400).json({ 
                mensagem: 'Erro: Todos os campos (nome, email e telefone) são obrigatórios!' 
            });
        }

        console.log(` Dados recebidos no VS Code! Nome: ${nome} | Email: ${email}`);
        
        return response.status(201).json({ mensagem: 'Jogador cadastrado com sucesso!' });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: 'Erro ao cadastrar jogador.' });
    }
};

export const listarJogadores = async (request, response) => {
    try{
        console.log('Listando jogadores...');

        
        //teste de jogadores falsos
        const jogadoresFalsos = [
            { id: 1, nome: 'João', email: 'joao@email.com', telefone: '85999999999' },
            { id: 2, nome: 'Maria', email: 'maria@email.com', telefone: '85888888888' }
        ];
        

        return response.status(200).json(jogadoresFalsos);

    }catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: 'Erro ao listar jogadores.' });

    }
}

export const atualizarJogador = async (request, response) => {
    try{
        const { id } = request.params;
        const { nome, email, telefone } = request.body;

        if (!nome?.trim() || !email?.trim() || !telefone?.trim()) {
            return response.status(400).json({ 
                mensagem: 'Erro: Todos os campos (nome, email e telefone) são obrigatórios!' 
            });
        }

        console.log(`Atualizando jogador com ID: ${id}`);
        console.log(`Novos dados: Nome: ${nome} | Email: ${email} | Telefone: ${telefone}`);

        return response.status(200).json({ 
            mensagem: 'Jogador atualizado com sucesso!',
            dadosAtualizados: { id, nome, email, telefone }
        });
    }catch (error) {
        console.error(error);
        return response.status(500).json( { mensagem: 'Erro ao atualizar jogador.' });
    }
}

export const deletarJogador = async (request, response) => {
    try{
        const { id } = request.params;
        
        console.log(`Deletando com ID: ${id} jogador `);
        

        return response.status(200).json({ 
            mensagem: 'Jogador deletado com sucesso!',
           
        });
    }catch (error) {
        console.error(error);
        return response.status(500).json( { mensagem: 'Erro ao deletar jogador.' });
    }
}