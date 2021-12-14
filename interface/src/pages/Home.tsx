import { Button } from 'react-bootstrap';
import { useAuth } from './../contexts/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();
  const logUser = () => {
    console.log(currentUser);
  };

  return (
    <div id="home-page">
      <p className="title">Last Movies</p>
      <Button onClick={logUser}>Log User</Button>
    </div>
  );
}
