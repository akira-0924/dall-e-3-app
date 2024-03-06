import { useCallback, useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState("");

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onApply = (team: string) => {
    console.log(team);
    if (team === "") {
      console.log("called");
      return "チームを選択してください";
    } else {
      setIsOpen(false);
      setSelectedTeam(team);
    }
  };

  return { isOpen, onOpen, onClose, onApply, selectedTeam };
};
