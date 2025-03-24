import { Suspense } from 'react';
import { RouteProps } from 'react-router-dom';

import { PrivateRoute, Spinner } from '../../components';
import { LoginPage, NotFoundPage, TablePage } from '../../pages';

export enum AppRoutes {
  LOGIN = 'login',
  TABLE = 'table',
  NOT_FOUND = 'not-found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/',
  [AppRoutes.TABLE]: '/table',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.TABLE]: {
    path: RoutePath.table,
    element: (
      <PrivateRoute>
        <Suspense fallback={<Spinner />}>
          <TablePage />
        </Suspense>
      </PrivateRoute>
    ),
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath['not-found'],
    element: <NotFoundPage />,
  },
};
