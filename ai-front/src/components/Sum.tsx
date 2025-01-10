import React, { useState, useEffect } from "react";
import { ImageData } from "../pages/type";
import { UPLOAD_COUNT, WORD } from "../utils/constant";

interface Porps {
  data: ImageData[];
}

const total = WORD.TOTAL_SCORE;

if (total !== null) {
  const match = total.match(/\d+/);
  if (match !== null) {
    const numStr = match[0];
    const num = parseInt(numStr, 10);
    const total = num * UPLOAD_COUNT;
  }
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
      合計点：<span className="text-red-500">{`${sum}/${total}点`}</span>
    </h1>
  );
};
