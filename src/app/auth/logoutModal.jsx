import React from "react";

function LogoutModal({ user, children }) {
  return (
    <div className="flex gap-2">
      {user && <span>{user}</span>}
      {children}
    </div>
  );
}

export default LogoutModal;
