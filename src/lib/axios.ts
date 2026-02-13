import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((conf) => {
  const token = localStorage.getItem('AUTH_TOKEN')
  if (token) {
    conf.headers.Authorization = `Bearer ${token}`
  }

  return conf
})

export default api
