<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import api from '@/services/api'

const router = useRouter();

const form = ref({
    name: "",
    phone: "",
    email: "",
    password: ""
})

const daftar = async () => {
    try{
        const response = await api.post('/auth/register', form.value)
        console.log(response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        router.push('/')
    } catch (err){
        console.log(err.response.data.message)
    }
    
}



</script>
<template>
    <main class="min-h-screen flex justify-center items-center bg-gray-300 px-4">
        <div class="bg-white w-full max-w-sm rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-semibold text-center mb-6">Registrasi</h2>
            <form class="p-4" @submit.prevent>
                <div class="mb-4">
                    <input type="text" 
                            v-model="form.name"
                            placeholder="name" 
                            class="w-full bg-green-50 rounded-xl p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            required>
                </div>
                <div class="mb-4">
                    <input type="text" 
                            v-model="form.phone"
                            placeholder="phone" 
                            class="w-full bg-green-50 rounded-xl p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            required>
                </div>
                <div class="mb-4">
                    <input type="text" 
                            v-model="form.email"
                            placeholder="email" 
                            class="w-full bg-green-50 rounded-xl p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            required>
                </div>
                <div class="mb-4 relative">
                    <input type="password"
                            v-model="form.password"
                            placeholder="Password" 
                            class="w-full bg-green-50 rounded-xl p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            required>
                    <button  class="absolute right-3 top-3">
	    	           
                    </button>
                </div>
                <button type="submit"
                        @click="daftar()"
                        class="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full rounded-lg p-2 text-white"       
                        >Daftar</button>
            </form>
            <p class="text-center font-semibold px-5">Sudah punya akun? 
                <router-link to="/" class="text-blue-500">Login di sini
                </router-link>
            </p>
        </div>
    </main>
   
</template>