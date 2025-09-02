"use client";

import LoadingPage from "@/app/loading";
import { checkinKey, getAllKeys } from "@/backend/keyAPI";
import KeySearch from "@/components/keys/keySearch";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiPlus } from "react-icons/hi";

function KeyPage() {
  const [error, setError] = useState(null);
  const [keys, setKeys] = useState([]);
  const router = useRouter();
  const { currentUser, loading } = useFetchCurrentUser();
  const [qrVisible, setQrVisible] = useState({});
  const [keyLoading, setKeyLoading] = useState(true);

  const checkInHandler = async (key) => {
    const userId = key.lastBorrowedBy;
    try {
      await checkinKey(userId, key._id);
      await fetchKeys();
      toast.success("Nyckeln har återlämnats");
    } catch (error) {
      console.error("Error", error);
      toast.error("Något har gått fel");
    }
  };

  const fetchKeys = async () => {
    try {
      const keyList = await getAllKeys();
      setKeys(keyList);
      setKeyLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av nycklar", error.message);
      setError(error);
      setKeyLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const toggleQRCode = (keyId) => {
    setQrVisible((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  if (loading || keyLoading) {
    return <LoadingPage message="Hämtar alla nycklar..." />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-red-600 p-10">
        <h4 className="text-2xl text-white-500">Error</h4>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <div className="p-2">
        {keys.length > 0 && (
          <h3 className="font-bold text-2xl text-purple-500 italic mb-6">
            Nyckel hantering
          </h3>
        )}{" "}
        {!currentUser.role?.includes("Enhetschef") && (
          <Link
            className="text-green-800  flex items-center gap-3 mb-4"
            href={"/dashboard/key_QRcode"}>
            <HiPlus />
            <span>Lägg till nyckel</span>
          </Link>
        )}
      </div>

      <div className="pr-10">
        <div className="hidden md:block">
          <KeySearch />
        </div>

        {keyLoading || loading ? (
          <LoadingPage message="Hämtar användare och nycklar..." />
        ) : keys.length === 0 ? (
          <div className="text-center text-red-500 p-4">
            Det finns inga nycklar att visa just nu.
          </div>
        ) : (
          <table className="border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-200 text-left">
                  Nyckelbeteckning
                </th>
                <th className="border border-gray-200 text-left">Plats</th>
                <th className="border border-gray-200 text-left">Status</th>
                <th className="border border-gray-200 text-left">Lånetagare</th>
                <th className="border border-gray-200 text-left">
                  Utlånat datum
                </th>
                <th className="border border-gray-200 text-left">
                  Inlämnat datum
                </th>

                {!currentUser.role?.includes("Enhetschef") && (
                  <th className="border border-gray-200 text-left">Åtgärd</th>
                )}
              </tr>
            </thead>
            <tbody>
              {keys &&
                keys?.map((key) => (
                  <tr key={key._id} className="hover:bg-gray-300">
                    <td className="border border-gray-200 text-blue-400 font-bold">
                      🔑{" "}
                      <Link href={`/dashboard/keys/${key._id}`}>
                        {key.keyLabel.toUpperCase()}
                      </Link>
                      {key.qrCode && (
                        <>
                          <button
                            onClick={() => toggleQRCode(key._id)}
                            className="block"
                            style={{ fontSize: ".6rem" }}>
                            <span className="text-center pl-7">
                              {qrVisible[key._id]
                                ? "Göm QR kod"
                                : "Visa QR kod"}
                            </span>
                          </button>
                          {qrVisible[key._id] && (
                            <div style={{ paddingLeft: 20 }}>
                              <Image
                                width={150}
                                height={200}
                                src={key.qrCode}
                                alt="QrCode image"
                              />
                              <a
                                href={key.qrCode}
                                download="qrcode.png"
                                style={{ fontSize: ".7rem" }}>
                                <button style={{ marginTop: 10 }}>
                                  Ladda ner QR kod
                                </button>
                              </a>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {key.location}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {key.status === "available" && (
                        <span className="text-green-700 font-bold">Inne</span>
                      )}
                      {key.status === "returned" && (
                        <span className="text-green-700 font-bold">
                          Återlämnad
                        </span>
                      )}
                      {key.status === "checked-out" && (
                        <span className="text-red-700 font-bold">Utlånad</span>
                      )}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {key.status === "checked-out"
                        ? key.borrowedBy?.name
                        : "—"}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {key.status === "checked-out" && key.borrowedAt
                        ? new Date(key.borrowedAt).toLocaleString("sv-SE")
                        : "—"}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {key.status === "returned" && key.returnedAt
                        ? new Date(key.returnedAt).toLocaleString("sv-SE")
                        : "—"}
                    </td>

                    {!currentUser.role?.includes("Enhetschef") && (
                      <td className="font-bold p-2">
                        {["available", "returned"].includes(key.status) && (
                          <span className="text-green-500">
                            <Link href={`/dashboard/keys/${key._id}/borrow`}>
                              Låna
                            </Link>
                          </span>
                        )}
                        {key.status === "checked-out" && (
                          <span className="text-red-500">
                            <Link href={`/dashboard/keys/${key._id}/borrow`}>
                              Lämna in
                            </Link>
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default KeyPage;
