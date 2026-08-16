<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import api from "@/services/api"



const router = useRouter()
const token = ref("")
const form = ref({
  email: "",
  password: "",
})

const login = async ()=> {
  try {
    const response = await api.post('/auth/login', form.value)

    if(!response.data.success){
      throw new Error(response.data.message)
    }
    localStorage.setItem("token", response.data.data.token)
    
    console.log(response.data)
    console.log(response.data.success)

    router.push('/users/2')
  } catch(err){
    console.log(err.response?.data);
    console.log(err.response?.data?.status);
  }
}

const showPassword = ref(false)
</script>

<template>
  <main class="flex justify-center items-center bg-blue-200 min-h-screen px-5 pb-8">
    <div class="py-6 bg-white rounded-sm shadow-lg  max-w-sm ">
      <div class="pt-4">
          <h2 class="text-md text-gray-900 text-center mt-1">NovaOps Management</h2>
      </div>
      <form class=" px-6 space-y-3 mt-3" @submit.prevent>
        <div class="sm:w-64 flex flex-col-reverse">
          <input
            type="text"
            id="username"
            class="peer w-full  bg-blue-100
                   border-b border-gray-300
                   focus:outline-none
                   focus:border-blue-600
                   "
            placeholder="username atau email"
            v-model="form.email"
          >
          <label
            for="username"
            class=" left-0 top-1
                   text-gray-400
                   peer-focus:text-blue-600">
                   <span class="text-[10px]">Username</span>
          </label>
        </div>
        <div class="relative sm:w-64  flex flex-col-reverse">
            <input
                  id="password"
                  class=" peer w-full border-b border-gray-300 focus:outline-none focus:border-blue-500
                          bg-blue-100 "
                  :type="showPassword ? 'text' : 'password' "
                  required
                  v-model="form.password"
            >
            <label  
                  for="password"
                  class=" left-0 top-1 
                          text-gray-400
                          peer-focus:text-blue-600 m-0">
                  <span class="text-[10px]">Password</span>
            </label>
            <div v-if="!showPassword" class="absolute right-1 p-2" @click="showPassword = !showPassword">
                 <mdicon name="eye-off-outline" size="10" class=""/>
            </div>
            <div v-if="showPassword" class="absolute right-1 p-2" @click="showPassword = !showPassword">
              <mdicon name="eye-outline" size="10" />
            </div>
        </div>
        <div class="flex items-center">
          <input type="checkbox" name="" id="remember" class="accent-blue-600 scale-125 cursor-pointer ">
          <label for="remember" class="ml-2 text-gray-700 text-[10px] cursor-pointer">Remember me</label>
          <button class="text-[10px] ml-auto text-blue-700 cursor-pointer hover:underline">Forgot password?</button>
        </div>
        <button @click="login()"
                class="bg-green-300 w-full p-2 mb-2 mt-3 rounded-sm hover:bg-[#3247b1]/80 text-white text-xs font-semibold">
          Sign in
        </button>
        <router-link 
            class="bg-amber-500 w-full p-2 mb-2 mt-3 rounded-sm hover:bg-[#3247b1]/80 text-white text-xs font-semibold"
            to="/register">Register</router-link>
      </form>
    </div>
  </main>
</template>