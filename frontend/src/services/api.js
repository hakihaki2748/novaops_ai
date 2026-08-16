import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});

//gunakan saat akan melakukan request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if(token){
        //membuat properti baru ditambahkan ke config diatas
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export default api;