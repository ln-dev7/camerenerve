import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Separator } from "./ui/separator"

export function SiteFooter() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <Separator />
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <p className="text-muted-foreground text-sm">
          Tout droits réservés © {new Date().getFullYear()} CamerEnerve
        </p>
      </div>
    </header>
  )
}
