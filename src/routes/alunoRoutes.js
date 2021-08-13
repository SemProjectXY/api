import { Router } from 'express';
import aluno from '../controllers/AlunoController';
import login from '../middlewares/loginRequired';

const router = new Router();

router.get('/', aluno.index);
router.post('/', login, aluno.create);

router.put('/:id', login, aluno.update);
router.delete('/:id', login, aluno.delete);
router.get('/:id', aluno.show);

export default router;
