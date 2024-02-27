"use client";
import React from "react";

import { UserProvider } from "@/context";
import { CardList, Modal, SearchInput, AddForm } from "@/components";


export default function Home() {


  return (
    <div className="inline-block items-center justify-center mx-auto w-full h-[100vh] bg-gray-400">
      <UserProvider>

        <SearchInput/>
        <CardList />

        <Modal>
            <AddForm/>
        </Modal>
       
      </UserProvider>
    </div>
  );
}
