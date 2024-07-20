import { Link } from 'react-router-dom';
import Post from '../../../components/Post';
import { useState } from 'react';
import { useEffect } from 'react';
import postApi from '../../../apis/post';

export default function PostContainer() {
  const [posts, setPosts] = useState([]);

  // fetch post from DATABASE
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postApi.getEvent();
        // sort post by ID (NEW to OLD)
        setPosts(res.data.posts.sort((a, b) => b.id - a.id));
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, []);

  return (
    <div className=' w-full grid grid-cols-2 gap-4 flex-col'>
      <div className='bg-black p-5 rounded-2xl col-span-2'>
        <Link to='/event'>
          <button className='bg-[#1CD760] p-2 rounded-lg w-full hover:bg-green-500'>
            CREATE EVENT
          </button>
        </Link>
      </div>
      {posts.map((post) => (
        <Post key={post?.id} post={post} />
      ))}
    </div>
  );
}
