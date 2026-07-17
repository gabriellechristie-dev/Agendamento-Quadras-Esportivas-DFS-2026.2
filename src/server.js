import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (request, response) => {
    return response.json({ mensagem: 'api de agendamentos de quadra online!'});

});

app.post('/jogadores', (request, response) => {
    try{
        const {nome, email, telefone} = request.body;
         return response.status(201).json({mensagem: 'Jogador cadastrado com sucesso!'});
    }catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: 'Erro ao cadastrar jogador.'});
    }
   
});

app.listen(PORT, () => {
    console.log(`Servidor Rodaaannndo em http://localhost:${PORT}`)
})