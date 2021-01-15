import { Router } from 'express';
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile
} from '../controllers';
import { protect } from '../middleware';

const router = Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default router;
