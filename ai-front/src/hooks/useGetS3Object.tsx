import React, { useState, useEffect } from "react";
import axios from "axios";
import { Word } from "../pages/type";

export const useGetS3Object = () => {
  const [s3Data, setS3Data] = useState<Word>({});

  const getJsonData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_S3_JSON_ENDPOINT}/word.json`
    );
    const strObj = JSON.stringify(res.data);
    setS3Data(JSON.parse(strObj));
  };

  useEffect(() => {
    getJsonData();
  }, []);

  return { s3Data };
};
