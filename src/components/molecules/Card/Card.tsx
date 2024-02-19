"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string;
  image: string;
  name: string;
  selectCard: string | null;
  onSelectCard: React.Dispatch<React.SetStateAction<string>>;
  onDeleteCard: (id: string) => void
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  image,
  selectCard,
  onSelectCard,
  onDeleteCard
}: CardProps) => {

  return (
    //Card
    <div
      onClick={() => {
        // Unselect Card
        if (selectCard === id) {
          onSelectCard("");
        } else {
          // Select Card
          onSelectCard(id);
        }
      }}
      className={
        selectCard === id
          ? "flex justify-between items-start w-[620px] bg-gray-400 text-white  m-auto mt-5 p-2 border border-[#d6c2e7] rounded-lg "
          : "flex justify-between items-start w-[620px]  m-auto mt-5 p-2 border border-[#d6c2e7] rounded-lg hover:bg-gray-200"
      }
    >
      <div className="flex flex-row justify-center gap-2">
        <div>
          <Image
            src={image}
            width={45}
            height={45}
            className="border rounded-full"
            alt="User's Photo"
          ></Image>
        </div>
        <div className="flex flex-col gap-0">
          <p className="text-base text-[#33363F] font-sans ">{name}</p>
              <Link href={`/pages/users/${name.trim()}`} as={`/pages/users/${name.trim()}`} className="text-xs text-[#00000] opacity-[60%] font-sans p-1 hover:bg-cyan-900 ">
             Preveiw
          </Link>
        </div>
      </div>
      <div>
        <button  onClick={(e) => {onDeleteCard(id) 
        e.stopPropagation()}
      }>
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="15"
            height="15"
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              stroke-width="3"
              d="M35.4,38.8c-3.2,2.4-7.1,3.9-11.4,3.9C13.7,42.7,5.3,34.3,5.3,24c0-2.6,0.6-5.2,1.5-7.4"
            ></path>
            <path
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              stroke-width="3"
              d="M12.1,9.6C15.3,7,19.5,5.3,24,5.3c10.3,0,18.7,8.4,18.7,18.7c0,2.3-0.4,4.5-1.2,6.6"
            ></path>
            <line
              x1="31.1"
              x2="16.9"
              y1="16.9"
              y2="31.1"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              stroke-width="3"
            ></line>
            <line
              x1="31.1"
              x2="16.9"
              y1="31.1"
              y2="16.9"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              stroke-width="3"
            ></line>
          </svg>
        </i>
        </button>
      </div>
    </div>
  );
};

export { Card };
