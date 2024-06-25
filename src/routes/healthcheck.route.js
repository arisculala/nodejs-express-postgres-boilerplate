import express from 'express';
const router = express.Router();
import * as healthcheckController from '../controllers/healthcheck.controller.js';

router.get('/', healthcheckController.healthcheck);
router.get('/ready', healthcheckController.healthcheckReady);
router.get('/live', healthcheckController.healthcheckLive);

export default router;
