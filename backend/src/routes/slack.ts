import { Router } from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID || '';
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET || '';
const SLACK_REDIRECT_URI = process.env.SLACK_REDIRECT_URI || '';

router.get('/connect', (req, res) => {
  const url = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=chat:write,channels:read,groups:read,im:read,mpim:read&redirect_uri=${SLACK_REDIRECT_URI}`;
  res.redirect(url);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code as string;

  try {
    const response = await axios.post('https://slack.com/api/oauth.v2.access', null, {
      params: {
        client_id: SLACK_CLIENT_ID,
        client_secret: SLACK_CLIENT_SECRET,
        code,
        redirect_uri: SLACK_REDIRECT_URI,
      },
    });

    const data = response.data;
    console.log('Slack OAuth Response:', data);

    if (!data.ok) {
      console.error('Slack OAuth failed:', data.error);
      return res.status(400).send(`Slack OAuth failed: ${data.error}`);
    }

    const { access_token, refresh_token, team } = data;

    if (!team || !team.id) {
      console.error('Missing team ID in Slack response');
      return res.status(500).send('Invalid Slack OAuth response: Missing team ID.');
    }

    await prisma.slackToken.upsert({
      where: { teamId: team.id },
      update: {
        accessToken: access_token,
        refreshToken: refresh_token || '',
      },
      create: {
        teamId: team.id,
        accessToken: access_token,
        refreshToken: refresh_token || '',
      },
    });

    res.send('Slack connected! You can close this tab.');
  } catch (error: any) {
    console.error('Slack OAuth Callback Error:', error?.response?.data || error.message);
    res.status(500).send('Something went wrong during Slack OAuth.');
  }
});

export default router;
