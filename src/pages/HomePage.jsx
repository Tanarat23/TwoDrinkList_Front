import PostContainer from '../features/homepage/components/postContainer';

export default function HomePage() {
  return (
    <div className='flex flex-row justify-between h-screen gap-10 m-10'>
      <div className='bg-green-300 w-full '>
        <h1>Profile</h1>
      </div>
      <div className='w-full bg-green-800'>
        <PostContainer />
      </div>
      <div className='bg-blue-300 w-full'>
        <h1>JoinEvent</h1>
      </div>
    </div>
  );
}
