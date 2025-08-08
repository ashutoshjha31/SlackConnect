import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import slackRoutes from './routes/slack';
import messageRoutes from './routes/messages';
import { scheduleCron } from './scheduler/cron';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/slack', slackRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  scheduleCron(prisma);
});