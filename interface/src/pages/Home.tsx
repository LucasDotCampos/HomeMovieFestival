import { Nav } from '../components/nav';
import '../styles/home.scss';

import ugoodImg from '../images/ugood.jpg';
import zoroImg from '../images/joestarzoorp.jpg';
import ruruImg from '../images/ruru.png';

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
          <div className="columns">
            <div className="column">
              <img style={style.movies} src={ugoodImg} alt="" />
              <p className="is-size-5">U good</p>
            </div>
            <div className="column">
              <img style={style.movies} src={zoroImg} alt="" />
              <p className="is-size-5">Zoro Joestar</p>
            </div>
            <div className="column">
              <img style={style.movies} src={ruruImg} alt="" />
              <p className="is-size-5">Ruru Magician</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
