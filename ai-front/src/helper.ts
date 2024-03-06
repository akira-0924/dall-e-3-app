// process.env.AWS_SDK_LOAD_CONFIG = true;
import { S3 } from "aws-sdk";

// 使用するprofileを指定する
process.env.AWS_PROFILE = "cdk";

const AWS = require("aws-sdk");
const ssm = new AWS.SSM();

export const getParamsFromSSM = (key: string) => {
  const params = {
    Name: key,
    WithDecryption: true,
  };
  ssm.getParameter(params, (err: any, data: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

const s3 = new S3({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_REGION,
});

export const uploadJson = (json: any, next: number, team: string) => {
  const fileName = `q${next}.json`;
  const params = {
    Bucket: process.env.REACT_APP_S3_JSON_ENDPOINT
      ? `${process.env.REACT_APP_S3_JSON_ENDPOINT}/team${team}`
      : "",
    Key: fileName,
    ContentType: "application/json",
    Body: JSON.stringify(json),
  };
  s3.upload(params, (err: any, data: any) => {
    if (err) {
      console.error(err);
      // setLoading(false);
      return;
    }

    console.log("File uploaded successfully:", data.Location);
    // setLoading(false);
  });
};
