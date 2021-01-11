import { Router } from 'express';
import { getProducts, getProductById } from '../controllers';

const router = Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
