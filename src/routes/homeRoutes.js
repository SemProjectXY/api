import { Router } from 'express';
import user from '../controllers/HomeController';
import login from '../middlewares/loginRequired';

const router = new Router();

router.post('/', user.create);
router.get('/', login, user.index);
router.get('/:id', login, user.show);

router.put('/', login, user.update);
router.delete('/', login, user.remove);

export default router;
