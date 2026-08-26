<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user.store';

import UserProfileCard from '@/components/userDetail/UserProfileCard.vue';
import StatusDropdown from '@/components/userDetail/StatusDropdown.vue';
import RoleDropdown from '@/components/userDetail/RoleDropdown.vue';
import ActivityTimeline from '@/components/userDetail/ActivityTimeline.vue';
import RestoreDialog from '@/components/userDetail/RestoreDialog.vue';

const userStore = useUserStore()
const showRestore = ref(false)
const route = useRoute()


const changeStatus = async (status) => {
    await userStore.updateStatus(route.params.id, status)
}

const changeRole = async (role) => {
    await userStore.updateRole(route.params.id, role)
}


// const getLogs = async () => {
//     await userStore.loadLogs(route.params.id)
// }

onMounted(async () => {
    try{
        userStore.loading = true
        userStore.error = null

        await userStore.loadUser(route.params.id);
        // await store.loadLogs(route.params.id);
    }catch(err){
        userStore.error(err.message)
    }finally{
        userStore.loading = false
    }
})



</script>

<template>
    <div>
         <UserProfileCard v-if="store.user"
         :user="userStore.user" />

         <StatusDropdown v-if="userStore.user"
         :status="userStore.user?.status" 
         @change="changeStatus"/>

         <RoleDropdown v-if="userStore.user"
         :role="userStore.user?.role" 
         @change="changeRole"/>

         <ActivityTimeline v-if="userStore.user"
         :logs="userStore.logs"/>

         <!-- <button @click="showRestore = true">Restore</button>
         <RestoreDialog
         :show="showRestore"
         @close="showRestore = false" /> -->

         <button class="bg-blue-500 text-white p-1 m-1 rounded-sm"  
                @click="getLogs">Refresh Logs</button>
    </div>
</template>