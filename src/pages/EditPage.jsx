import EditForm from '../features/authentication/components/EditForm';

export default function EditPage() {
  return (
    <div className='h-[100vh] flex flex-col justify-center items-center'>
      <div className='bg-[#121212] p-4 rounded-lg max-w-sm mx-auto shadow-lg flex flex-col items-center justify-center'>
        <EditForm />
      </div>
    </div>
  );
}
