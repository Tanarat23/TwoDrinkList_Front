import { Link } from 'react-router-dom';
import EventForm from '../features/authentication/components/EventForm';

export default function RegisterPage() {
  return (
    <div className='h-[100vh] flex flex-col justify-center items-center'>
      <div className='bg-[#121212] p-4 rounded-lg max-w-sm mx-auto shadow-lg flex flex-col items-center justify-center'>
        <EventForm />
      </div>
    </div>
  );
}
