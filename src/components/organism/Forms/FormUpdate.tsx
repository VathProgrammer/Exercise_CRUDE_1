/* eslint-disable @next/next/no-img-element */
"use client";
import { User } from "@/app/page";
import { userSchema } from "@/validations/Scema";
import React, { Dispatch, SetStateAction, useState } from "react";
import { InputForm } from "./InputForm";
import { Input } from "./Input";
import Image from "next/image";

interface FormAddProps {
  updateUser: Dispatch<SetStateAction<User[]>>;
  selectedUser: User;
  // setLocalUpdateUsers?: Dispatch<SetStateAction<User []>>
}

const FormUpdate: React.FC<FormAddProps> = ({ selectedUser, updateUser }) => {
  const [user, setUser] = useState({
    username: selectedUser.username,
    profile: selectedUser.profile,
  });

  const [userErrors, setUserErrors] = useState({
    username: "",
    profile: "",
  });

  const handleValidate = async (name: string, value: string | File) => {
    try {
      await userSchema.validateAt(name, { [name]: value });
      setUserErrors((prev) => {
        return {
          ...prev,
          [name]: "",
        };
      });
    } catch (errors: any) {
      console.log("the errors is: ", errors);
      setUserErrors((prev) => ({ ...prev, [name]: errors.message }));
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault();

    if (userErrors.profile) {
      return;
    }
    try {
      await userSchema.validate(user, { abortEarly: false });
      updateUser((prevUsers) => {
        return prevUsers.map((prevUser) => {
          if (prevUser.id === selectedUser.id) {
            return {
              ...prevUser,
              ...user,
            };
          }
          return prevUser;
        });
      });
    } catch (errors) {
      console.log("error", errors);
      const fieldErrors: { [key: string]: string } = {};

      // Error From Yup
      (errors as any).inner.forEach((err: any) => {
        fieldErrors[err.path] = err.message;
      });

      setUserErrors((prev) => ({
        ...prev,
        fieldErrors,
      }));
      return;
    }
  };

  // Get the value from the input fields:
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
    console.log(name,value)
    handleValidate(name, value);
  };

  const handleOnUploadFile = (
    e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    const file = e.target.files[0];
    const { name } = e.target;
    handleValidate(name, file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => {
        return {
          ...prevUser,
          profile: imageUrl,
        };
      });
    }
  };

  const handleRemoveFile = () => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        profile: "",
      };
    });
  };
  console.log(user.username);

  return (

    <InputForm className="p-3" onSubmit={handleOnSubmit}>
      <Input
        type="text"
        name="username"
        label="username"
        error={userErrors.username}
       
        placeholder="username"
        onChange={handleOnChange}
        value={user.username}
        className="text-black border rounded-md border-black m-2 focus:ring-2 outline-none px-2"
      />
      {selectedUser.profile ? (
        <>
          <div className="relative">
            {/* <img src={selectedUser.profile} alt="profile" /> */}
            <Image
            src={selectedUser.profile}
            width={200}
            height={200}
            alt="profile image"
            />
            <button
              className="px-3 py-1 absolute bg-red-500 top-80"
              onClick={handleRemoveFile}
            >
              &times;
            </button>
          </div>
        </>
      ) : (
        <Input
          type="file"
          name="profile"
          label="profile"
          error={userErrors.profile}
          placeholder="profile"
          accept="image/**"
          onChange={handleOnUploadFile}
        />
      )}

      <button
        type="submit"
        className="px-10 py-1 bg-green-600 rounded-full outline-none border-none"
      >
        Update
      </button>
    </InputForm>
  );
};

export { FormUpdate };
