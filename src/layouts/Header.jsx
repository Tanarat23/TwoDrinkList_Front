import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className=' bg-[#000000] shadow px-4 items-center p-3'>
      <div className='justify-self-start flex flex-row justify-between items-center'>
        <Link to='/' className='flex '>
          <h1 className='text-[#FFFFFF] text-5xl '>🍻</h1>
          <h1 className='text-[#FFFFFF] text-2xl font-bold italic'>
            TWO DRINK LIST
          </h1>
        </Link>

        <div className='flex gap-4'>
          <Link to='/event'>
            <button className='border border-[#FFFFFF] text-[#FFFFFF] rounded-full p-1 w-24'>
              CREATE
            </button>
          </Link>

          <Link to='/profile'>
            <button className='border border-[#FFFFFF] text-[#FFFFFF] rounded-full p-1 w-24'>
              PROFILE
            </button>
          </Link>

          <div onClick={handleLogout}>
            <button className='border border-[#FFFFFF] text-[#FFFFFF] rounded-full p-1 w-24'>
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
