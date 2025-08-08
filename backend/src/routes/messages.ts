import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendSlackMessage } from '../services/slack';

const router = Router();
const prisma = new PrismaClient();

router.post('/send', async (req, res) => {
  const { teamId, channel, message } = req.body;
  const tokenRecord = await prisma.slackToken.findUnique({ where: { teamId } });
  if (!tokenRecord) return res.status(400).send('No token found');

  const result = await sendSlackMessage(tokenRecord.accessToken, channel, message);
  res.json(result);
});

router.post('/schedule', async (req, res) => {
  const { teamId, channel, message, scheduledAt } = req.body;
  const record = await prisma.scheduledMessage.create({
    data: { teamId, channel, message, scheduledAt: new Date(scheduledAt) },
  });
  res.json(record);
});

router.get('/scheduled', async (_, res) => {
  const messages = await prisma.scheduledMessage.findMany();
  res.json(messages);
});

router.delete('/scheduled/:id', async (req, res) => {
  await prisma.scheduledMessage.delete({ where: { id: parseInt(req.params.id) } });
  res.sendStatus(204);
});

export default router;