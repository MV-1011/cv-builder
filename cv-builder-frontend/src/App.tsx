import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import TemplatePreviewPage from './pages/TemplatePreviewPage';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/template-preview/:templateId" element={<TemplatePreviewPage />} />
          <Route path="/builder/:templateId?" element={<BuilderPage />} />
          <Route path="/preview/:resumeId" element={<PreviewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
