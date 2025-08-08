import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ScheduledList() {
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = async () => {
    const res = await axios.get('http://localhost:3000/api/messages/scheduled');
    setMessages(res.data);
  };

  const cancelMessage = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/messages/scheduled/${id}`);
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Scheduled Messages</h2>
      <ul className="space-y-2">
        {messages.map(msg => (
          <li key={msg.id} className="border p-2 rounded bg-white shadow">
            <p><strong>Team:</strong> {msg.teamId}</p>
            <p><strong>Channel:</strong> {msg.channel}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <p><strong>Time:</strong> {new Date(msg.scheduledAt).toLocaleString()}</p>
            <button
              onClick={() => cancelMessage(msg.id)}
              className="mt-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
