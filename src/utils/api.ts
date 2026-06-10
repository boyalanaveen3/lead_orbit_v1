import axios from "axios"

export const api = axios.create({
    baseURL: "https://leadorbit.boyalanavee103.workers.dev/api"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/* "https://leadorbit.boyalanavee103.workers.dev/api/" */