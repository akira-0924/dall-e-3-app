import React from "react";
import { LoadingOverlay, Spinner, LoadingText } from "../styled/style";

export const Loading = () => {
  return (
    <LoadingOverlay>
      <Spinner />
      <LoadingText>画像生成中...</LoadingText>
    </LoadingOverlay>
  );
};
