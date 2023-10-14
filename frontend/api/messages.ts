import { API_BASE_ENDPOINT } from "@/api/constants"

export const getMessages = async () => {
  // const messages = await (await fetch(`${API_BASE_ENDPOINT}/messages/?limit=20`)).json();
  const messages = await (await fetch(`${API_BASE_ENDPOINT}/messages`)).json();
  return messages;
}

export const postMessages = async (category_id, message: string) => {
  try{
    const resp = await fetch(`${API_BASE_ENDPOINT}/messages`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({category_id, text: message})
    })
    return resp.json();
  } catch (e){
    console.log(e)
    return null;
  }
}
