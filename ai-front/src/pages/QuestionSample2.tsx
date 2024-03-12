import { useState } from "react";
import axios from "axios";
import { ImageData } from "./type";
import { headers } from "../utils/utils";
import {
  FeatureLayout,
  GeneratedImage,
  List,
  Loading,
  Sum,
} from "../components/index";
import { Image } from "../components/atoms/Image";

// const url = "http://127.0.0.1:5000/api";
const url = process.env.REACT_APP_API_ENDPOINT;

const QuestionSample2 = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
        base_image: `${process.env.REACT_APP_S3_ENDPOINT}/theme0.png`,
      };
      await axios
        .post(`${url}/generateImage`, postData, {
          headers,
          timeout: 600000,
        })
        .then((response) => {
          response.data.ssim = Math.round(response.data.ssim * 100);
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
        <form>
          <FeatureLayout>
            <div className="sm:w-1/2 mb-10 px-4">
              <div className="text-white text-4xl font-extrabold pb-4 text-left">
                お題
              </div>
              <div className="rounded-lg h-84 overflow-hidden">
                <img
                  alt="content"
                  height={500}
                  className="object-cover object-center h-full w-full"
                  src={`${process.env.REACT_APP_S3_ENDPOINT}/theme0.png`}
                />
              </div>
              <p className="mt-6 text-left text-white">プロンプト</p>
              <textarea
                onChange={(e) => setText(e.target.value)}
                className="w-full leading-relaxed text-base p-4 mt-4"
              >
                {text}
              </textarea>
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                生成する
              </button>
            </div>
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
              <div className="">
                {data?.length > 0 ? data[0].ssim : "0"}/100点
              </div>
            </div>
          </FeatureLayout>
        </form>
        <List generateList={data} />
        <Sum data={data} />
      </div>
    </>
  );
};

export default QuestionSample2;
