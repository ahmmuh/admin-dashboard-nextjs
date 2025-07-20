import { FiLoader } from "react-icons/fi";

export default function LoadingPage({ message = "Laddar..." }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <FiLoader className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-gray-700 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
