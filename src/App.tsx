import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import NotesLibrary from './pages/NotesLibraryPage';
import ProgressTracking from './pages/ProgressPage';
import TestSelection from './pages/TestSelectionPage';

import PublicHome from './pages/PublicHome';
import IdiomsPage from './pages/IdiomsPage';
import PhrasalVerbsPage from './pages/PhrasalVerbsPage';
import AuthPage from './pages/AuthPage';
import TestPage from './pages/TestPage';
import WordLearningPage from './pages/WordLearningPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<NotesLibrary />} />
        <Route path="/progress" element={<ProgressTracking />} />
        <Route path="/tests" element={<TestSelection />} />
        <Route path="/test/:testId" element={<TestPage />} />
        {/* New Pages */}
        <Route path="/idioms" element={<IdiomsPage />} />
        <Route path="/phrasal-verbs" element={<PhrasalVerbsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/learn" element={<WordLearningPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
