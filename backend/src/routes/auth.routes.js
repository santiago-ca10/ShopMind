import { Router }
  from 'express';

import {
  register,
  login
} from '../controllers/auth.controller.js';

const router = Router();


// REGISTER
router.post(
  '/register',
  register
);


// LOGIN
router.post(
  '/login',
  login
);

export default router;