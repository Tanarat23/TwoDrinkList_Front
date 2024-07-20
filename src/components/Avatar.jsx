import profileImg from '../assets/Screenshot 2567-07-15 at 00.26.33.png';

export default function Avatar({ src, size = 5 }) {
  return (
    <img
      src={src || profileImg}
      alt='user'
      style={{ width: `${size}rem`, height: `${size}rem` }}
      className='rounded-full'
    />
  );
}
