import React from "react";
import { ImageData } from "../pages/type";
import { Image } from "./atoms/Image";

interface Props {
  generateList: ImageData[];
}

export const List = ({ generateList }: Props) => {
  console.log(generateList.length);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          {generateList?.map((item, index) => {
            return (
              <div className="p-4 md:w-1/3 sm:mb-0 mb-6" key={index}>
                <div className="rounded-lg h-64 overflow-hidden">
                  <Image image_url={item.image} />
                </div>
                <h2 className="text-xl font-medium title-font text-white mt-5">
                  {item.ssim}
                </h2>
                <p className="text-base text-white leading-relaxed mt-2">
                  {item.prompt}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
