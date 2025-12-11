import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './app_pages/dashboard-page';
import NotesLibrary from './app_pages/notes-library';
import ProgressTracking from './app_pages/progress-page';
import TestSelection from './app_pages/test-selection-page';
import TestInterface from './app_pages/test-selection-page';
// import WordLearning from './app_pages/learning-page'; // Replaced by new one
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
        <Route path="/test/:testId" element={<TestInterface />} />
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
