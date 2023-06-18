import React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FilterTags() {
  return (
    <Select>
      <SelectTrigger className="w-full shrink-0 sm:w-[180px]">
        <SelectValue placeholder="Filtre par tag" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tags</SelectLabel>
          <SelectItem value="all">Tout</SelectItem>
          <SelectItem value="energie">Energie</SelectItem>
          <SelectItem value="eau">Eau</SelectItem>
          <SelectItem value="connexion">Connexion</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
