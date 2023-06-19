import { PropsWithChildren } from "react"

import { SiteHeader } from "@/components/site-header"

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  )
}
