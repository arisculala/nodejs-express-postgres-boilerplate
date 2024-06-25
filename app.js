import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Logger from './src/utils/logger.js';
import userRoutes from './src/routes/user.route.js';
import healthcheckRoutes from './src/routes/healthcheck.route.js';

dotenv.config();

const app = express();

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());

// enable CORS for all routes
app.use(cors());

// create a Router instance for all API routes
const apiRouter = express.Router();
app.use('/api', apiRouter); // prefix all API routes with /api

// mounts routes on the apiRouter
apiRouter.use('/users', userRoutes);
apiRouter.use('/healthcheck', healthcheckRoutes);

app.listen(PORT, () => {
  Logger.info(
    `🚀 [${ENVIRONMENT}] nodejs-express-postgres-boilerplate Application listening on port ${PORT} 🚀`
  );
});
