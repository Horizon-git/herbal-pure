import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader/Loader';

interface RequireAuthProps {
  children: ReactElement;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user, isChecked } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!isChecked) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};
