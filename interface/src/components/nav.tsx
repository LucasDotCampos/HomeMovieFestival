import { Link } from 'react-router-dom';
import '../styles/nav.scss';

interface NavProps {
  page: string;
}

function Nav(prop: { title: string }) {
  if (prop.title !== 'Home') {
    return (
      <nav>
        <Link id="link" to="/">
          « Home
        </Link>
        <h1>{prop.title}</h1>
        <p></p>
      </nav>
    );
  }
  return (
    <nav>
      <h1>{prop.title}</h1>
      <p></p>
    </nav>
  );
}

export { Nav };
