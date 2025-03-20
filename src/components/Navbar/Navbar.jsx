import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [videos, setVideos] = useState([]); // Добавляем состояние для хранения всех видео

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://dart-server-back.up.railway.app/api/video');
        const data = await response.json();
        setVideos(data); // Сохраняем все видео в состоянии
      } catch (error) {
        console.error('Ошибка при получении видео:', error);
      }
    };
    fetchVideos();
  }, []);

  const handleLogoClick = () => {
    navigate('/'); // Переход на главную страницу
  };

  const handleLikedClick = () => {
    navigate('/liked'); // Переход на страницу понравившихся видео
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Фильтруем видео на основе введенного текста
    if (term) {
      const results = videos.filter(video =>
        video.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]); // Очищаем результаты, если поле поиска пустое
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={handleLogoClick}>
        <img
          src="https://static.tildacdn.com/tild6264-3734-4865-a137-306437306463/1.png"
          alt="Logo"
          style={{ width: '150px', height: 'auto' }}
        />
      </div>
      <div className="navbar__search">
        <input
          type="text"
          placeholder="Search for videos..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map(video => (
              <li key={video.id}>
                <Link to={`/video/${video.id}`}>{video.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="navbar__auth">
        {/* Кнопка для перехода на страницу понравившихся */}
        <button className='login_button' onClick={handleLikedClick}>Понравившееся</button>
      </div>
    </nav>
  );
};

export default Navbar;
