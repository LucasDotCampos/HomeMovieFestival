import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Nav } from '../components/nav';
// import '../styles/movies.scss';

interface ILista {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  magnet: string;
}

export function Movies() {
  const [lista, setLista] = useState<ILista[]>([]);

  useEffect(() => {
    async function getMovies() {
      const response = await api.get('movies');
      setLista(response.data);
    }
    getMovies();
  }, []);

  return (
    <div id="movies-page">
      <Nav />
      <div className="movie-list">
        {lista.map((lista) => (
          <div key={lista.id} className="movie p-4" style={{ display: 'flex' }}>
            <div>
              <img
                style={{
                  height: '20vh',
                  maxHeight: '150px',
                  maxWidth: '150px',
                  marginRight: '16px',
                }}
                id="image"
                src={`http://localhost:3333/uploads/${lista.image}`}
                alt="product"
              />
            </div>
            <div className="info">
              <p className="title" id="title">
                {lista.title}
              </p>
              <p>{lista.description}</p>
              <p>{lista.magnet}</p>
              <p>releaseDate: {lista.releaseDate.substring(0, 10)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
