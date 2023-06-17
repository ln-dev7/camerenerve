export const getCategories = async () => {
  const categories = await (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/categories`)).json();
  return categories;
}
