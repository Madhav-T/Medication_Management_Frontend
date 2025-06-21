import { Navigate } from 'react-router-dom';
import { getToken } from '../lib/auth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
