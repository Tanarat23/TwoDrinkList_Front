import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import MainContainer from '../layouts/MainContainer';
import ProfilePage from '../pages/ProfilePage';
import EventPage from '../pages/EventPage';
import ProtectedRoute from '../features/authentication/components/ProtectRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainContainer />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/event',
        element: <EventPage />,
      },
    ],
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
