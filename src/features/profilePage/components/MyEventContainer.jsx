import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postApi from '../../../apis/post';
import useAuth from '../../../hooks/useAuth';
import Post from '../../../components/Post';
import Button from '../../../components/Button';

export default function MyEventContainer() {
  const [posts, setPosts] = useState([]);
  const { authUser } = useAuth();

  // when CLICK DELETE
  const handleDelete = async (postId) => {
    try {
      console.log(postId);
      const agree = confirm('Are you sure to delete?');
      if (!agree) {
        return console.log('Cancel');
      }
      console.log('Delete');
      // send request delete to SERVER
      await postApi.deleteEvent(postId);

      // filter post ที่ถูกลบออกจากรายการ
      setPosts((prev) => prev.filter((el) => el.id !== postId));
    } catch (error) {
      console.log(error);
    }
  };

  // show post for this user
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postApi.getEvent();
        setPosts(
          res.data.posts
            .sort((a, b) => b.id - a.id)
            .filter((post) => post?.userId === authUser?.id)
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [authUser]);

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='bg-black text-center py-6 rounded-2xl text-white text-4xl col-span-2'>
        MY EVENT
      </div>
      {/* ##################################### */}
      {posts.map((post) => (
        <div key={post?.id} className='flex flex-col bg-black rounded-2xl p-2'>
          <Post post={post} />
          <div className='bg-black p-4 flex justify-end gap-4 rounded-full'>
            <Link to={`/editEvent/${post.id}`} className='w-1/2'>
              <button
                className='bg-[#1CD760] w-full rounded-full p-2  '
                // onClick={() => {}}
              >
                EDIT
              </button>
            </Link>
            <button
              className='bg-[#1CD760] w-1/2 rounded-full p-2  '
              onClick={() => {
                handleDelete(post?.id);
              }}
            >
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
