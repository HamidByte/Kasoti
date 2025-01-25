import axios from 'axios'

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_API_KEY}`

export const sendQuestion = async (prompt) => {
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
