"use client"

import Link from "next/link"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import FilterTags from "@/components/filter-tags"
import SearchBar from "@/components/search-bar"

export default function IndexMessages() {
  const messages = [
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
    {
      id: Math.random(),
      title: "Les coupures d'électricité",
      description:
        "Les coupures d'électricité sont de plus en plus fréquentes dans mon quartier. C'est vraiment énervant.",
      tag: "Energie",
      date: "2021-10-01",
    },
  ]
  return (
    <div className="flex flex-col gap-8  pt-6 pb-8 md:py-10">
      <section className="container flex flex-col items-center gap-6">
        <h1 className="text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
          Messages <br className="hidden sm:inline" />
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
          <FilterTags />
          <SearchBar />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full sm:w-fit shrink-0">
                Ajouter un message
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Ajouter un message</AlertDialogTitle>
                <AlertDialogDescription>
                  L'ajout d'un message se fait complètement anonymement.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Titre</Label>
                    <Input id="title" placeholder="Titre du message" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Description du message"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="tag">Choix du tag</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                        <SelectContent position="popper">
                          <SelectItem value="all">Tout</SelectItem>
                          <SelectItem value="energie">Energie</SelectItem>
                          <SelectItem value="eau">Eau</SelectItem>
                          <SelectItem value="connexion">Connexion</SelectItem>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  </div>
                </div>
              </form>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction>Ajouter</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
      <section className="container">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {messages.map((message) => (
            <Card className="hover:shadow-md transition-all duration-300 ease-in-out hover:cursor-pointer">
              <CardHeader>
                <CardTitle>{message.title}</CardTitle>
                <CardDescription>{message.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">{message.tag}</Badge>
              </CardContent>
              <CardFooter>
                <p>{message.date}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
