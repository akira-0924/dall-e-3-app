import React from "react";
import Button from "./atoms/Button";

interface Props {
  title: string;
  src: string;
  questionNum: number;
  disabled: boolean;
  setText: (e: any) => void;
}

export const CreateCard = ({
  title,
  src,
  disabled,
  questionNum,
  setText,
}: Props) => {
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
        onChange={setText}
      ></textarea>
      <Button />
    </div>
  );
};
