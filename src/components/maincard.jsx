import { HiOutlinePencil } from "react-icons/hi";

function MainCard({ title, icon, link, children }) {
  return (
    <div className="flex flex-col w-full p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className=" flex flex-row items-center text-2xl font-bold text-purple-600 mb-4 tracking-tight">
        <span>{title && title}</span>
        <span className="ml-6">
          {icon && icon} {link && link}
        </span>
      </h2>
      <div>{children}</div>
    </div>
  );
}

export default MainCard;
