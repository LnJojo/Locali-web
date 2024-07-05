import { useContext } from 'react'
import { useRouter } from 'next/router'
import OutlineUserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon.js'
import UserContext from './UserContext'
import React from 'react';

export default function LoggedIn() {
  const router = useRouter()
  const { user } = useContext(UserContext)
  function onClick() {
    if (user)
      router.push('/profile')
    else
      router.push('/login')
  }

  return (
    <button
      className="flex gap-2 [&_svg]:h-6 [&_svg]:w-6 dark:bg-gray-600 dark:text-white"
      onClick={onClick}
    >
      {user ?
        <>
          <OutlineUserCircleIcon />
          Welcome {user.email} !
        </>
        :
        <>
          <OutlineUserCircleIcon />
          Login
        </>
      }
    </button>
  )
}