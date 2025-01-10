import React from "react";
interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return (
    <div className="text-white text-4xl font-extrabold pb-4 text-left">
      {title}
    </div>
  );
};
