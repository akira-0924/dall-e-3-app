import React, { useEffect } from "react";
import Button from "./atoms/Button";
import { ButtonType } from "../pages/type";

interface Props {
  title: string;
  src: string;
  questionNum: number;
  disabled: boolean;
  setText: (e: any) => void;
  handleClick: (type: string, e: any) => void;
  selectedWordList: string[];
}

export const CreateCard = ({
  title,
  src,
  disabled,
  questionNum,
  selectedWordList,
  handleClick,
  setText,
}: Props) => {
  let textValue = selectedWordList.join("");

  useEffect(() => {
    setText(textValue);
  }, [textValue]);
  return (
    <div className="sm:w-1/2 mb-10 px-4">
      <div className="text-white text-4xl font-extrabold pb-4 text-left">
        {title}
      </div>
      <div className="rounded-lg h-84 overflow-hidden">
        <img
          alt="content"
          height={500}
          className="object-cover object-center h-full w-full"
          src={`${process.env.REACT_APP_S3_ENDPOINT}/theme${questionNum}.png`}
        />
      </div>
      <p className="mt-6 text-left text-white">プロンプト</p>
      <textarea
        className="w-full leading-relaxed text-base p-4 mt-4"
        value={textValue}
        readOnly
      ></textarea>
      <Button
        text="生成する"
        color="red"
        type={ButtonType.Submit}
        handleClick={handleClick}
      />
      <Button
        text="プロンプトを削除する"
        color="green"
        type={ButtonType.Button}
        handleClick={handleClick}
      />
    </div>
  );
};
