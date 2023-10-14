import { API_BASE_ENDPOINT } from "@/api/constants"

export const getCategories = async () => {
  const categories = await (
    await fetch(`${API_BASE_ENDPOINT}/categories`)
  ).json()
  return categories
}
