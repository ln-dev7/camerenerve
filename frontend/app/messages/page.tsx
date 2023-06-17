"use client"

import Link from "next/link"
import { getCategories } from "@/api/categories"
import { getMessages } from "@/api/messages"
import moment from "moment"
import { useQuery } from "react-query"

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
import { CardsLoader } from "@/components/cards-loader"
import FilterTags from "@/components/filter-tags"
import SearchBar from "@/components/search-bar"

export default function IndexMessages() {
  const {
    isLoading: isMessagesLoading,
    isError: IsMessagesError,
    data: messages,
  } = useQuery("messages", getMessages)
  const {
    isLoading: isCategoriesLoading,
    isError: IsCategoriesError,
    data: categories,
  } = useQuery("categories", getCategories)
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
                  L&apos;ajout d&apos;un message se fait complètement
                  anonymement.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="tag">Choix du tag</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                        <SelectContent position="popper">
                          <SelectItem value="0">Tout</SelectItem>
                          {categories?.map((category) => (
                            <SelectItem value={`${category.id}`}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Description du message"
                    />
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
        {isMessagesLoading || isCategoriesLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <CardsLoader />
          </div>
        ) : null}
        {messages ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {messages.map((message) => (
              <Card className="hover:shadow-md transition-all duration-300 ease-in-out hover:cursor-pointer">
                <CardHeader>
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
        ) : null}
        {IsMessagesError ? (
          <div className="w-full flex items-center justify-center py-4">
            <p className="text-lg">
              Une erreur est survenue, Veuillez reessayer plus tard
            </p>
          </div>
        ) : null}
      </section>
    </div>
  )
}
