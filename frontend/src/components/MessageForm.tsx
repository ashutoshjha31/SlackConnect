import { useState } from 'react';
import axios from 'axios';

export default function MessageForm() {
  const [teamId, setTeamId] = useState('');
  const [channel, setChannel] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');

  const sendNow = async () => {
    try {
      await axios.post('http://localhost:3000/api/messages/send', { teamId, channel, message });
      alert('Message sent');
    } catch (err) {
      alert('Failed to send message');
    }
  };

  const scheduleMessage = async () => {
    try {
      await axios.post('http://localhost:3000/api/messages/schedule', {
        teamId,
        channel,
        message,
        scheduledAt
      });
      alert('Message scheduled');
    } catch (err) {
      alert('Failed to schedule message');
    }
  };

  return (
    <div className="space-y-4">
      <input
        placeholder="Team ID"
        value={teamId}
        onChange={e => setTeamId(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        placeholder="Channel ID"
        value={channel}
        onChange={e => setChannel(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <br />
      <br />
      <div>
        <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="datetime-local"
        value={scheduledAt}
        onChange={e => setScheduledAt(e.target.value)}
        className="border p-2 rounded w-full"
      />
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={sendNow}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send Now
        </button>
        <button
          onClick={scheduleMessage}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Schedule
        </button>
      </div>
    </div>
  );
}
