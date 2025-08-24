// components/AdminFooter.jsx
export default function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 mt-auto">
      <div className="flex justify-between items-center text-sm">
        <span>© {new Date().getFullYear()} Admin Panel — All rights reserved</span>
        <span>Powered by MERN + Tailwind CSS</span>
      </div>
    </footer>
  );
}
