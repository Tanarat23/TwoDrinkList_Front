import JoinEvent from '../features/homepage/components/JoinEvent';
import PostContainer from '../features/homepage/components/postContainer';
import ProfileContainer from '../features/homepage/components/ProfileContainer';

export default function HomePage() {
  return (
    <div className='flex flex-row justify-between  gap-5 m-5'>
      <div className='w-1/4'>
        <ProfileContainer />
      </div>

      <div className='w-3/4  h-full'>
        <PostContainer />
      </div>

      {/* <div className=' w-1/4'>
        <JoinEvent />
      </div> */}
    </div>
  );
}
