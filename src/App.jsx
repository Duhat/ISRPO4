import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecommendedVideos from './components/RecommendedVideos';
import VideoDetailPage from './components/VideoDetailPage';

import Navbar from './components/Navbar/Navbar'; // Импортируем Navbar
import MainPage from './components/MainPage';
import './App.css';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Вставляем Navbar */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/video/:videoId" element={<VideoDetailPage />} />
          <Route path="/liked" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
