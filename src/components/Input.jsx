export default function Input({
  placeholder,
  type = 'text',
  error,
  value,
  onChange,
  name,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-full focus:outline-none focus:ring-2 bg-[#253239] border border-[#727272] px-2 py-2 ${
          error
            ? 'border-red-500 focus:ring-red-300'
            : 'border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]'
        }`}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error ? <small className='text-red-500'>{error}</small> : null}
    </>
  );
}
