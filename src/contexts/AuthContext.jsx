import { useEffect, useState, createContext } from 'react';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '../utils/local-storage';
import authApi from '../apis/auth';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  // เก็บข้อมูล user ที่ผ่านการยืนยันตัวตน
  const [authUser, setAuthUser] = useState(null);
  // แสดงสถานะการโหลดข้อมูล user
  const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // ถ้ามี access token ใน local storage จะเรียก API authApi.getAuthUser เพื่อดึงข้อมูล user
      if (getAccessToken()) {
        const res = await authApi.getAuthUser();
        setAuthUser(res.data.user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // เมื่อดึงข้อมูลเสร็จสิ้นให้ตั้งค่า isAuthUserLoading เป็น false
      setIsAuthUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials) => {
    // เรียก API เพื่อทำการเข้าสู่ระบบ
    const res = await authApi.login(credentials);
    // บันทึก access token ลงใน local storage
    setAccessToken(res.data.accessToken);
    const resGetAuthUser = await authApi.getAuthUser();
    setAuthUser(resGetAuthUser.data.user);
  };

  const logout = () => {
    // ลบ access token จาก local storage
    removeAccessToken();
    // ตั้งค่า authUser เป็น null เพื่อให้ผู้ใช้หลุดจากระบบ
    setAuthUser(null);
  };
  return (
    // AuthContext.Provider ถูกใช้เพื่อส่งผ่านข้อมูลไปยัง component ลูกทั้งหมดที่อยู่ภายใต้ Provider
    <AuthContext.Provider
      value={{ login, logout, authUser, isAuthUserLoading, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
