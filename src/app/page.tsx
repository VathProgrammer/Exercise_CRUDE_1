"use client"
import React, { useEffect, useState } from "react";
import { CardList, Modal, FormUpdate, ValidationForm, SearchInput } from "@/components";

export interface User {
  id: string;
  username: string;
  profile: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectCard, setSelectCard] = useState("");
  const [search, setSearch] = useState("");

  // Function to load data from local storage
  const loadDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("myData");
    if (savedData) {
      setUsers(JSON.parse(savedData));
    }
  };

  // useEffect to load data from local storage on component mount
  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  // useEffect to save data to local storage whenever 'users' state changes
  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(users));
  }, [users]);

  const selectedUser = users.find((user) => user.id === selectCard);

  const handleDeleteCard = (id: string) => {
    const deleteItem = users.filter((user) => user.id !== id);
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
      <Modal selectCard={selectCard}>
        {selectedUser ? (
          <FormUpdate selectedUser={selectedUser} updateUser={setUsers} />
        ) : (
          <ValidationForm addNewUser={setUsers} />
        )}
      </Modal>
    </div>
  );
}
