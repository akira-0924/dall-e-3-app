import {
  ModalContainer,
  ModalWindow,
  ModalContent,
  ButtonContainer,
  Button,
  Select,
  ErrContainer,
} from "../styled/style";
import { useState, useEffect } from "react";

interface Props {
  onClose: () => void;
  onApply: (team: string) => string | undefined;
}

export const Modal = ({ onClose, onApply }: Props) => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [isErr, setIsErr] = useState(false);

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsErr(false);
    setSelectedTeam(event.target.value);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <ModalContainer>
      <ModalWindow>
        <ModalContent>チームを選択してください</ModalContent>
        <Select value={selectedTeam} onChange={handleTeamChange}>
          <option value="" disabled>
            選択してください
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </Select>
        {isErr && (
          <ErrContainer className="text-red-500">
            チームを選択してください
          </ErrContainer>
        )}
        <ButtonContainer>
          <Button
            className="nextButton"
            onClick={() => {
              const result = onApply(selectedTeam);
              if (result !== undefined || result !== "") {
                setIsErr(true);
              } else {
                setIsErr(false);
              }
            }}
          >
            決定
          </Button>
        </ButtonContainer>
      </ModalWindow>
    </ModalContainer>
  );
};
