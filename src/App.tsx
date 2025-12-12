import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicHome from './pages/PublicHome';
import IdiomsPage from './pages/IdiomsPage';
import PhrasalVerbsPage from './pages/PhrasalVerbsPage';
import AuthPage from './pages/AuthPage';
import TestPage from './pages/TestPage';
import TestSelection from './pages/TestSelectionPage';
import WordLearningPage from './pages/WordLearningPage';


import Navbar from '@/layouts/Navbar';
import UserProfilePage from './pages/user-profile-page';

function App() {
  return (
    <BrowserRouter>
      {/* Use one single Navbar globally */}
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicHome />} />

        {/* Core Learning Pages */}
        <Route path="/learn" element={<WordLearningPage />} />
        <Route path="/idioms" element={<IdiomsPage />} />
        <Route path="/phrasal-verbs" element={<PhrasalVerbsPage />} />

        {/* Test Pages */}
        <Route path="/tests" element={<TestSelection />} />
        {/* Single dynamic route for all tests */}
        <Route path="/test/:testId" element={<TestPage />} />

        {/* Auth and Profile */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
      {/* <BottomNav /> - Removed the bottom nav based on user request to use only main bar */}
    </BrowserRouter>
  );
}

export default App;
