// เก็บชื่อคีย์สำหรับ accessToken ที่จะถูกใช้ใน localStorage
const ACCESS_TOKEN = 'ACCESS_TOKEN';

// บันทึก token ลงใน localStorage โดยใช้คีย์ ACCESS_TOKEN
export const setAccessToken = (token) =>
  localStorage.setItem(ACCESS_TOKEN, token);

// ดึงค่า accessToken จาก localStorage
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

// ลบค่า accessToken ออกจาก localStorage
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);
