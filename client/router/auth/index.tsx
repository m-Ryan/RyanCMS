import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import ErrorPage from '../../pages/auth/Error';
import Welcome from '../../pages/auth/Welcome';

export function getAuthRoutes() {
  return (
    [
      {
        path: '/',
        component: Welcome,
        exact: true,
      },
      {
        path: '/login',
        component: Login,
        exact: true,
      },
      {
        path: '/register',
        component: Register,
        exact: true,
      },
      {
        path: '/error',
        component: ErrorPage,
        exact: true,
      },
    ]
  );
}