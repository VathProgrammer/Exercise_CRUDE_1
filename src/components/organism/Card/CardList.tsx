"use client";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "./Card";
import { User } from "@/types";
import { userContext } from "@/context/UserProvider";

const CardList = ({}) => {
  const { localUsers }: any = useContext(userContext);
  const { search }: any = useContext(userContext);

  return (
    <div>
      {search
        ? localUsers.map((item: User, index: number) =>
            item.username.includes(search) ? (
              <Card
                id={item.id}
                username={item.username}
                key={item.id || index}
                profile={item.profile}
                // onSelectCard={onSelectCard}
                // selectCard={selectCard}
                // onDeleteCard={onDeleteCard}
                video={item.video}
              ></Card>
            ) : null
          )
        : localUsers.map((item: User, index: number) => (
            <Card
              id={item.id}
              username={item.username}
              key={item.id || index}
              profile={item.profile}
              video={item.video}
              // onSelectCard={onSelectCard}
              // selectCard={selectCard}
              // onDeleteCard={onDeleteCard}
            ></Card>
          ))}
    </div>
  );
};

export { CardList };
