    import { Router } from 'express';

    import { cadastrarJogador, listarJogadores, atualizarJogador, deletarJogador} from '../controllers/jogadorController.js';

    const router = Router();

    router.post('/', cadastrarJogador);

    router.get('/', listarJogadores);

    router.put('/:id', atualizarJogador);

    router.delete('/:id', deletarJogador);

    export default router;