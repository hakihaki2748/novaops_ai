<script setup>
import UserSearch from '@/components/userManagement/UserSearch.vue';
import UserTable from '@/components/userManagement/UserTable.vue';
import UserPagination from '@/components/userManagement/UserPagination.vue';
import { useUserStore } from '@/stores/user.store';
import { onMounted, ref } from 'vue';

const users = ref([])
const user = ref([])
const page = ref(1)
const limit = ref(10)
const search = ref("")
const error = ref(null)

const loadUsers = async(params) => {
    try{
        const res = await useUserStore.loadUsers({
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
        error.value = err.message
    }
}

const searchUser = async (keywoard) => {
    try{
        const res = await useUserStore.setSearch(keywoard)
    } catch (err){
        error.value = err.message
    }
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