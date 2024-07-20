import Joined from '../../../components/Joined';

export default function JoinEvent() {
  return (
    <div className='bg-black rounded-2xl p-5 flex flex-col gap-5'>
      <h1 className='text-[#ffffff] text-xl'>Event you joined</h1>
      <Joined />
      <Joined />
      <Joined />
      <Joined />
    </div>
  );
}
