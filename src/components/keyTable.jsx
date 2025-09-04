// import React from "react";

// const KeyTable = ({ keyData, onClick, actionLabel, btnColor, bgColor }) => {
//   return (
//     <div className="p-3">
//       <table className="border border-gray-400 w-full ">
//         <thead className="bg-gray-400">
//           <tr>
//             <th className="border border-gray-200 text-left p-2">
//               Nyckelbeteckning
//             </th>
//             <th className="border border-gray-200 text-left p-2">Plats</th>
//             <th className="border border-gray-200 text-left p-2">Status</th>
//             <th className="border border-gray-200 text-left p-2">Datum </th>
//             <th className="border border-gray-200 text-left p-2">Åtgärd</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="hover:bg-gray-100">
//             <td className="border border-gray-200 p-2">{keyData.keyLabel}</td>
//             <td className="border border-gray-200 p-2">{keyData.location}</td>
//             <td className="border border-gray-200 p-2">
//               {keyData.status === "checked-out" ? (
//                 <span className="text-red-500 font-bold">Utlånad</span>
//               ) : (
//                 <span className="text-green-600 font-bold">Inne</span>
//               )}
//             </td>
//             <td className="border border-gray-200 p-2">
//               {keyData.borrowedAt
//                 ? new Date(keyData.borrowedAt).toLocaleString("sv-SE")
//                 : keyData.returnedAt
//                 ? new Date(keyData.returnedAt).toLocaleString("sv-SE")
//                 : "Inget datum"}
//             </td>
//             <td className="border border-gray-200 p-2">
//               <button
//                 onClick={onClick}
//                 className={`w-full py-2 px-4 text-white rounded ${btnColor} ${bgColor}`}>
//                 {actionLabel}
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default KeyTable;

import React from "react";

const KeyTable = ({ keyData, onClick, actionLabel, btnColor, bgColor }) => {
  return (
    <div className="p-3">
      <table className="border border-gray-400 w-full ">
        <thead className="bg-gray-400">
          <tr>
            <th className="border border-gray-200 text-left p-2">
              Nyckelbeteckning
            </th>
            <th className="border border-gray-200 text-left p-2">Enhet</th>
            <th className="border border-gray-200 text-left p-2">Status</th>
            <th className="border border-gray-200 text-left p-2">Datum </th>
            <th className="border border-gray-200 text-left p-2">Åtgärd</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-200 p-2">{keyData.keyLabel}</td>
            <td className="border border-gray-200 p-2">{keyData.unit}</td>
            <td className="border border-gray-200 p-2">
              {keyData.status === "checked-out" ? (
                <span className="text-red-500 font-bold">Utlånad</span>
              ) : (
                <span className="text-green-600 font-bold">Inne</span>
              )}
            </td>
            <td className="border border-gray-200 p-2">
              {keyData.borrowedAt
                ? new Date(keyData.borrowedAt).toLocaleString("sv-SE")
                : keyData.returnedAt
                ? new Date(keyData.returnedAt).toLocaleString("sv-SE")
                : "Inget datum"}
            </td>
            <td className="border border-gray-200 p-2">
              <button
                onClick={onClick}
                className={`w-full py-2 px-4 text-white rounded ${btnColor} ${bgColor}`}>
                {actionLabel}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default KeyTable;
