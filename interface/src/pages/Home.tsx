import '../styles/home.scss';
import { Link } from 'react-router-dom';
import { Nav } from '../components/nav';
import { Button } from '@chakra-ui/react';

export function Home() {
  return (
    <div id="home-page">
      <div className="nav">
        <Nav title="Home" />
      </div>
      <div className="content">
        «——»
        <Button colorScheme="teal" variant="outline" w={120}>
          <Link id="link" to="/movies">
            List of movies
          </Link>
        </Button>
        «——»
        <Button colorScheme="teal" variant="outline" w={145}>
          <Link id="link" to="/newmovie">
            Add a new movie
          </Link>
        </Button>
        «——»
      </div>
    </div>
  );
}
