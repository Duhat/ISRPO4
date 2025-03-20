import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VideoItem from './VideoItem';
import './VideoDetailPage.css';

const VideoDetailPage = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [likesCount, setLikesCount] = useState(0);
    const [userLiked, setUserLiked] = useState(false); // Используем состояние для отслеживания лайка

    // Используем localStorage для хранения информации о лайкнутых видео
    const [likedVideos, setLikedVideos] = useState(() => {
        const storedLikes = localStorage.getItem('likedVideos');
        return storedLikes ? JSON.parse(storedLikes) : [];
    });

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(`https://dart-server-back.up.railway.app/api/video/${videoId}`);
                const data = await response.json();
                setVideo(data);

                const relatedResponse = await fetch(`https://dart-server-back.up.railway.app/api/video?categoryId=${data.categoryId}`);
                const relatedData = await relatedResponse.json();
                setRelatedVideos(relatedData.filter(v => v.id !== data.id));

                // Получаем количество лайков (заглушка)
                setLikesCount(Math.floor(Math.random() * 100)); // Генерируем случайное число лайков

            } catch (error) {
                console.error('Ошибка при получении видео:', error);
            }
        };

        fetchVideo();
    }, [videoId]);

    useEffect(() => {
        // Обновляем localStorage при изменении likedVideos
        localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
    }, [likedVideos]);

    // Проверяем, лайкнуто ли текущее видео
    useEffect(() => {
        setUserLiked(likedVideos.includes(videoId));
    }, [videoId, likedVideos]);

    const toggleLike = () => {
        if (userLiked) {
            // Убираем из списка лайкнутых
            setLikedVideos(prevLikes => prevLikes.filter(id => id !== videoId));
        } else {
            // Добавляем в список лайкнутых
            setLikedVideos(prevLikes => [...prevLikes, videoId]);
        }
        // Обновляем состояние лайка
        setUserLiked(!userLiked);
    };

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
        <div className="video-detail-page">
            <div className="video-main-content">
                <div className="video-player">
                    <div dangerouslySetInnerHTML={{ __html: video.iframe }} />
                </div>
                <div className="video-info">
                    <h2>{video.title}</h2>
                    <p>{video.description}</p>
                    <button onClick={toggleLike}>
                        {userLiked ? 'Unlike' : 'Like'}
                    </button>
                    
                </div>
            </div>
            <div className="related-videos">
                <h3>Related Videos</h3>
                {relatedVideos.map((relatedVideo) => (
                    <VideoItem key={relatedVideo.id} video={relatedVideo} />
                ))}
            </div>
        </div>
    );
};

export default VideoDetailPage;
