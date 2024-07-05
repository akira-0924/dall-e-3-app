import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageProps, ImageData, WordItem, WordObj } from "./type";
import { headers } from "../utils/utils";
import {
  FeatureLayout,
  CreateCard,
  List,
  Loading,
  WordList,
  Modal,
  Sum,
  SubmitModal,
  ImageField,
} from "../components/index";
import { Image } from "../components/atoms/Image";
import { Title } from "../components/atoms/Title";
import { WORDLIST } from "../data/word";
import { useModal } from "../hooks/useModal";
import { useGetS3Object } from "../hooks/useGetS3Object";

const url = process.env.REACT_APP_API_ENDPOINT;

const QuestionPage = ({ num }: PageProps) => {
  const [text, setText] = useState("");
  const [data, setData] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitModal, setIsSubmitModal] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [selectedWordList, setSelectedWordList] = useState<string[]>([]);
  //JSONを更新してc S3にアップロードする
  const [json, setJson] = useState<WordObj>(WORDLIST.A);
  //設問ごとに使うJSONでS3から取得してきたデータを更新せずに使う
  const [displayData, setDisplayData] = useState<WordObj>(WORDLIST.A);

  const { isOpen, onClose, onApply, selectedTeam } = useModal();
  const { s3Data } = useGetS3Object(num, selectedTeam);

  useEffect(() => {
    setJson(s3Data);
    setDisplayData(s3Data);
  }, [s3Data]);

  const ChangePropmt = (prompt: string) => setText(prompt);

  const handleSubmit = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await fetchData();
    setUploadCount((prev) => prev + 1);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  useEffect(() => {
    if (uploadCount === 3) {
      uploadJson();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadCount]);

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

  const openModal = (type: string) => {
    if (type === "button") {
      setIsSubmitModal(true);
    } else {
      setIsSubmitModal(false);
    }
  };

  const addSelectWordList = (item: WordItem) => {
    const updateJson = json.noun.map((wordObj) => {
      if (item.word === wordObj.word) {
        return { ...wordObj, count: item.count + 1 };
      }
      return wordObj;
    });
    setJson({ ...json, noun: updateJson });
    item.count === 0 && setSelectedWordList([...selectedWordList, item.word]);
  };

  const uploadJson = async () => {
    const postData = {
      json: json,
      team: selectedTeam,
      filename: num + 1,
    };
    try {
      const response = await axios.post(`${url}/upload`, postData, {
        headers,
      });
      console.log("Upload successful:", response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
          const percent = response.data.ssim * 100;
          response.data.ssim = parseFloat(percent.toFixed(1));
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
        {isSubmitModal && <SubmitModal handleClick={handleClick} />}
        <form>
          <FeatureLayout>
            <CreateCard
              title="お題"
              src=""
              questionNum={num}
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

export default QuestionPage;
