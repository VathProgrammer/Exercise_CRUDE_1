"use client"
import React, { createContext, useState } from "react";
import useLocalStorage from "@/localStorage";
import { ContextApiProps } from "@/types";

// Define the initial context value
const initialContextValue: ContextApiProps = {
  handleDeleteCard: () => {},
  selectCard: "", // Provide default values for all properties
  setSelectCard: () => {},
  handleAddUsers: () => {},
  localUsers: [],
  handleUpdateUsers: () => {},
  search: '',
  setSearch: () => {}
};

export const userContext = createContext<ContextApiProps | undefined>(
  initialContextValue // Pass the initial context value to createContext
);

const UserProvider = ({ children }: { children?: React.ReactNode }) => {
  const [selectCard, setSelectCard] = useState<string>("");
  const [localUsers, setLocalUsers] = useLocalStorage("localUsers", []);
  const [search, setSearch] = useState<string>('')
  

  const handleDeleteCard = (id: string) => {
    const updatedLocalUsers = localUsers.filter((item: any) => item.id !== id);

    // Update the local state
    setLocalUsers(updatedLocalUsers);

    // Update local storage
    localStorage.setItem("localUsers", JSON.stringify(updatedLocalUsers));
    console.log(localUsers);
  };
  const selectedUser = localUsers.find((user: any) => user.id === selectCard);

  const handleAddUsers = (user: {}) => {
    const newId = Math.random().toString(36).substring(2, 8); // return 1f74e
    const newUser = { ...user, id: newId };
    setLocalUsers((prev: any) => [...prev, newUser]);
  };

  const handleUpdateUsers = (user: {}) => {
    setLocalUsers((prevUsers: any) => {
      return prevUsers.map((prevUser: any) => {
        if (prevUser.id === selectedUser.id) {
          return {
            ...prevUser,
            ...user,
          };
        }
        return prevUser;
      });
    });
  };

  const contextValue: ContextApiProps = {
    handleDeleteCard,
    selectCard,
    setSelectCard,
    handleAddUsers,
    localUsers,
    selectedUser,
    handleUpdateUsers,
    search,
    setSearch
  };
  console.log(localUsers);
  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

export { UserProvider };