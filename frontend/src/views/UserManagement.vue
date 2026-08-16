<script setup>
import UserSearch from '@/components/userManagement/UserSearch.vue';
import UserTable from '@/components/userManagement/UserTable.vue';
import UserPagination from '@/components/userManagement/UserPagination.vue';
import api from '@/services/api';
import { onMounted, ref } from 'vue';

const users = ref([])
const page = ref(1)
const limit = ref(10)
const search = ref("")

const loadUsers = async() => {
    try{
        const res = await api.get("/users", {
            //tidak perlu headers:{} karena sudah di interceptors
            params: {
                page: page.value,
                limit: limit.value,
                search: search.value
            }
        })

        console.log("response search:", res.data)

        console.log(res.data.data)
        if(!res.data.success){
            throw new Error(res.data.message)
        }

        users.value = res.data.data
        return users.value
    }catch(err){
        console.error(err.message)
    }
}

const searchUser = async (keywoard) => {
    search.value = keywoard;
    loadUsers()
}

const changePage = async (val) => {
    page.value = val;
    loadUsers()
}

onMounted(async () => {
    await loadUsers();
})
</script>

<template>
    <div>
        <UserSearch
         @search="searchUser"/>

        <UserTable 
         :users="users" />
        
        <UserPagination 
        :page="page"
        @change="changePage"/>

    </div>
</template>