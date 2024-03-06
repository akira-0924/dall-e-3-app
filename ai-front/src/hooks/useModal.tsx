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
    setIsOpen(false);
    setSelectedTeam(team);
  };

  return { isOpen, onOpen, onClose, onApply, selectedTeam };
};
