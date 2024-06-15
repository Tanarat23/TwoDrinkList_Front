export default function Button({
  children,

  onClick,
}) {
  return (
    <button className='bg-[#1CD760] rounded-full p-2 w-full' onClick={onClick}>
      {children}
    </button>
  );
}
