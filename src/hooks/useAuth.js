// hook ที่สามารถเข้าถึงค่าจาก Context ใน React
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// ช่วยให้การเข้าถึงข้อมูลและฟังก์ชันจาก AuthContext โดยไม่ต้อง import useContext และ AuthContext ซ้ำ
export default function useAuth() {
  return useContext(AuthContext);
}
