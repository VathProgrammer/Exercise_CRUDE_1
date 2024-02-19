"use client";
import React, { createContext, useContext, useState } from "react";
import { CardList,Modal,FormUpdate,ValidationForm,SearchInput, Card } from "@/components";

export interface User {
  id: string;
  username: string;
  profile: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectCard, setSelectCard] = useState("");
  const selectedUser = users.filter((user) => {
    if (user.id === selectCard) {
      return user;
    }
  });
  const [search,setSearch] = useState ('')


  const handleDeleteCard = (id: string) => {
    const deleteItem = users.filter((users) => users.id !== id);
    setUsers(deleteItem);
  };


  return (
    <div className="inline-block items-center justify-center mx-auto w-full">
      <SearchInput setSearch={setSearch} />
      <CardList
        onDeleteCard={handleDeleteCard}
        items={users}
        selectCard={selectCard}
        onSelectCard={setSelectCard}
        search={search}
      />

      {/* <cardCotext.Provider value={}>
          <Card/>
      </cardCotext.Provider> */}
      <Modal selectCard={selectCard}>
        {selectedUser.length > 0 ? (
          <>
            <FormUpdate selectedUser={selectedUser[0]} updateUser={setUsers} />
          </>
        ) : (
          <>
            <ValidationForm addNewUser={setUsers} />
          </>
        )}
      </Modal>
    </div>
  );
}
