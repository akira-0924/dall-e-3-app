import React from "react";
import { ButtonType } from "../../pages/type";
interface Props {
  color: string;
  text: string;
  type: ButtonType;
  uploadCount: number;
  handleClick: (type: string, e: any) => void;
}

const Button = ({ color, text, type, handleClick, uploadCount }: Props) => {
  return (
    <button
      className={`flex mx-auto mt-6 text-white bg-${color}-900 border-0 py-2 px-5 focus:outline-none hover:bg-${color}-700 rounded`}
      type={type}
      onClick={(e) => handleClick(type, e)}
      disabled={uploadCount === 3 ? true : false}
    >
      {text}
    </button>
  );
};

export default Button;
