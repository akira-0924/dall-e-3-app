import { useState } from "react";
import axios from "axios";
import { ImageData, WordItem, WordObj } from "./type";
import { headers } from "../utils/utils";
import {
  FeatureLayout,
  CreateCard,
  GeneratedImage,
  List,
  Loading,
  WordList,
  Sum,
} from "../components/index";
import { Image } from "../components/atoms/Image";
import { WORDLIST } from "../data/word_sample";

// const url = "http://127.0.0.1:5000/api";
const url = process.env.REACT_APP_API_ENDPOINT;

const QuestionSample = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitModal, setIsSubmitModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploadCount, setUploadCount] = useState(0);
  const [selectedWordList, setSelectedWordList] = useState<string[]>([]);
  //設問ごとに使うJSONでS3から取得してきたデータを更新せずに使う
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [displayData, setDisplayData] = useState<WordObj>(WORDLIST.A);

  const ChangePropmt = (prompt: string) => setText(prompt);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    await fetchData();
    setIsLoading(false);
  };

  const openModal = (type: string) => {
    if (type === "button") {
      setIsSubmitModal(true);
    } else {
      setIsSubmitModal(false);
    }
  };

  const handleClick = (type: string, e: any) => {
    if (type === "button") {
      setSelectedWordList([]);
      return;
    }
    handleSubmit(e);
  };
  const addSelectWordList = (item: WordItem) => {
    item.count === 0 && setSelectedWordList([...selectedWordList, item.word]);
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
        <form>
          <FeatureLayout>
            <CreateCard
              title="お題"
              src=""
              questionNum={0}
              uploadCount={uploadCount}
              selectedWordList={selectedWordList}
              disabled={false}
              handleClick={handleClick}
              openSubmitModal={openModal}
              setText={(prompt) => {
                ChangePropmt(prompt);
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
              <div className="">
                {data?.length > 0 ? data[0].ssim : "0"}/100点
              </div>
            </div>
            <WordList
              list={displayData}
              addSelectWordList={addSelectWordList}
            />
          </FeatureLayout>
        </form>
        <List generateList={data} />
        <Sum data={data} />
      </div>
    </>
  );
};

export default QuestionSample;
