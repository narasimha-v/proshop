import { Router } from 'express';
import { authUser } from '../controllers';

const router = Router();

router.route('/login').post(authUser);

export default router;
