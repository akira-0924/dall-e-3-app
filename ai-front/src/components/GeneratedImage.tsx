import React from "react";

interface Props {
  image_url: string;
}

export const GeneratedImage = ({ image_url }: Props) => {
  return (
    <img
      alt="content"
      height={500}
      className="object-cover object-center h-full w-full"
      src={image_url}
    />
  );
};
