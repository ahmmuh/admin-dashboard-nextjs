function MainCard({ title, children }) {
  return (
    <div className="flex flex-col w-full p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="text-2xl font-bold text-purple-600 mb-4 tracking-tight">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

export default MainCard;
