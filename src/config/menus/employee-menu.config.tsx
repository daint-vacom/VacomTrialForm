import { ROUTE_PATHS } from '@/routing/paths';
import { GraduationCap, House, NotepadText, Trophy, User } from 'lucide-react';
import { type MenuConfig } from '../types';

export const EMPLOYEE_MENU_SIDEBAR: MenuConfig = [
  {
    title: 'Trang Chủ',
    icon: House,
    path: ROUTE_PATHS.HOME,
  },
  {
    title: 'Quản Lý Nhân Sự',
    icon: User,
  },
  {
    title: 'Quản Lý Đợt Thi',
    icon: Trophy,
    children: [
      { title: 'Đăng Ký' },
      { title: 'Tổ Chức Thi' },
      { title: 'Kết Quả' },
      { title: 'Quyết Định' },
    ],
  },
  {
    title: 'Quản Lý Đề Tài',
    icon: NotepadText,
    children: [{ title: 'Đăng Ký' }],
  },
  {
    title: 'Đào Tạo',
    icon: GraduationCap,
    children: [{ title: 'Kết Quả Bồi Huấn' }],
  },
];
