// components/icons.js
import { 
  Scan, 
  QrCode, 
  Home, 
  Search, 
  User, 
  LogIn, 
  LogOut, 
  Plus, 
  Menu, 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  ChevronDown, 
  UserPlus,         // 👈 add
  LayoutDashboard   // 👈 add
} from "lucide-react";

export const Icons = {
  logo: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      {/* Your logo SVG path */}
    </svg>
  ),
  menu: Menu,
  close: X,
  login: LogIn,
  logout: LogOut,
  register: UserPlus,
  dashboard: LayoutDashboard,
  add: Plus,
  lostItem: ShieldAlert,
  foundItem: ShieldCheck,
  qrCode: QrCode,
  scan: Scan,
  home: Home,
  search: Search,
  chevronDown: ChevronDown,
};
