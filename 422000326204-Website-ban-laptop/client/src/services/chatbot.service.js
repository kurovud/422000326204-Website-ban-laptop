import api from './api.js'

export async function trainChatbot(texts) {
  const { data } = await api.post('/chatbot/train', { texts })
  return data
}

export async function askChatbot(question) {
  const { data } = await api.post('/chatbot/ask', { question })
  return data
}
