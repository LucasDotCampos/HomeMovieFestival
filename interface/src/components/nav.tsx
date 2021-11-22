import { Link, NavLink } from 'react-router-dom';
import '../styles/nav.scss';
import { Button } from '@chakra-ui/react';

interface NavProps {
  page: string;
}

function Nav(prop: { title: string }) {
  return (
    <nav>
      <NavLink id="link" to="/">
        «
      </NavLink>
      <h1>{prop.title}</h1>
      <Button id="logout">Logout</Button>
    </nav>
  );
}

export { Nav };
