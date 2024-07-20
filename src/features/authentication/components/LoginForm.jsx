import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import validateLogin from '../validators/validate-login';

const initialInput = {
  userName: '',
  password: '',
};

const initialInputError = {
  userName: '',
  password: '',
};

export default function LoginForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const { login } = useAuth();
  const navigate = useNavigate();

  // ####### Manage value from tag <Input/> #######
  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // ####### Manage after click submmit form from tag <form/> #######
  const handleSubmitForm = async (e) => {
    try {
      // Protect refresh page
      e.preventDefault();
      const error = validateLogin(input);
      if (error) {
        return setInputError(error);
      }
      setInputError(initialInputError);
      console.log(input);

      // Connect server
      await login(input);

      navigate('/');
      toast.success('login successfully');
    } catch (err) {
      console.log(err);

      // ตรวจสอบว่าข้อผิดพลาดนั้นเป็น AxiosError หรือไม่
      if (err instanceof AxiosError) {
        const message =
          err.response.status === 400
            ? 'Invalid username'
            : 'Internal server error';

        return toast.error(message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className='bg-[#121212] p-4 rounded-lg max-w-sm mx-auto shadow-lg mt-32 flex flex-col'>
        <h1 className=' text-[#B3B3B3] text-4xl text-center italic'>
          Two Drink List
        </h1>
        <p className=' text-[#B3B3B3] text-2xl text-center'>LOGIN</p>
        <br />
        <div>
          <Input
            placeholder='Username'
            name='userName'
            value={Input.userName}
            onChange={handleChangeInput}
            error={inputError.userName}
          />
        </div>
        <br />
        <div>
          <Input
            placeholder='Password'
            type='password'
            name='password'
            value={Input.password}
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
        <br />
        <div>
          <Button>LOG IN</Button>
        </div>
        <div>
          <Link to='/register' className='text-[#B3B3B3] underline'>
            Click to register
          </Link>
        </div>
      </div>
    </form>
  );
}
