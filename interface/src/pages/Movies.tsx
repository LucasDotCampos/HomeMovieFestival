import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/movies.scss';
import { Nav } from '../components/nav';

interface ILista {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
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
      <Nav title="Movies" />
      <div className="movie-list">
        {lista.map((lista) => (
          <div key={lista.id} className="movie">
            <h3 id="title">{lista.title}</h3>
            <p>{lista.description}</p>
            <p>releaseDate: {lista.releaseDate.substring(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
