// import { Link } from "react-router-dom";
// import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
// import { useAuth } from "../../../context/AuthContext";
import AdminProfile from "../pages/AdminProfile";
// import { useState } from "react";

// export default function AdminNavbar() {
//   const { role } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gray-900 text-white shadow-md">
//       <div className="flex justify-between items-center px-6 py-3">
//         {/* Left - Logo */}
//         <div className="flex items-center gap-3">
//           <span className="text-lg font-bold">Admin Panel</span>
//           <span className="text-sm text-gray-400">({role})</span>
//         </div>

//         {/* Hamburger Icon for Mobile */}
//         <button
//           className="md:hidden text-white text-2xl"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <FiX /> : <FiMenu />}
//         </button>

//         {/* Middle - Links (Desktop) */}
//         <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
//           <li><Link to="/admin" className="hover:text-orange-400">Dashboard</Link></li>
//           <li><Link to="/admin/users" className="hover:text-orange-400">Manage Users</Link></li>
//           <li><Link to="/admin/products" className="hover:text-orange-400">Manage Products</Link></li>
//           <li><Link to="/admin/orders" className="hover:text-orange-400">Orders</Link></li>
//           <li><AdminProfile /></li>
//         </ul>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden px-6 pb-4">
//           <ul className="flex flex-col gap-4 text-sm font-medium">
//             <li><Link to="/admin" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
//             <li><Link to="/admin/users" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>Manage Users</Link></li>
//             <li><Link to="/admin/products" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>Manage Products</Link></li>
//             <li><Link to="/admin/orders" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>Orders</Link></li>
//             <li><AdminProfile /></li>
            
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }


export default function AdminNavbar() {

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="relative" >
        <AdminProfile />
      </div>
    </header>
  );
}

