"use client"
import React from 'react'
import { useParams } from 'next/navigation'

const Page = () => {
    const param = useParams()
  return (
    <h1 className='text-gray-900 '>
        The username is {param.username}
    </h1>
  )
}

export default Page