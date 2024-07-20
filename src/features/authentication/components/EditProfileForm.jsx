import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authApi from '../../../apis/auth';
import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';

export default function EditProfileForm() {
  const [editProfile, setEditProfile] = useState([]);
  const { authUser, fetchUser } = useAuth();

  const navigate = useNavigate();

  // function for set date from to DD-MM-YY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }
      return new Intl.DateTimeFormat('en-GB', options).format(date);
    } catch (error) {
      console.error('Invalid date string', error);
      return '';
    }
  };

  // fetch user data
  useEffect(() => {
    fetchUser();
    setEditProfile(authUser);
  }, []); // dependency arr : useEffect run one time

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log(editProfile.id, editProfile);
      const data = { ...editProfile };
      // Update data to server
      await authApi.updateUser(editProfile.id, data);

      toast.success('Event event success');
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className=' text-[#B3B3B3] text-3xl text-center'>EDIT PROFILE</h1>
      <br />

      <form onSubmit={handleSubmitForm}>
        <div className='flex flex-col items-center '>
          <Input
            placeholder={editProfile?.userName}
            value={editProfile?.userName}
            name='userName'
            onChange={handleChangeInput}
          />
        </div>
        <br />
        <div className='flex flex-col items-center '>
          <Input
            placeholder={editProfile?.birthDate}
            value={editProfile?.birthDate}
            name='birthDate'
            onChange={handleChangeInput}
          />
        </div>
        <br />
        <br />
        <div className='w-full'>
          <Button>EDIT</Button>
          <Link to='/profile' className='text-[#B3B3B3] underline'>
            Cancle
          </Link>
        </div>
      </form>
    </>
  );
}
