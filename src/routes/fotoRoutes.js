import { Router } from 'express';

import foto from '../controllers/FotoController';

const router = new Router();

router.post('/', foto.create);

export default router;
