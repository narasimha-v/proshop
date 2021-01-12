import { Router } from 'express';
import { authUser, getUserProfile, registerUser } from '../controllers';
import { protect } from '../middleware';

const router = Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
