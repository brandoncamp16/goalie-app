import express from 'express';
import { handleLogin } from '../contollers/authController.js';

const router = express.Router();

router.post('/', handleLogin);

export default router;