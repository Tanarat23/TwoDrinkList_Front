import { createContext } from 'react';
import postApi from '../apis/post';
import useAuth from '../hooks/useAuth';

export const postContext = createContext();

export default function PostContextProvider({ children }) {
  const { authUser } = useAuth();
  // console.log(authUser?.id);
  const createEvent = async (body) => {
    try {
      body.locationId = +body.locationId;
      body.categoryId = +body.categoryId;
      // body.userId = authUser.id;
      body.joinLimit = +body.joinLimit;
      console.log(body);
      const res = await postApi.createEvent(body);
    } catch (err) {
      console.log(err);
    }
  };
  const value = {
    createEvent,
  };
  return <postContext.Provider value={value}>{children}</postContext.Provider>;
}
