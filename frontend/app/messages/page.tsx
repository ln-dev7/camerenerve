"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getCategories } from "@/api/categories"
import { getMessages, postMessages } from "@/api/messages"
import formatDateTime from "@/utils/formatDateTime"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "react-query"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
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
import { ToastAction } from "@/components/ui/toast"
import { toast, useToast } from "@/components/ui/use-toast"
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
  message: z
    .string({
      required_error: "Veuillez écrire un message",
    })
    .min(20, {
      message: "Votre message doit dépasser 20 caractères",
    }),
  categorie: z.string({
    required_error: "Veuillez choisir une catégorie",
  }),
})

export default function IndexMessages() {
  const { toast } = useToast()

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
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation(
    (data: { message: string; categorie: string }) =>
      postMessages(data.categorie, data.message),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("messages") // Invalide le cache de la requête "messages"
      },
    }
  )

  async function onSubmit(data: { message: string; categorie: string }) {
    const { message, categorie } = data

    try {
      await mutation.mutateAsync({ message, categorie })
      form.reset()
      setOpenAddDialog(false)
      toast({
        title: "Votre message a été ajouté avec succès",
        description: "Merci pour votre contribution",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Votre message n'a pas pu être ajouté",
        description: "Veuillez réessayer plus tard",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      })
    } finally {
      form.reset()
      setOpenAddDialog(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 pb-8 pt-6 md:py-6">
      <section className="sticky top-4 z-30 border-b bg-white pb-2 dark:bg-gray-950 lg:pb-4">
        <div className="container flex flex-col items-center gap-6">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
            Messages <br className="hidden sm:inline" />
          </h1>
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
            <FilterTags />
            <div className="flex w-full items-center gap-2">
              <SearchBar />
              <AlertDialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-fit shrink-0"
                    onClick={() => setOpenAddDialog(true)}
                  >
                    <Plus className="h-4 w-4 sm:hidden" />
                    <span className="hidden sm:flex">Ajouter un message</span>
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
                    <form className="w-full space-y-6">
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
                      <div className="flex w-full items-center justify-end gap-4">
                        <AlertDialogCancel className="mt-0">
                          Annuler
                        </AlertDialogCancel>
                        <Button
                          type="submit"
                          disabled={mutation.isLoading}
                          onClick={
                            !mutation.isLoading
                              ? form.handleSubmit(onSubmit)
                              : undefined
                          }
                        >
                          {mutation.isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Ajouter
                        </Button>
                      </div>
                    </form>
                  </Form>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        {isMessagesLoading || isCategoriesLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <CardsLoader />
          </div>
        ) : null}
        {messages ? (
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              779: 1,
              780: 2,
              1120: 3,
            }}
            className="w-full"
          >
            <Masonry gutter="1rem">
              {messages.map((message) => (
                <Card className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:shadow-md">
                  <CardHeader>
                    <CardDescription>{message.text}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">{message.category}</Badge>
                  </CardContent>
                  <CardFooter>
                    <p>{formatDateTime(message.created_at)}</p>
                  </CardFooter>
                </Card>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : null}
        {IsMessagesError ? (
          <div className="flex w-full items-center justify-center py-4">
            <p className="text-lg">
              Une erreur est survenue, Veuillez reessayer plus tard
            </p>
          </div>
        ) : null}
      </section>
    </div>
  )
}
