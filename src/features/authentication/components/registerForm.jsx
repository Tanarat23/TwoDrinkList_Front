import { useState } from 'react';
import { toast } from 'react-toastify';
import validateRegister from '../validators/validate-register';
import authApi from '../../../apis/auth';
import { AxiosError } from 'axios';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const initialInput = {
  userName: '',
  password: '',
  confirmPassword: '',
  email: '',
  birthDate: '',
};

const initialInputError = {
  userName: '',
  password: '',
  confirmPassword: '',
  email: '',
  birthDate: '',
};

export default function RegisterForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const navigate = useNavigate();

  const handleChangeInput = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateRegister(input);
      if (error) {
        return setInputError(error);
      }
      setInputError({ ...initialInputError });
      const res = await authApi.register(input);
      console.log(res);
      toast.success('Register success');
      navigate('/login');
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response.data.field === 'userName')
          setInputError((prev) => ({
            ...prev,
            emailOrMobile: 'Username already in use.',
          }));
      }
    }
  };

  return (
    <>
      <h1 className=' text-[#B3B3B3] text-4xl text-center italic'>
        Two Drink List
      </h1>
      <p className=' text-[#B3B3B3] text-2xl text-center'>REGISTER</p>
      <br />
      <form onSubmit={handleSubmitForm} className=''>
        <div className='flex flex-col items-center '>
          <div className='w-full'>
            <Input
              placeholder='Username'
              value={input.userName}
              name='userName'
              onChange={handleChangeInput}
              error={inputError.userName}
            />
          </div>
          <br />
          <div className='w-full'>
            <Input
              placeholder='Email'
              value={input.email}
              name='email'
              onChange={handleChangeInput}
              error={inputError.email}
            />
          </div>
          <br />
          <div className='w-full'>
            <Input
              placeholder='Password'
              type='password'
              value={input.password}
              name='password'
              onChange={handleChangeInput}
              error={inputError.password}
            />
          </div>
          <br />
          <div className='w-full'>
            <Input
              placeholder='Confirm password'
              type='password'
              value={input.confirmPassword}
              name='confirmPassword'
              onChange={handleChangeInput}
              error={inputError.confirmPassword}
            />
          </div>
          <br />
          <div className='w-full'>
            <Input
              placeholder='Date of birth'
              value={input.birthDate}
              name='birthDate'
              onChange={handleChangeInput}
              error={inputError.birthDate}
            />
          </div>
          <br />
          <div className='w-full'>
            <Button>Register</Button>
            <Link to='/login' className='text-[#B3B3B3] underline'>
              Back to login
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
