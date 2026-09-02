import React from "react";

const Button = ({name}) => {
  return (
    <div className="mt-6">
      <button
        className="w-full text-center bg-pink-700 text-white font-bold py-2 cursor-pointer active:scale-90 transition-all duration-150 ease-in rounded-3xl text-2xl"
        type="submit"
      >
       {name}
      </button>
    </div>
  );
};

export default Button;
