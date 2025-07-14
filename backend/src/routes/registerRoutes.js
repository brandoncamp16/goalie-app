import express from 'express';
import { handleNewUser } from '../contollers/registerController.js';

const router = express.Router();

router.post('/', handleNewUser);

export default router;