import { Link, NavLink } from 'react-router-dom';
import '../styles/nav.scss';
import { Button } from '@chakra-ui/react';
import { FaRegUser } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/react';

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
      <IconButton
        id="user-icon"
        isRound={true}
        variant="outline"
        aria-label="user-icon"
        icon={<FaRegUser />}
      />
    </nav>
  );
}

export { Nav };
