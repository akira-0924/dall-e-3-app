import React from "react";
import { Word } from "../pages/type";
import { WordChip, WordContainer } from "../styled/style";
import { SizeBox } from "./atoms/SizeBox";

interface Props {
  list: Word;
  team: string;
}

export const WordList = ({ list, team }: Props) => {
  let displayList;
  if (team === "A") {
    displayList = list.A;
  } else if (team === "B") {
    displayList = list.B;
  } else if (team === "C") {
    displayList = list.C;
  }
  console.log(displayList);
  return (
    <>
      <WordContainer>
        {displayList?.noun.map((item, index) => {
          return <WordChip key={index}>{item.word}</WordChip>;
        })}
      </WordContainer>
      <SizeBox size={32} />
      <WordContainer>
        <div>
          {displayList?.conjunction.map((item, index) => {
            return <WordChip key={index}>{item}</WordChip>;
          })}
        </div>
      </WordContainer>
    </>
  );
};
