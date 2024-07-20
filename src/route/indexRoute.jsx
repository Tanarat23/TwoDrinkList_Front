import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import MainContainer from '../layouts/MainContainer';
import ProfilePage from '../pages/ProfilePage';
import EventPage from '../pages/EventPage';
import ProtectedRoute from '../features/authentication/components/ProtectRoute';
import EditPage from '../pages/EditPage';
import EditEventPage from '../pages/EditEventPage';
import EditProfile from '../pages/EditProfile';

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
      {
        path: '/edit',
        element: <EditPage />,
      },
      {
        path: '/editProfile',
        element: <EditProfile />,
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
  {
    path: '/editEvent/:eventId',
    element: <EditEventPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
