import { api } from "../utils/api"

export const  Dashboard =async()=>{
const resposne=await api.get("/dashboard")
return resposne.data
}