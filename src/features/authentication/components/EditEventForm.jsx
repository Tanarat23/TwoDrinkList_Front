import Button from '../../../components/Button';
import { Link } from 'react-router-dom';
import Input from '../../../components/Input';
import { useState } from 'react';
import { useEffect } from 'react';
import postApi from '../../../apis/post';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import locationApi from '../../../apis/location';
import categoryApi from '../../../apis/category';

const initialInput = {
  locationId: '',
  dueDate: '',
  description: '',
  joinLimit: '',
  categoryId: '',
};

export default function EditEventForm() {
  const { eventId } = useParams();
  const [editPost, setEditPost] = useState([]);
  // DROPDOWN Location and Category
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const [inputError, setInputError] = useState(initialInput);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resLocation = await locationApi.getAllLocation();
        const resCategory = await categoryApi.getAllCategory();
        setLocation(resLocation.data.locations);
        setCategory(resCategory.data.categorys);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // useEffect will re-render when id is change
  }, [eventId]);

  const handleChangeInput = (e) => {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postApi.getEventById(+eventId);
        // console.log(res.data.posts);
        const data = res.data.posts;
        data.dueDate = data?.dueDate?.slice(0, -8);
        setEditPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      console.log(editPost.id, editPost);
      const data = { ...editPost };
      data.dueDate = data.dueDate + ':00.000Z';
      await postApi.updateEvent(editPost.id, data);
      toast.success('Event event success');
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className=' text-[#B3B3B3] text-3xl text-center'>EDIT EVENT</h1>
      <br />
      <form onSubmit={handleSubmitEdit}>
        <div className='flex flex-col items-center '>
          <br />

          <div className='w-full text-[#B3B3B3]'>
            <select
              name='locationId'
              value={editPost.locationId}
              onChange={handleChangeInput}
              className={`w-full rounded-full focus:outline-none focus:ring-2 bg-[#253239] border  px-2 py-2 border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]
              ${
                inputError.locationId
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]'
              }
  `}
            >
              <option value=''>Location</option>
              {location.map((place) => (
                <option key={place.id} value={place.id}>
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
              // placeholder=
              name='dueDate'
              value={editPost?.dueDate}
              onChange={handleChangeInput}
            />
          </div>

          <br />

          <div className='w-full'>
            <Input
              placeholder={editPost?.description}
              value={editPost?.description}
              name='description'
              onChange={handleChangeInput}
            />
          </div>
          <br />

          <div className='flex gap-3 w-full text-[#B3B3B3]'>
            <div>
              <Input
                placeholder={editPost?.joinLimit}
                value={editPost?.joinLimit}
                name='joinLimit'
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <select
                name='categoryId'
                value={editPost.categoryId}
                onChange={handleChangeInput}
                className={`w-full rounded-full focus:outline-none focus:ring-2 bg-[#253239] border  px-2 py-2 border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]
    ${
      inputError.categoryId
        ? 'border-red-500 focus:ring-red-300'
        : 'border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]'
    }
  `}
              >
                <option value=''>What you drink</option>
                {category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {inputError.categoryId ? (
                <small className='text-red-500'>{inputError.categoryId}</small>
              ) : null}
            </div>
          </div>
          <br />
          <div className='w-full'>
            <Button>EDIT</Button>
            <Link to='/profile' className='text-[#B3B3B3] underline'>
              Cancle
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
