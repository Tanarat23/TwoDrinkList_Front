import MyEventContainer from '../features/profilePage/components/MyEventContainer';
import ProfileHistoryContainer from '../features/profilePage/components/ProfileHistoryContainer';

export default function ProfilePage() {
  return (
    <div className='flex flex-row justify-between  gap-5 m-5'>
      <div className='w-1/4  h-full'>
        <ProfileHistoryContainer />
      </div>
      <div className='w-3/4'>
        <MyEventContainer />
      </div>
    </div>
  );
}
