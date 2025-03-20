// LikedVideosPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LikedVideoPage.css';

const LikedVideosPage = () => {
    const [likedVideos, setLikedVideos] = useState([]);
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        const storedLikes = localStorage.getItem('likedVideos');
        if (storedLikes) {
            setLikedVideos(JSON.parse(storedLikes));
        }
    }, []);

    useEffect(() => {
        const fetchVideoData = async () => {
            const videoPromises = likedVideos.map(async (videoId) => {
                try {
                    const response = await fetch(`https://dart-server-back.up.railway.app/api/video/${videoId}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch video with ID ${videoId}`);
                    }
                    return await response.json();
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });

            const results = await Promise.all(videoPromises);
            setVideoData(results.filter(video => video !== null));
        };

        if (likedVideos.length > 0) {
            fetchVideoData();
        } else {
            setVideoData([]);
        }
    }, [likedVideos]);

    return (
        <div className="liked-videos-page">
            <h2>Liked Videos</h2>
            {videoData.length > 0 ? (
                <div className="video-list">
                    {videoData.map(video => (
                        <div className="video-item" key={video.id}>
                            <Link to={`/video/${video.id}`}>
                                <img src={`https://img.youtube.com/vi/${getVideoId(video.iframe)}/mqdefault.jpg`} alt={video.title} />
                                <p>{video.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No liked videos yet.</p>
            )}
        </div>
    );
};

const getVideoId = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

export default LikedVideosPage;
