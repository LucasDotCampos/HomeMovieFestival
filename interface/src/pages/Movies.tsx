import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/movies.scss';
import { Nav } from '../components/nav';
import { Box, Text } from '@chakra-ui/react';

interface ILista {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
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
      <Box className="movie-list">
        {lista.map((lista) => (
          <Box shadow="base" key={lista.id} className="movie">
            <Box className="image">
              <img
                id="image"
                src={`http://localhost:3333/uploads/${lista.image}`}
                alt="product"
              />
            </Box>
            <div className="info">
              <Text id="title">{lista.title}</Text>
              <Text>{lista.description}</Text>
              <Text>releaseDate: {lista.releaseDate.substring(0, 10)}</Text>
            </div>
          </Box>
        ))}
      </Box>
    </div>
  );
}
