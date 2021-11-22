import '../styles/global.scss';
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
        <Button mb={5} colorScheme="teal" variant="outline" w={150}>
          <Link id="link" to="/movies">
            List of movies
          </Link>
        </Button>
        <Button colorScheme="teal" variant="outline" w={170}>
          <Link id="link" to="/newmovie">
            Add a new movie
          </Link>
        </Button>
      </div>
    </div>
  );
}
