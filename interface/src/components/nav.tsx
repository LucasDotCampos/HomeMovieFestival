import { Link } from 'react-router-dom';
import '../styles/nav.scss';
import { Button } from '@chakra-ui/react';

interface NavProps {
  page: string;
}

function Nav(prop: { title: string }) {
  if (prop.title !== 'Home') {
    return (
      <nav>
        <Link id="link" to="/">
          «
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
