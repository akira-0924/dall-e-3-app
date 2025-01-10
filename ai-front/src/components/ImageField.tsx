import React from "react";
import { ImageData } from "../pages/type";
import { Title } from "../components/atoms/Title";
import { Image } from "../components/atoms/Image";
import { GeneratedImage } from "../components/index";
import { WORD } from "../utils/constant";

interface Props {
  data: ImageData[];
}

export const ImageField = ({ data }: Props) => {
  return (
    <div className="sm:w-1/2 mb-10 px-4 text-white">
      <Title title={WORD.GENERATED_IMAGE__TITLE} />
      <div className="rounded-lg h-84 overflow-hidden">
        {data?.length > 0 && data[0].image ? (
          <GeneratedImage image_url={data[0].image} />
        ) : (
          <Image image_url="/generated_images/HTML.png" />
        )}
      </div>
      <div>{WORD.COMPARE}</div>
      <div>
        {data?.length > 0 ? data[0].ssim : "0"}/{WORD.TOTAL_SCORE}
      </div>
    </div>
  );
};
