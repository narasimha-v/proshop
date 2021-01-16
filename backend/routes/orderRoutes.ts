import { Router } from 'express';

import { addOrderItems } from '../controllers';
import { protect } from '../middleware';

const router = Router();

router.route('/').post(protect, addOrderItems);

export default router;
