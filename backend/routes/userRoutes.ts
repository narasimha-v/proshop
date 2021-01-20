import { Router } from 'express';
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers
} from '../controllers';
import { isAdmin, protect } from '../middleware';

const router = Router();

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.route('/login').post(authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default router;
