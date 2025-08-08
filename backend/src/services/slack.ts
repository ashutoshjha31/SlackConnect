import axios from 'axios';

export async function sendSlackMessage(token: string, channel: string, message: string) {
  const result = await axios.post(
    'https://slack.com/api/chat.postMessage',
    { channel, text: message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return result.data;
}