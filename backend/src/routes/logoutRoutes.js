import express from 'express';
import { handleLogout } from '../contollers/logoutController.js';

const router = express.Router();

router.get('/', handleLogout);

export default router; 