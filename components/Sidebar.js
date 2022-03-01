import Image from 'next/image'

import React from 'react'
import SidebarLink from './SidebarLink'

import { HomeIcon } from '@heroicons/react/solid'
import { useSession, signOut} from 'next-auth/react'

import { DotsHorizontalIcon, BellIcon, BookmarkIcon, ClipboardListIcon, DotsCircleHorizontalIcon, HashtagIcon, InboxIcon, UserIcon } from "@heroicons/react/outline"

function Sidebar() {
  const { data: session } = useSession()

  return (
    <div
      className="fixed hidden h-full flex-col items-center
        p-2 sm:flex xl:w-[340px] xl:items-start
        "
    >
      <div
        className="hoverAnimation flex h-14 w-14 items-center 
            justify-center p-0 xl:ml-24
            "
      >
        <Image src='https://icon-library.com/images/22224-tiger-icon_5825.png' width={30} height={30} />
      </div>
      <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      <button className='hidden xl:inline ml-auto bg-[#1d9bf0] text-white
      rounded-full w-56 h-[52px] text-lg font-bold shadow-md
      hover:bg-[#1a8cd8]
      '>GoGoGo</button>
      <div className='text-[#d9d9d9] flex items-center
      justify-center hoverAnimation xl:ml-auto xl:mr-5 mt-auto
      ' onClick={signOut}>
        <img src={session.user.image}
          alt=''
          className='h-10 w-10 rounded-full xl:mr-2.5'
        />
        <div className='hidden xl:inline leading-5'>
          <h4 className='font-bold'>{session.user.name}</h4>
          <p className='text-[#6e767d]'>@{session.user.tag}</p>
        </div>
        <DotsHorizontalIcon className='h-5 hidden xl:inline ml-10' />
      </div>
    </div>
  )
}

export default Sidebar
