"use client"

import Link from "next/link"
import { useQuery } from "react-query";
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getMessages } from "@/api/messages"

export default function IndexPage() {
  const {
    isLoading,
    isError,
    data: messages
  } = useQuery("messages", getMessages);

  return (
    <>
      <section className="container grid items-center justify-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-center gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            CamerEnerve <br className="hidden sm:inline" />
          </h1>
          <p className="max-w-[700px] text-center text-lg text-muted-foreground sm:text-xl">
            Tout en restant anonyme, venez nous dire ce qui vous énerve au 237
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-center">
          <Link href="/messages" className={buttonVariants({ size: "lg" })}>
            Voir les messages
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Contribuer sur GitHub
          </Link>
        </div>
      </section>
      <section className="container grid items-center justify-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-xl font-extrabold leading-tight tracking-tighter sm:text-xl md:text-3xl lg:text-3xl">
            Derniers messages publiés
          </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {messages?.slice(0,3).map((message) => (
              <Card>
                <CardHeader>
                  <CardTitle>{message.title}</CardTitle>
                  <CardDescription>{message.text}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{message.category}</Badge>
                </CardContent>
                <CardFooter>
                  <p>{moment(message.created_at).fromNow()}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Link
            href="/messages"
            className="text-sm font-bold text-blue-500 hover:text-blue-700"
          >
            Voir tous les messages
          </Link>
        </div>
      </section>
    </>
  )
}
