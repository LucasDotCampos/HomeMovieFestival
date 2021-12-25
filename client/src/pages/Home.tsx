import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface ILista {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  magnet: string;
}

export default function Home() {
  const [lastMoviesList, setLastMoviesList] = useState<ILista[]>([]);

  const getLastMovies = async () => {};

  useEffect(() => {
    async function getMovies() {
      const response = await api.get('/movies');
      console.log(response);
      setLastMoviesList(response.data);
      console.log(lastMoviesList);
    }
    getMovies();
  }, []);

  return (
    <div id="home-page">
      <div className="movie-list">
        {lastMoviesList.slice(0, 5).map((lastMoviesList) => (
          <div
            key={lastMoviesList.id}
            className="movie p-4"
            style={{ display: 'flex' }}
          >
            <div>
              <img
                style={{
                  height: '20vh',
                  maxHeight: '150px',
                  maxWidth: '150px',
                  marginRight: '16px',
                }}
                id="image"
                src={`http://localhost:4000/files/${lastMoviesList.image}`}
                alt="product"
              />
            </div>
            <div className="info">
              <p className="title" id="title">
                {lastMoviesList.title}
              </p>
              <p>{lastMoviesList.description}</p>
              <p>{lastMoviesList.magnet}</p>
              <p>releaseDate: {lastMoviesList.releaseDate.substring(0, 10)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
