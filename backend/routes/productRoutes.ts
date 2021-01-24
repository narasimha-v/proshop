import { Router } from 'express';
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts
} from '../controllers';
import { isAdmin, protect } from '../middleware';

const router = Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.route('/top').get(getTopProducts);
router.route('/:id/reviews').post(protect, createProductReview);
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProduct)
	.put(protect, isAdmin, updateProduct);

export default router;
