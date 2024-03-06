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
  Modal,
} from "../components/index";
import { Image } from "../components/atoms/Image";
import { WORDLIST } from "../data/word";
import { useModal } from "../hooks/useModal";

const url = "http://127.0.0.1:5000/api";

const Q1 = ({ num }: PageProps) => {
  const test = JSON.stringify(WORDLIST);
  const tes1 = JSON.parse(test);

  const [text, setText] = useState("");
  const [data, setData] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWordList, setSelectedWordList] = useState<string[]>([]);

  const { isOpen, onClose, onApply, selectedTeam } = useModal();

  const ChangePropmt = (prompt: string) => setText(prompt);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    await fetchData();
    setIsLoading(false);
  };

  const handleClick = (type: string, e: any) => {
    if (type === "button") {
      setSelectedWordList([]);
      return;
    }
    handleSubmit(e);
  };
  const addSelectWordList = (word: string) => {
    setSelectedWordList([...selectedWordList, word]);
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
        {isOpen && <Modal onClose={onClose} onApply={onApply} />}
        <form>
          <FeatureLayout>
            <CreateCard
              title="お題"
              src=""
              questionNum={1}
              selectedWordList={selectedWordList}
              disabled={false}
              handleClick={handleClick}
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
              <div className="">{data?.length > 0 ? data[0].ssim : "0"}</div>
            </div>
            <WordList
              list={WORDLIST}
              team={selectedTeam}
              addSelectWordList={addSelectWordList}
            />
          </FeatureLayout>
        </form>
        <List generateList={data} />
      </div>
    </>
  );
};

export default Q1;
