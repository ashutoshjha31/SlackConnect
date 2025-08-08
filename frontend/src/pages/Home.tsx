import MessageForm from '../components/MessageForm';

export default function Home() {
  return (
    <div>
      <a
        href="slack-connect-three.vercel.app"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Connect Slack Workspace
      </a>
      <div className="mt-6">
        <MessageForm />
      </div>
    </div>
  );
}
