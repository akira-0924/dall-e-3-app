import {
  ModalContainer,
  ModalWindow,
  ModalTitle,
  CloseButton,
  ModalContent,
  ButtonContainer,
  Button,
  Select,
} from "../styled/style";
import { useState } from "react";

interface Props {
  onClose: () => void;
  onApply: (team: string) => void;
}

export const Modal = ({ onClose, onApply }: Props) => {
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };
  return (
    <ModalContainer>
      <ModalWindow>
        {/* <ModalTitle>Modal title</ModalTitle> */}
        {/* <CloseButton onClick={onClose}>×</CloseButton> */}
        <ModalContent>チームを選択してください</ModalContent>
        <Select value={selectedTeam} onChange={handleTeamChange}>
          <option value="" disabled>
            選択してください
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </Select>
        <ButtonContainer>
          <Button
            className="nextButton"
            onClick={() => {
              onApply(selectedTeam);
            }}
          >
            決定
          </Button>
        </ButtonContainer>
      </ModalWindow>
    </ModalContainer>
  );
};
