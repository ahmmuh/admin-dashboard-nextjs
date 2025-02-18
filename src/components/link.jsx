import Link from "next/link";
import React from "react";

function LinkPage({ url, title }) {
  return (
    <div>
      <Link
        href={url}
        className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition duration-200">
        {title}
      </Link>
    </div>
  );
}

export default LinkPage;
