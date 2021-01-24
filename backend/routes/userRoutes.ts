import { Router } from 'express';
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserbyId,
	updateUser
} from '../controllers';
import { isAdmin, protect } from '../middleware';

const router = Router();

router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router
	.route('/:id')
	.put(protect, isAdmin, updateUser)
	.delete(protect, isAdmin, deleteUser)
	.get(protect, isAdmin, getUserbyId);
router.route('/login').post(authUser);
router.route('/').post(registerUser).get(protect, isAdmin, getUsers);

export default router;
