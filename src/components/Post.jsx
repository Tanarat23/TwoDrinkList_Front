import React from 'react';
import useAuth from '../hooks/useAuth';
import relationApi from '../apis/relation';
import { useState } from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Post({ post }) {
  const { authUser } = useAuth();
  //
  const [join, setJoin] = useState(post?.Joins[0]);
  // x /
  const [joinCount, setJoinCount] = useState(post?.Joins.length || 0);

  // user join this event?
  useEffect(() => {
    const userJoined = post?.Joins.some((join) => join.userId === authUser.id);
    setJoin(userJoined);
    // re-render when post or user is change
  }, [post, authUser.id]);

  // call when USER CLICK 'WILLGO'
  const handleClickWillGo = async (e) => {
    try {
      e.preventDefault();
      const data = { postId: post?.id, userId: authUser.id };
      console.log(data);
      // if not joined => create new join
      if (!join) {
        const res = await relationApi.createRelation(data);
        setJoin(true);
        setJoinCount(joinCount + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // call when USER CLICK 'CANCLE'
  const handleClickCancle = async (e) => {
    try {
      e.preventDefault();
      const res = await relationApi.deleteRelation(post?.id);
      console.log(res);
      setJoin(false);
      setJoinCount(joinCount - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='col-span-1'>
      <div className='bg-black rounded-2xl p-5 flex flex-col gap-4 h-96'>
        <div className='flex gap-5'>
          <Link to='/profile' className='shrink-0'>
            <Avatar src={authUser?.profileImage} />
          </Link>
          <div className='text-white'>
            <div>{post?.user?.userName}</div>
            <div>{post?.location?.name}</div>
            <div>{post?.dueDate}</div>
            <div>{post?.category?.name}</div>
          </div>
        </div>
        <div className='border border-[#242424] text-white'>
          <p>{post?.description}</p>
        </div>
        <div className='w-full h-48 border border-[#242424]'>
          {post?.location?.image}
        </div>
        <div className='text-white'>
          <div>
            {joinCount} / {post?.joinLimit} Will go
          </div>
        </div>
        <div>
          {authUser?.id !== post.userId && (
            <div className='flex justify-end items-center gap-3 m-2'>
              {!join ? (
                <button
                  className='border border-[#1CD760] py-2 px-5 rounded-full text-[#ffffff]'
                  onClick={handleClickWillGo}
                >
                  WILL GO
                </button>
              ) : (
                <button
                  className='border border-[#1CD760] bg-[#1CD760] py-2 px-5 rounded-full text-[#ffffff]'
                  onClick={handleClickCancle}
                >
                  CANCEL
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
