import { useState } from "react";
import axios from "axios";
import { ImageData, WordItem, WordObj } from "./type";
import { headers } from "../utils/utils";
import {
  FeatureLayout,
  CreateCard,
  List,
  Loading,
  WordList,
  Sum,
  SubmitModal,
  ImageField,
} from "../components/index";
import { Image } from "../components/atoms/Image";
import { Title } from "../components/atoms/Title";
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

  const handleSubmit = async (event: React.MouseEvent<HTMLInputElement>) => {
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

  const handleClick = (type: string, e: React.MouseEvent<HTMLInputElement>) => {
    if (type === "button") {
      setIsSubmitModal(false);
      return;
    } else if (type === "reset") {
      setSelectedWordList([]);
      return;
    }
    handleSubmit(e);
    setIsSubmitModal(false);
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
      {isSubmitModal && <SubmitModal handleClick={handleClick} />}
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
            <ImageField data={data} />
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
