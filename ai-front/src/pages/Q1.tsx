import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageProps, ImageData } from "./type";
import { headers } from "../utils/utils";
import {
  FeatureLayout,
  CreateCard,
  GeneratedImage,
  List,
  Loading,
  WordList,
} from "../components/index";
import { Image } from "../components/atoms/Image";
import { WORDLIST } from "../data/word";
import { WordContainer } from "../styled/style";

const url = "http://127.0.0.1:5000/api";

const Q1 = ({ num }: PageProps) => {
  const test = JSON.stringify(WORDLIST);
  const tes1 = JSON.parse(test);

  const [text, setText] = useState("");
  const [data, setData] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ChangePropmt = (e: any) => {
    setText(e.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    await fetchData();
    setIsLoading(false);
  };

  const fetchData = async () => {
    try {
      const postData = {
        post_text: text,
        base_image: `${process.env.REACT_APP_S3_ENDPOINT}/theme${num}.png`,
      };
      await axios
        .post(`${url}/generateImage`, postData, {
          headers,
          timeout: 600000,
        })
        .then((response) => {
          console.log(response.data);
          setData([response.data, ...data]);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
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
                {data?.length > 0 && data[0].image ? (
                  <GeneratedImage image_url={data[0].image} />
                ) : (
                  <Image image_url="/generated_images/HTML.png" />
                )}
              </div>
              <div className="">類似度</div>
              <div className="">{data?.length > 0 && data[0].ssim}</div>
            </div>
            {/* <WordContainer> */}
            <WordList list={WORDLIST} team="A" />
            {/* </WordContainer> */}
          </FeatureLayout>
        </form>
        <List generateList={data} />
      </div>
    </>
  );
};

export default Q1;
