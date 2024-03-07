import React, { useState, useEffect } from "react";
import { ImageData } from "../pages/type";

interface Porps {
  data: ImageData[];
}

export const Sum = ({ data }: Porps) => {
  let ssim_sum = 0;
  const [sum, setSum] = useState(ssim_sum);

  useEffect(() => {
    data.forEach((item) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ssim_sum = ssim_sum + item.ssim;
    });
    setSum(ssim_sum);
  }, [data]);

  return (
    <h1 className="text-white text-3xl font-bold mb-24 mt-16">
      合計点：<span className="text-red-500">{sum}</span>
    </h1>
  );
};
