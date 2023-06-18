"use client"

import Link from "next/link"
import { getCategories } from "@/api/categories"
import { getMessages } from "@/api/messages"
import { zodResolver } from "@hookform/resolvers/zod"
import moment from "moment"
import { useForm } from "react-hook-form"
import { useQuery } from "react-query"
import * as z from "zod"

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
import { toast } from "@/components/ui/use-toast"
import { CardsLoader } from "@/components/cards-loader"
import FilterTags from "@/components/filter-tags"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"
import SearchBar from "@/components/search-bar"

const FormSchema = z.object({
  message: z.string({
    required_error: "Veuillez écrire un message",
  }).min(100, {
    message: "Votre message doit dépasser 100 caractère",
  }),
  categorie: z.string({
    required_error: "Veuillez choisir une catégorie",
  }),
})

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data) {
    const { message, categorie } = data
    console.log("add message", data)
  }
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            id="description"
                            placeholder="Contenu du message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="categorie"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choix de la catégorie</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisissez la catégorie de votre message" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">Autres</SelectItem>
                            {categories?.map((category) => (
                              <SelectItem value={`${category.id}`}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex items-center justify-end gap-4">
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </Form>
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
