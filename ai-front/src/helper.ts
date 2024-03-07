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
