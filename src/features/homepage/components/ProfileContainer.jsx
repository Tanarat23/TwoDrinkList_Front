import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Avatar from '../../../components/Avatar';

export default function ProfileContainer() {
  // call AuthContext
  const { authUser } = useAuth();
  return (
    <div className='bg-black flex flex-col items-center gap-10 py-10 px-5 rounded-2xl '>
      <h1 className='text-4xl text-[#FFFFFF]'>{authUser?.userName}</h1>

      <Link to='/profile' className='shrink-0 '>
        <Avatar
          src={authUser?.profileImage}
          className='hover:border border-green-400'
        />
      </Link>

      <Link to='/profile' className='w-full'>
        <button className='border-2 border-[#1CD760] p-2 rounded-full w-full text-[#FFFFFF] hover:bg-[#1CD760]'>
          PROFILE
        </button>
      </Link>
    </div>
  );
}
