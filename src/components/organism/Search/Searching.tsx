"use client"
import React, { SetStateAction, useState } from 'react'

const SearchInput = ({setSearch}:{setSearch:React.Dispatch<SetStateAction<string>>}) => {
  
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setSearch(e.target.value.toLowerCase())
  }

  return (
    <div className='w-full flex justify-center mt-2'>
      <input type="text" 
      className='outline-none border-2 w-[300px] h-[40px] p-4 rounded-md focus:ring-green-200' placeholder='Enter name'
      onChange={handleSearch}
      />
      <button className='w-[100px] h-[40px] text-white bg-blue-900 rounded-md ml-2'>Search</button>
    </div>
  )
}

export { SearchInput}
