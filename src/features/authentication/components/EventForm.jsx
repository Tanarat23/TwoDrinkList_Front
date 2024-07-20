import { useState } from 'react';
import { toast } from 'react-toastify';
import authApi from '../../../apis/auth';
import { AxiosError } from 'axios';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import locationApi from '../../../apis/location';
import categoryApi from '../../../apis/category';
import validateEvent from '../validators/validate-event';
import usePost from '../../../hooks/usePost';
import postApi from '../../../apis/post';

const initialInput = {
  locationId: '',
  dueDate: '',
  description: '',
  joinLimit: '',
  categoryId: '',
};

export default function EventForm() {
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);

  const [input, setInput] = useState({ ...initialInput });
  const [inputError, setInputError] = useState({ ...initialInput });

  const { createEvent } = usePost();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch All Location from API
        const resLocation = await locationApi.getAllLocation();
        // fetch All Category from API
        const resCategory = await categoryApi.getAllCategory();
        setLocation(resLocation.data.locations);
        setCategory(resCategory.data.categorys);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      // set date to ISO 8601.
      input.dueDate = input.dueDate + ':00.000Z';
      console.log(input);

      const error = validateEvent(input);
      if (error) {
        return setInputError(error);
      }

      setInputError({ ...initialInput });
      const lastValue = input;
      lastValue.locationId = +lastValue.locationId;
      lastValue.joinLimit = +lastValue.joinLimit;
      lastValue.categoryId = +lastValue.categoryId;
      await postApi.createEvent(lastValue);

      // const formData = new FormData();
      // for (const key in lastValue) {
      //   console.log(key, lastValue[key]);
      //   formData.append(key, lastValue[key]);
      // }

      // await postApi.createEvent(formData);
      toast.success('Create event success');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className=' text-[#B3B3B3] text-3xl text-center'>CREATE EVENT</h1>
      <br />
      <form onSubmit={handleSubmitForm}>
        <div className='flex flex-col items-center '>
          <br />
          <div className='w-full text-[#B3B3B3]'>
            <select
              name='locationId'
              value={input.locationId}
              onChange={handleChangeInput}
              className={`w-full rounded-full focus:outline-none focus:ring-2 bg-[#253239] border  px-2 py-2 border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]
              ${
                inputError.locationId
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]'
              }
              `}
            >
              <option>Location</option>
              {location.map((place) => (
                <option key={place.id} value={`${place.id}`}>
                  {place.name}
                </option>
              ))}
            </select>
            {inputError.locationId ? (
              <small className='text-red-500'>{inputError.locationId}</small>
            ) : null}
          </div>
          <br />
          <div className='w-full text-[#B3B3B3]'>
            <Input
              type='datetime-local'
              placeholder='Date'
              name='dueDate'
              value={input.dueDate}
              onChange={handleChangeInput}
              error={inputError.dueDate}
            />
          </div>
          <br />
          <div className='w-full'>
            <Input
              placeholder='Description'
              name='description'
              value={input.description}
              onChange={handleChangeInput}
              error={inputError.description}
            />
          </div>
          <br />
          <div className='flex gap-3 w-full text-[#B3B3B3]'>
            <Input
              placeholder={'Join limit'}
              name={'joinLimit'}
              value={input.joinLimit}
              onChange={handleChangeInput}
              error={inputError.joinLimit}
            />
            <select
              name='categoryId'
              onChange={handleChangeInput}
              className={`w-full rounded-full focus:outline-none focus:ring-2 bg-[#253239] border  px-2 py-2 border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]
                ${
                  inputError.categoryId
                    ? 'border-red-500 focus:ring-red-300'
                    : 'border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]'
                }
                `}
            >
              <option>What you drink</option>
              {category.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
            {inputError.categoryId ? (
              <small className='text-red-500'>{inputError.categoryId}</small>
            ) : null}
          </div>
          <br />
          <div className='w-full text-[#B3B3B3]'>
            <input
              type='file'
              name='image'
              onChange={handleChangeInput}
              className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1CD760]  '
            />
            {input.image && <p>{input.image.name}</p>}
          </div>
          <br />
          <div className='w-full'>
            <Button>CREATE</Button>
            <Link to='/' className='text-[#B3B3B3] underline'>
              Back to homepage
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
