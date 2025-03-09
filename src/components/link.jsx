import Link from "next/link";
import React from "react";

function CustomLink({ url, title, icon, className, deleteHandler }) {
  return (
    <div className="flex " onClick={deleteHandler}>
      <Link href={url} className={className} icon={icon}>
        {title}
      </Link>
    </div>
  );
}

export default CustomLink;
