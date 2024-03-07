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
  console.log(uploadCount);
  return (
    <>
      {colorType === "generate" ? (
        <button
          className={`flex mx-auto mt-6 text-white bg-green-600 border-0 py-2 px-5 focus:outline-none hover:bg-green-500 rounded`}
          type={type}
          onClick={(e) => handleClick(type, e)}
          disabled={uploadCount === 3 ? true : false}
        >
          {text}
        </button>
      ) : (
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
