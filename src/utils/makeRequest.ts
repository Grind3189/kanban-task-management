import axios from 'axios'

const fromStorage = localStorage.getItem("token")
const token = fromStorage ? JSON.parse(fromStorage) : ""
console.log(token)
export const requestWithToken = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: "bearer" + "token"
    }
})
export const requestWithoutToken = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})