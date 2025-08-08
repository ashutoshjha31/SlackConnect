import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { sendSlackMessage } from '../services/slack';

export function scheduleCron(prisma: PrismaClient) {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const messages = await prisma.scheduledMessage.findMany({
      where: { scheduledAt: { lte: now } },
    });

    for (const msg of messages) {
      const token = await prisma.slackToken.findUnique({ where: { teamId: msg.teamId } });
      if (token) {
        await sendSlackMessage(token.accessToken, msg.channel, msg.message);
      }
      await prisma.scheduledMessage.delete({ where: { id: msg.id } });
    }
  });
}