import React from "react";
import {
  SubmitModalContainer,
  SubmitModalWindow,
  ModalContent,
} from "../styled/style";
import { WORD } from "../utils/constant";

interface Props {
  handleClick: (type: string, e: any) => void;
}

export const SubmitModal = ({ handleClick }: Props) => {
  return (
    <SubmitModalContainer>
      <SubmitModalWindow>
        <ModalContent>{WORD.CONFIRM}</ModalContent>
        <div className="flex justify-center">
          <button
            className={`flex mx-auto mt-6 text-white bg-gray-600 border-0 py-2 px-5 focus:outline-none hover:bg-gray-500 rounded`}
            type="button"
            onClick={(e) => handleClick("button", e)}
          >
            {WORD.CLOSE_BTN}
          </button>
          <button
            className={`flex mx-auto mt-6 text-white bg-green-600 border-0 py-2 px-5 focus:outline-none hover:bg-green-500 rounded`}
            type="submit"
            onClick={(e) => handleClick("submit", e)}
          >
            {WORD.GENERATE_BTN}
          </button>
        </div>
      </SubmitModalWindow>
    </SubmitModalContainer>
  );
};
