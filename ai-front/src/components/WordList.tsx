import React from "react";
import { Word, WordItem, WordObj } from "../pages/type";
import { WordChip, WordContainer } from "../styled/style";
import { SizeBox } from "./atoms/SizeBox";

interface Props {
  list: WordObj;
  addSelectWordList: (item: WordItem) => void;
}

export const WordList = ({ list, addSelectWordList }: Props): JSX.Element => {
  return (
    <>
      <WordContainer>
        {list?.noun.map((item, index) => {
          return (
            <WordChip
              bgColor={item.count === 0 ? "#ffffff" : "#dddddd"}
              onClick={() => addSelectWordList(item)}
              key={index}
            >
              {item.word}
            </WordChip>
          );
        })}
      </WordContainer>
      <SizeBox size={32} />
      <WordContainer>
        {list?.conjunction.map((item, index) => {
          return (
            <WordChip
              bgColor={item.count === 0 ? "#ffffff" : "#dddddd"}
              onClick={() => addSelectWordList(item)}
              key={index}
            >
              {item.word}
            </WordChip>
          );
        })}
      </WordContainer>
    </>
  );
};
