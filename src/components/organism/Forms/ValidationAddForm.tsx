import { User } from "@/app/page";
import React, { ChangeEvent, SetStateAction, useState } from "react";
import { InputForm } from "./InputForm"; // Assuming these are correctly imported
import { userSchema } from "@/validations/Scema";
import { Input } from "./Input";

interface FormAddProps {
  localAddNewUser: React.Dispatch<SetStateAction<User[]>>;
}

const ValidationForm = ({ localAddNewUser }: FormAddProps) => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    profile: null as string | null,
    video: null as string | null
  });
  const [errors, setErrors] = useState({
    username: "",
    profile: "",
  });

  const validateForm = async (name: string, value: string | File) => {
    try {
      await userSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error: any) {
      console.log("Error", error);
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };  

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if there is an error message for the profile
    if (errors.profile || errors.username) {
      return;
    }

    try {
      await userSchema.validate(user, { abortEarly: false });

      const newId = Math.random().toString(36).substring(2, 8); // return 1f74e
      const newUser = { ...user, id: newId };
      localAddNewUser((prev:any) => [...prev,newUser])
    } catch (error) {
      console.log("error", error);
      const fieldErrors: { [key: string]: string } = {};

      // Error From Yup
      (error as any).inner.forEach((err: any) => {
        fieldErrors[err.path] = err.message;
      });
      setErrors((prev) => ({
        ...prev,
        fieldErrors
      }));
      return;
    }
  };

  // Get the value from the input fields:
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    validateForm(name, value);
  };

  const handleOnUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) return;

    validateForm(e.target.name, file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        profile: imageUrl,
      }));
    }
  };

  const handleUpdloadVideo = (e:ChangeEvent<HTMLInputElement | HTMLFormElement>) =>{
    const {name,files} = e.target;

    const file = files && files[0]
    if(!file) return 

    if(file){
      const videoUrl = URL.createObjectURL(file);
      setUser((prev) =>{
        return {
          ...prev,
          [name]: videoUrl
        }
      })
    }
  }

  console.log(user.video)

  return (
    <InputForm className="px-1 py-5" onSubmit={handleOnSubmit}>
      <Input
        className="text-black border rounded-md border-black m-2 focus:ring-2 outline-none px-2  py-2"
        type="text"
        name="username"
        value={user.username}
        placeholder="username"
        onChange={handleOnChange}
        label="username"
        error={errors.username}
      />

      <Input
        className="h-32 bg-gray-500 flex justify-center items-center mt-3"
        type="file"
        name="profile"
        placeholder="profile"
        onChange={handleOnUploadFile}
        label="profile"
        error={errors.profile}
      />

      <Input
        type="file"
        name="video"
        placeholder="video"
        onChange={handleUpdloadVideo}
        label="video" 
      />
      <button className="px-10 py-1 bg-green-600 rounded-full mt-5" type="submit">
        Submit
      </button>
    </InputForm>
  );
};

export { ValidationForm };
