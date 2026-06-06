import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-surface-900 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
