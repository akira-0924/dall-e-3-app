import React, { useEffect } from "react";
import Button from "./atoms/Button";
import { Title } from "./atoms/Title";
import { ButtonType } from "../pages/type";
import { WORD } from "../utils/constant";

interface Props {
  title: string;
  src: string;
  questionNum: number;
  disabled: boolean;
  setText: (e: any) => void;
  handleClick: (type: string, e: React.MouseEvent<HTMLInputElement>) => void;
  openSubmitModal: (type: string) => void;
  selectedWordList: string[];
  uploadCount: number;
}

export const CreateCard = ({
  title,
  questionNum,
  selectedWordList,
  handleClick,
  openSubmitModal,
  setText,
  uploadCount,
}: Props) => {
  let textValue = selectedWordList.join("");

  useEffect(() => {
    setText(textValue);
  }, [setText, textValue]);
  return (
    <div className="sm:w-1/2 mb-10 px-4">
      <Title title={title} />
      <div className="rounded-lg h-84 overflow-hidden">
        <img
          alt="content"
          height={500}
          className="object-cover object-center h-full w-full"
          src={`${process.env.REACT_APP_S3_ENDPOINT}/theme${questionNum}.png`}
        />
      </div>
      <p className="mt-6 text-left text-white">{WORD.HEAD}</p>
      <textarea
        className="w-full leading-relaxed text-base p-4 mt-4"
        value={textValue}
        readOnly
      ></textarea>
      <Button
        text={WORD.GENERATE_BTN}
        colorType="generate"
        uploadCount={uploadCount}
        type={ButtonType.Button}
        handleClick={handleClick}
        openSubmitModal={openSubmitModal}
      />
      <Button
        text={WORD.DELETE_BTN}
        colorType="delete"
        uploadCount={uploadCount}
        type={ButtonType.Reset}
        handleClick={handleClick}
        openSubmitModal={openSubmitModal}
      />
    </div>
  );
};
