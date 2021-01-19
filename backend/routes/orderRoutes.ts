import { Router } from 'express';

import {
	addOrderItems,
	getOrderbyId,
	updateOrderToPaid,
	getMyOrders
} from '../controllers';
import { protect } from '../middleware';

const router = Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderbyId);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
