import { ROUTE_PATHS } from '@/routing/paths';
import {
  Database,
  GraduationCap,
  House,
  NotepadText,
  Trophy,
  User,
} from 'lucide-react';
import { type MenuConfig } from '../types';

export const ADMIN_MENU_SIDEBAR: MenuConfig = [
  {
    title: 'Trang Chủ',
    icon: House,
    path: ROUTE_PATHS.HOME,
  },
  {
    title: 'Quản Lý Nhân Sự',
    icon: User,
    path: ROUTE_PATHS.EMPLOYEE_MANAGEMENT,
  },
  {
    title: 'Quản Lý Đợt Thi',
    icon: Trophy,
    children: [
      { title: 'Kế Hoạch', path: ROUTE_PATHS.EXAM_PLAN },
      { title: 'Đăng Ký' },
      { title: 'Rà Soát' },
      { title: 'Phê Duyệt' },
      { title: 'Tổ Chức Thi' },
      { title: 'Kết Quả' },
      { title: 'Quyết Định' },
    ],
  },
  {
    title: 'Quản Lý Đề Tài',
    icon: NotepadText,
    children: [
      { title: 'Đăng Ký' },
      { title: 'Rà Soát' },
      { title: 'Phê Duyệt' },
    ],
  },
  {
    title: 'Đào Tạo',
    icon: GraduationCap,
    children: [{ title: 'Kết Quả Bồi Huấn' }],
  },
  {
    title: 'Hệ Thống',
    icon: Database,
    children: [
      { title: 'Người Dùng', path: ROUTE_PATHS.SYSTEM_USER_LIST },
      { title: 'Phòng Ban', path: ROUTE_PATHS.SYSTEM_DEPARTMENT_LIST },
      { title: 'Chức Vụ', path: ROUTE_PATHS.SYSTEM_POSITION_LIST },
    ],
  },
];
