import React from 'react';
import { Link } from 'react-router-dom';
import './VideoItem.css'

const VideoItem = ({ video }) => {
  const placeholderImageUrl = 'https://images.genius.com/1cdd55316e105ea708180ed34bec8e6a.1000x1000x1.jpg'; // Замените на URL вашего плейсхолдера

  return (
    <div className="video-item">
      <Link to={`/video/${video.id}`}>
        <img
          src={placeholderImageUrl}
          alt={video.title}
          onError={(e) => {
            e.target.onerror = null; // Предотвращаем бесконечный цикл ошибок
            e.target.src = placeholderImageUrl; // Заменяем изображение на плейсхолдер
          }}
        />
        <p>{video.title}</p>
      </Link>
    </div>
  );
};

export default VideoItem;
