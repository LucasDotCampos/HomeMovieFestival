import { Nav } from '../components/nav';
import '../styles/home.scss';

export function Home() {
  const style = {
    movies: {
      height: '30vw',
      width: '30vw',
      maxHeight: '300px',
      maxWidth: '300px',
    },
  };

  return (
    <div id="home-page">
      <Nav />
      <div className="section">
        <p className="title">Last Movies</p>
        <div className="container">
          <div className="columns"></div>
        </div>
      </div>
    </div>
  );
}
