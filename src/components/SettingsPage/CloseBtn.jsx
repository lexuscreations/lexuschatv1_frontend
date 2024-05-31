import React from "react";

const CloseBtn = ({ onclick }) => {
  return (
    <button
      onClick={onclick}
      className="btn btn-circle min-w-8 min-h-8 h-8 w-8 brightness-95 hover:brightness-90 absolute top-4 right-4 shadow-lg bg-white dark:bg-slate-800 border-none text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-950"
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CloseBtn;
