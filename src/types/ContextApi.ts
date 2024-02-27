import { SetStateAction } from "react";

interface ContextApiProps {
  handleDeleteCard?: (id:string) => void;
  selectCard?: string | undefined;
  setSelectCard?: React.Dispatch<SetStateAction<string>>;
  handleAddUsers?: (user: {}) => void ;
  localUsers?: [];
  selectedUser?: [];
  handleUpdateUsers?: {};
  search?: string;
  setSearch?: React.Dispatch<SetStateAction<string>>;
}


export type {ContextApiProps}