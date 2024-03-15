
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlusCircleIcon, User } from "lucide-react";
import { cookies } from "next/headers";
import AvatarComponent from "./Avatar";


export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  
  

  return session && user ? (
    <div className="flex flex-row items-center justify-end gap-4">
      {user.email}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarComponent userId={user.id} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#333333] text-white m-0 p-0">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/account" className="flex items-center">
              <User className="w-[12px] mr-1" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/account/edit" className="flex items-center">
              <User className="w-[12px] mr-1" />
              Edit Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusCircleIcon className="w-[12px] mr-1" /> New Post
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/password-change" className="flex items-center ">
              Change Password
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <form action="/auth/logout" method="post">
        <Button
          variant="outline"
          className="py-2 px-4 rounded-md hover:text-gray-500 no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <Link href="/login">
      {/* <Button variant='outline' className="py-2 px-4 rounded-md hover:text-gray-500 no-underline bg-btn-background hover:bg-btn-background-hover"> */}
      Login
      {/* </Button> */}
    </Link>
  )
}
