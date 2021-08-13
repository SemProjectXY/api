import { Router } from 'express';

import foto from '../controllers/FotoController';
import login from '../middlewares/loginRequired';

const router = new Router();

router.post('/', login, foto.create);

export default router;
