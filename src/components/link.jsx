import Link from "next/link";
import React from "react";

function CustomLink({ url, title, className, ...props }) {
  return (
    <div {...props} className="flex ">
      <Link href={url} className={className}>
        {title}
      </Link>
    </div>
  );
}

export default CustomLink;
