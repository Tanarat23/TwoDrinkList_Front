import { Slide, ToastContainer } from 'react-toastify';
import Router from './route/indexRoute';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <PostContextProvider>
          <Router />
          <ToastContainer
            position='bottom-right'
            autoClose={3000}
            transition={Slide}
          />
        </PostContextProvider>
      </AuthContextProvider>
    </div>
  );
}
