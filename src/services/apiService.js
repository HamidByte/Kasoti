import axios from 'axios'

const API_URL = `${import.meta.env.VITE_GEMINI_2_FLASH_EXPERIMENTAL_URL}${import.meta.env.VITE_GEMINI_2_FLASH_EXPERIMENTAL_API_KEY}`

export const sendQuestionApi = async (prompt) => {
  try {
    const response = await axios.post(API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    return null
  }
}
