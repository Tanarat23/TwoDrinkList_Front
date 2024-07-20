import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Spinner from '../../../components/Spinner';

export default function ProtectedRoute({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();

  // if user Confirm Not success
  if (!authUser && !isAuthUserLoading) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {isAuthUserLoading && <Spinner />}
      {children}
    </>
  );
}
