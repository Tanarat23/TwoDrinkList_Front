import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useEffect } from 'react';
import Avatar from '../../../components/Avatar';

export default function ProfileHistoryContainer() {
  const { authUser, fetchUser } = useAuth();

  // manage DATE
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', options).format(date); // 'en-GB' for DD-MM-YY format
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='bg-black flex flex-col items-center gap-10 py-10 px-5 rounded-2xl '>
      <h1 className='text-4xl text-[#FFFFFF]'>{authUser?.userName}</h1>
      <Avatar
        src={authUser?.profileImage}
        size='15'
        className='w-full h-full'
      />
      <div className='text-white flex flex-col justify-start  w-full'>
        <h1 className='text-2xl'>EMAIL</h1>
        <p>{authUser?.email}</p>
        <br />
        <h1 className='text-2xl'>BIRTH DAY</h1>
        <p>{formatDate(authUser?.birthDate)}</p>
      </div>

      <Link to='/editProfile' className='w-full'>
        <button className='border border-[#1CD760] p-2 rounded-full w-full text-[#FFFFFF]'>
          EDIT PROFILE
        </button>
      </Link>
    </div>
  );
}
