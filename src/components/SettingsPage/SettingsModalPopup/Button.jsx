import React from "react";

const Button = ({ label, onclick }) => (
  <button
    onClick={onclick}
    className="cursor-pointer select-none bg-slate-300 font-semibold px-2 rounded text-lg hover:bg-slate-400 transition-all active:scale-95"
  >
    {label}
  </button>
);

export default Button;
