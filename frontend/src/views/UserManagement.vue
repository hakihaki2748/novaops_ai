<script setup>
import UserSearch from '@/components/userManagement/UserSearch.vue';
import UserTable from '@/components/userManagement/UserTable.vue';
import UserPagination from '@/components/userManagement/UserPagination.vue';
import { useUserStore } from '@/stores/user.store';
import { onMounted } from 'vue';

const userStore = useUserStore();



onMounted(async () => {
    await userStore.loadUsers()
})


const searchUser = async (keywoard) => {
    await userStore.setSearch(keywoard)
}

const changePage = async (page) => {
    await userStore.setPage(page)
}
</script>

<template>
    <div>
        <UserSearch
         @search="searchUser"/>

         <div v-if="userStore.loading">
            Loading users...
         </div>

         <div v-else-if="userStore.error">
            {{ userStore.error }}
            <button @click="userStore.loadUsers">
                Retry
            </button>
         </div>
         <div v-else-if="userStore.users.length === 0">
            Users Not Found
         </div>

        <UserTable v-else
         :users="userStore.users" />
        
        <UserPagination 
        :page="userStore.pagination.page"
        :totalPages="userStore.pagination.totalPages"
        @change="changePage"/>

    </div>
</template>