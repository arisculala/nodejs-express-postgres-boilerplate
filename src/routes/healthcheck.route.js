import express from 'express';
const router = express.Router();
import * as healthcheckController from '../controllers/healthcheck.controller.js';

// Route for basic health check
router.get('/', healthcheckController.healthcheck);

// Route for readiness probe
router.get('/ready', healthcheckController.healthcheckReady);

// Route for liveness probe
router.get('/live', healthcheckController.healthcheckLive);

export default router;
