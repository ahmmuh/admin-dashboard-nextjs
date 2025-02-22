import Link from "next/link";
import React from "react";

function CustomLink({ url, title, className, deleteHandler }) {
  return (
    <div className="flex " onClick={deleteHandler}>
      <Link href={url} className={className}>
        {title}
      </Link>
    </div>
  );
}

export default CustomLink;
