import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { EpisodeWorkflow } from './pages/EpisodeWorkflow';
import { CutReview } from './pages/CutReview';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="episodes/:ep" element={<EpisodeWorkflow />} />
        <Route path="episodes/:ep/cuts" element={<CutReview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
