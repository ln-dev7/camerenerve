import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Camereverve",
  description: "What annoys people in Cameroon",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/ln_dev7",
    github: "https://github.com/ln-dev7/camerenerve",
    docs: "https://lndev.me",
  },
}
