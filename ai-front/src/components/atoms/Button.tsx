import React from "react";
import { ButtonType } from "../../pages/type";
interface Props {
  colorType: string;
  text: string;
  type: ButtonType;
  uploadCount: number;
  handleClick: (type: string, e: any) => void;
}

const Button = ({ colorType, text, type, handleClick, uploadCount }: Props) => {
  return (
    <>
      {colorType === "generate" && uploadCount !== 3 && (
        <button
          className={`flex mx-auto mt-6 text-white bg-green-600 border-0 py-2 px-5 focus:outline-none hover:bg-green-500 rounded`}
          type={type}
          onClick={(e) => handleClick(type, e)}
        >
          {text}
        </button>
      )}
      {colorType === "generate" && uploadCount === 3 && (
        <button
          className={`flex mx-auto mt-6 text-white bg-gray-600 border-0 py-2 px-5 focus:outline-non rounded`}
          type={type}
          disabled
        >
          {text}
        </button>
      )}
      {colorType === "delete" && (
        <button
          className={`flex mx-auto mt-6 text-white bg-red-900 border-0 py-2 px-5 focus:outline-none hover:bg-red-700 rounded`}
          type={type}
          onClick={(e) => handleClick(type, e)}
          disabled={uploadCount === 3 ? true : false}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
