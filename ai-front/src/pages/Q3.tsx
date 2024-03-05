import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageProps, ImageData } from "./type";
import { headers } from "../utils/utils";
import { FeatureLayout, CreateCard, GeneratedImage } from "../components/index";
import { Image } from "../components/atoms/Image";

const url = "http://127.0.0.1:5000/api";

const Q3 = ({ num }: PageProps) => {
  const [text, setText] = useState("");
  const [data, setData] = useState<ImageData>({
    image: "",
    ssim: 0,
    prompt: "",
  });

  const ChangePropmt = (e: any) => {
    setText(e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const data = {
        post_text: text,
        base_image: `${process.env.REACT_APP_S3_ENDPOINT}/theme${num}.png`,
      };
      await axios
        .post(`${url}/generateImage`, data, {
          headers,
          timeout: 600000,
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(text);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <FeatureLayout>
          <CreateCard
            title="お題"
            src=""
            questionNum={1}
            disabled={false}
            setText={(e) => {
              ChangePropmt(e);
            }}
          />
          <div className="sm:w-1/2 mb-10 px-4 text-white">
            <div className="text-white text-4xl font-extrabold pb-4 text-left">
              生成画像
            </div>
            <div className="rounded-lg h-84 overflow-hidden">
              {data.image ? (
                <GeneratedImage image_url={data.image} />
              ) : (
                <Image image_url="/generated_images/HTML.png" />
              )}
            </div>
            <div className="">類似度</div>
            <div className="">{data.ssim}</div>
          </div>
        </FeatureLayout>
      </form>
    </div>
  );
};

export default Q3;
