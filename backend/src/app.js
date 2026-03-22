import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import voteRoutes from './routes/vote.route.js';
import menuRoutes from './routes/menu.route.js';
import resultRoutes from './routes/result.route.js';
import { startResultScheduler } from './config/scheduler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/votes', voteRoutes);
app.use('/api', menuRoutes);
app.use('/api', resultRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startResultScheduler();
});
