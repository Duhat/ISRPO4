import React, { useState, useEffect } from 'react';
import VideoItem from './VideoItem'; // Импортируем компонент VideoItem
import './RecommendedVideos.css';

const RecommendedVideos = ({ category }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://dart-server-back.up.railway.app/api/video');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Ошибка при получении видео:', error);
      }
    };
    fetchVideos();
  }, []);

  const filteredVideos = category && category !== "All"
    ? videos.filter((video) => video.category.name.toLowerCase().includes(category.toLowerCase()))
    : videos;

  return (
    <div className="recommended-videos">
      <h2>{category && category !== "All" ? `${category} Videos` : 'All Recommended Videos'}</h2>
      <div className="videos-list">
        {filteredVideos.map((video) => (
          <VideoItem key={video.id} video={video} /> // Используем компонент VideoItem
        ))}
      </div>
    </div>
  );
};

export default RecommendedVideos;
