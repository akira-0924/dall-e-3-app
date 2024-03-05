import React from "react";

interface Props {
  size: number;
}

export const SizeBox = ({ size }: Props) => {
  return <div style={{ height: size, width: "100%" }}></div>;
};
