import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './app_pages/dashboard-page';
import NotesLibrary from './app_pages/notes-library';
import ProgressTracking from './app_pages/progress-page';
import TestSelection from './app_pages/test-selection-page';
import TestInterface from './app_pages/test-selection-page';
import WordLearning from './app_pages/learning-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notes" element={<NotesLibrary />} />
        <Route path="/progress" element={<ProgressTracking />} />
        <Route path="/tests" element={<TestSelection />} />
        <Route path="/test/:testId" element={<TestInterface />} />
        <Route path="/learn" element={<WordLearning />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
