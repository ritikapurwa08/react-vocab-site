import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicHome from './pages/PublicHome';
import IdiomsPage from './pages/IdiomsPage';
import PhrasalVerbsPage from './pages/PhrasalVerbsPage';
import AuthPage from './pages/AuthPage';
import TestPage from './pages/TestPage';
import TestSelection from './pages/TestSelectionPage';
import WordLearningPage from './pages/WordLearningPage';

import Navbar from '@/layouts/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicHome />} />
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
