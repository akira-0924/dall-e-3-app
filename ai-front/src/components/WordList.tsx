import React from "react";
import { Word, WordItem, WordObj } from "../pages/type";
import { WordChip, WordChipDisabled, WordContainer } from "../styled/style";
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
            <span key={index}>
              {item.count === 0 ? (
                <WordChip onClick={() => addSelectWordList(item)}>
                  {item.word}
                </WordChip>
              ) : (
                <WordChipDisabled onClick={() => addSelectWordList(item)}>
                  {item.word}
                </WordChipDisabled>
              )}
            </span>
          );
        })}
      </WordContainer>
      <SizeBox size={32} />
      <WordContainer>
        {list?.conjunction.map((item, index) => {
          return (
            <WordChip onClick={() => addSelectWordList(item)} key={index}>
              {item.word}
            </WordChip>
          );
        })}
      </WordContainer>
    </>
  );
};
