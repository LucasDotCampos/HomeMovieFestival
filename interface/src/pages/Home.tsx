import '../styles/home.scss';
import { Link } from 'react-router-dom';
import { Nav } from '../components/nav';

export function Home() {
  return (
    <div id="home-page">
      <div className="nav">
        <Nav title="Home" />
      </div>
      <div className="content">
        «——»
        <button>
          <Link to="/movies">List of movies</Link>
        </button>
        «——»
        <button>
          <Link to="/new">Add a new movie</Link>
        </button>
        «——»
      </div>
    </div>
  );
}
