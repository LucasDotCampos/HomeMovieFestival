import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  element: React.ComponentType;
  path?: string;
}

export const PrivateRoute: React.FC<Props> = ({ element: RouteElement }) => {
  const { isLogged } = useAuth();

  if (isLogged) {
    return <RouteElement />;
  }

  return <Navigate to="/login" />;
};
