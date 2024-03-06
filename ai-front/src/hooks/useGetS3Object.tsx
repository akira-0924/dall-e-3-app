import React, { useState, useEffect } from "react";
import axios from "axios";
import { WordObj } from "../pages/type";
import { WORDLIST } from "../data/word";

export const useGetS3Object = (questionNum: number, team: string) => {
  const [s3Data, setS3Data] = useState<WordObj>(WORDLIST.A);

  console.log(questionNum);
  // console.log(team);
  const getJsonData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_S3_JSON_ENDPOINT}/team${team}/q${questionNum}.json`
    );
    const strObj = JSON.stringify(res.data);
    setS3Data(JSON.parse(strObj));
  };

  useEffect(() => {
    getJsonData();
  }, []);

  return { s3Data };
};
