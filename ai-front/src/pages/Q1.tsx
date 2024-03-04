import React, { useState, useEffect } from "react";
import axios from "axios";
import FeatureLayout from "../components/FeatureLayout";
import CreateCard from "../components/CreateCard";

interface ImageDta {
  image: string;
  ssim: number;
}

const url = "http://127.0.0.1:5000/api";
const headers = {
  "Content-type": "application/json",
  Accept: "application/json",
};

const Q1 = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState<ImageDta>({
    image: "",
    ssim: 0,
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
        base_image: `${process.env.REACT_APP_S3_ENDPOINT}/theme1.png`,
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
      <h1 className="text-white text-4xl font-extrabold pt-12">
        MAD-Day用画像生成アプリ
      </h1>

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
              <img
                alt="content"
                height={500}
                className="object-cover object-center h-full w-full"
                src="/generated_images/dora.png"
              />
            </div>
            <div className="">類似度</div>
            <div className="">{data.ssim}</div>
          </div>
        </FeatureLayout>
      </form>
    </div>
  );
};

export default Q1;
