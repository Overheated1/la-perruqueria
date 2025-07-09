"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User, LogOut, Settings, Calendar, Heart } from "lucide-react"

interface UserNavProps {
  dictionary: {
    signIn: string
    profile: string
    appointments: string
    favorites: string
    settings: string
    signOut: string
    signingOut: string
  }
  lang: string
}

export function UserNav({ dictionary, lang }: UserNavProps) {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: `/${lang}` })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (status === "loading") {
    return (
      <Button variant="ghost" size="icon" disabled className="h-9 w-9">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary/20">...</AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  if (status === "unauthenticated") {
    return (
      <Button asChild variant="outline" size="sm">
        <Link href={`/${lang}/auth/signin`}>
          <User className="h-4 w-4 mr-2" />
          {/* {dictionary.signIn} */}
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {session?.user?.name ? getInitials(session.user.name) : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{session?.user?.name}</p>
            <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/profile`}>
            <User className="h-4 w-4 mr-2" />
            {dictionary.profile}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/appointments`}>
            <Calendar className="h-4 w-4 mr-2" />
            {dictionary.appointments}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/favorites`}>
            <Heart className="h-4 w-4 mr-2" />
            {dictionary.favorites}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/settings`}>
            <Settings className="h-4 w-4 mr-2" />
            {dictionary.settings}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} disabled={isLoading} className="text-red-500 focus:text-red-500">
          <LogOut className="h-4 w-4 mr-2" />
          {isLoading ? dictionary.signingOut : dictionary.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
