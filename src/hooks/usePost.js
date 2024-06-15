import { useContext } from 'react';
import { postContext } from '../contexts/PostContext';

export default function usePost() {
  return useContext(postContext);
}
