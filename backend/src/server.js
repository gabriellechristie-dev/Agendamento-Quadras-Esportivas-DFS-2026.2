import 'dotenv/config';
import app from './app.js';

//ele pega uma porta da nuvem ou no meu pc
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});