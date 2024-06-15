import { Link } from 'react-router-dom';
import RegisterForm from '../features/authentication/components/registerForm';

export default function RegisterPage() {
  return (
    <div className='bg-[#121212] p-4 rounded-lg max-w-sm mx-auto shadow-lg mt-32 flex flex-col'>
      <RegisterForm />
    </div>
  );
}
