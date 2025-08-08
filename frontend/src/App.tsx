import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen p-4 bg-gray-100 text-gray-500">
        <h1 className="text-2xl font-bold mb-6">Slack Connect</h1>
        <nav className="mb-4 space-x-4">
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          <Link to="/schedule" className="text-blue-500 hover:underline">Scheduled Messages</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </div>
    </Router>
  );
}
