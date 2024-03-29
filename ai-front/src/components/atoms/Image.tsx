import React from "react";

interface Props {
  image_url: string;
}

export const Image = ({ image_url }: Props) => {
  return (
    <img
      alt="content"
      className="object-cover object-center h-full w-full"
      src={image_url}
    />
  );
};
