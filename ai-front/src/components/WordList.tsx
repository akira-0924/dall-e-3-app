import React from "react";
import { Word } from "../pages/type";
import { WordChip, WordContainer } from "../styled/style";
import { SizeBox } from "./atoms/SizeBox";

interface Props {
  list: Word;
  team: string;
  addSelectWordList: (word: string) => void;
}

export const WordList = ({
  list,
  team,
  addSelectWordList,
}: Props): JSX.Element => {
  let displayList;
  if (team === "A") {
    displayList = list.A;
  } else if (team === "B") {
    displayList = list.B;
  } else if (team === "C") {
    displayList = list.C;
  }
  return (
    <>
      <WordContainer>
        {displayList?.noun.map((item, index) => {
          return (
            <WordChip onClick={() => addSelectWordList(item.word)} key={index}>
              {item.word}
            </WordChip>
          );
        })}
      </WordContainer>
      <SizeBox size={32} />
      <WordContainer>
        {displayList?.conjunction.map((item, index) => {
          return (
            <WordChip onClick={() => addSelectWordList(item)} key={index}>
              {item}
            </WordChip>
          );
        })}
      </WordContainer>
    </>
  );
};
