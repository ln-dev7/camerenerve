"use client"

import React from "react"
import { NextSeo } from "next-seo"
import { QueryClient, QueryClientProvider } from "react-query"

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  )

  return (
    <QueryClientProvider client={client}>
      <NextSeo
        title="CamerEnerve"
        description="Tout en restant anonyme, venez nous dire ce qui vous énerve au 237"
        canonical="https://camerenerve.vercel.app/"
        openGraph={{
          url: "https://camerenerve.vercel.app/",
          title: "CamerEnerve",
          description: "Tout en restant anonyme, venez nous dire ce qui vous énerve au 237",
          images: [
            {
              url: "https://camerenerve.vercel.app/banner.png",
              alt: "CamerEnerve Banner",
              type: "image/jpeg",
              secureUrl: "https://camerenerve.vercel.app/banner.png",
            },
          ],
          siteName: "CamerEnerve",
        }}
        twitter={{
          handle: "@ln_dev7",
          site: "@ln_dev7",
          cardType: "summary_large_image",
        }}
      />
      {children}
    </QueryClientProvider>
  )
}

export default Providers
