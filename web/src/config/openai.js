import OpenAI from 'openai'

// TODO: Replace with your OpenAI API key
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key-here',
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
})

export default openai

