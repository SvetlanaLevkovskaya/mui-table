import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RoutePath } from '../../lib/config/routeConfig.tsx';
import { RootState } from '../../store/store.ts';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to={RoutePath.login} />;
  }

  return <>{children}</>;
};
