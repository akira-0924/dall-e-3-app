import React from "react";
import { ImageData } from "../pages/type";
import { Image } from "./atoms/Image";

interface Props {
  generateList: ImageData[];
}

export const List = ({ generateList }: Props) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto">
        <h1 className="text-white text-left mb-4 px-5 py-4 text-3xl font-bold">
          履歴
        </h1>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          {generateList?.map((item, index) => {
            return (
              <div className="p-4 md:w-1/3 sm:mb-0 mb-6" key={index}>
                <div className="rounded-lg h-auto overflow-hidden">
                  <Image image_url={item.image} />
                </div>
                <h2 className="text-xl font-medium title-font text-white mt-5">
                  類似度：{item.ssim}
                </h2>
                <textarea
                  cols={30}
                  rows={4}
                  value={item.prompt}
                  readOnly
                  className="text-white w-full rounded-lg p-4 mt-2"
                  style={{ background: "rgba(45, 45, 45, 0.5)" }}
                ></textarea>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
