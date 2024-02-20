"use client"
import React, { useEffect, useState } from "react";
import { CardList, Modal, FormUpdate, ValidationForm, SearchInput } from "@/components";
import useLocalStorage from "@/localStorage";
export interface User {
  id: string;
  username: string;
  profile: string;
  video?: string;
}

export default function Home() {
  const [selectCard, setSelectCard] = useState("");
  const [search, setSearch] = useState("");
  const [localUsers,setLocalUsers] = useLocalStorage ("localUsers",[])


  const handleDeleteCard = (id: string) => {

  const updatedLocalUsers = localUsers.filter((item:any) => item.id !== id);

  // Update the local state
  setLocalUsers(updatedLocalUsers);

  // Update local storage
  localStorage.setItem("localUsers", JSON.stringify(updatedLocalUsers));
    console.log(localUsers)
  };
  const selectedUser = localUsers.find((user:any) => user.id === selectCard);

console.log(localUsers)
  return (
    <div className="inline-block items-center justify-center mx-auto w-full">
      <SearchInput setSearch={setSearch} />

      <CardList
        onDeleteCard={handleDeleteCard}
        items={localUsers}
        selectCard={selectCard}
        onSelectCard={setSelectCard}
        search={search}
      />
      <Modal selectCard={selectCard}>
        {selectedUser ? (
          <FormUpdate selectedUser={selectedUser} updateUser={setLocalUsers} />
        ) : (
          <ValidationForm  localAddNewUser={setLocalUsers} />
        )}
      </Modal>
    </div>
  );
}
