import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="flex items-center justify-center absolute inset-0 bg-gray-100/50 flex-1 w-full h-full">
      {children}
    </div>
  );
};

export default Modal;
