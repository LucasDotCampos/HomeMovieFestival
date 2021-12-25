import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { api } from '../services/api';
import '../style/movies.scss';

interface ILista {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  magnet: string;
}

export default function Movies() {
  const [lista, setLista] = useState<ILista[]>([]);

  useEffect(() => {
    async function getMovies() {
      const response = await api.get('movies');
      console.log(response);

      setLista(response.data);
    }
    getMovies();
  }, []);

  return (
    <div id="movies-page">
      <div className="movie-list">
        {lista.map((lista) => (
          <div key={lista.id} className="movie p-4" style={{ display: 'flex' }}>
            <div>
              <img
                style={{
                  height: '100%',
                  maxHeight: '200px',
                  maxWidth: '150px',
                  marginRight: '16px',
                }}
                id="image"
                src={`http://localhost:4000/files/${lista.image}`}
                alt="product"
              />
            </div>
            <div className="info">
              <p className="title" id="title">
                <strong>{lista.title}</strong>
              </p>
              <p>{lista.description}</p>
              <p>{lista.magnet}</p>
              <p>releaseDate: {lista.releaseDate.substring(0, 10)}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination className="d-flex align-items-center justify-content-center">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>

        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item>{14}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
}
