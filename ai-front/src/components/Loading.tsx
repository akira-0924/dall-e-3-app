import React from "react";
import { LoadingOverlay, Spinner, LoadingText } from "../styled/style";
import { WORD } from "../utils/constant";

export const Loading = () => {
  return (
    <LoadingOverlay>
      <Spinner />
      <LoadingText>{WORD.LOADING}</LoadingText>
    </LoadingOverlay>
  );
};
