<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user.store';

import UserProfileCard from '@/components/userDetail/UserProfileCard.vue';
import StatusDropdown from '@/components/userDetail/StatusDropdown.vue';
import RoleDropdown from '@/components/userDetail/RoleDropdown.vue';
import ActivityTimeline from '@/components/userDetail/ActivityTimeline.vue';
import RestoreDialog from '@/components/userDetail/RestoreDialog.vue';

const store = useUserStore()
const showRestore = ref(false)
const route = useRoute()


console.log(route.params.id)
console.log(store.user)
watch(() => route.params.id, 
    async (id) => {
        await store.loadUser(id);
        await store.loadLogs(id)
    })


const changeStatus = async (status) => {
    await store.changeStatus(route.params.id, status)
}

const changeRole = async (role) => {
    await store.changeRole(route.params.id, role)
}

const restore = async () => {
    await store.restore(route.params.id);
    showRestore.value = false
}
console.log(route.params.id)

const getLogs = async () => {
    await store.loadLogs(route.params.id)
}

onMounted(async () => {
    try{
        await store.loadUser(route.params.id);
        // await store.loadLogs(route.params.id);
    }catch(err){
        console.log(err.message)
    }
})



</script>

<template>
    <div>
         <UserProfileCard v-if="store.user"
         :user="store.user" />

         <StatusDropdown v-if="store.user"
         :status="store.user?.status" 
         @change="changeStatus"/>

         <RoleDropdown v-if="store.user"
         :role="store.user?.role" />

         <ActivityTimeline v-if="store.user"
         :logs="store.logs"/>

         <button @click="showRestore = true">Restore</button>
         <RestoreDialog
         :show="showRestore"
         @restore="restore"
         @close="showRestore = false" />

         <button class="bg-blue-500 text-white p-1 m-1 rounded-sm"  
                @click="getLogs">Refresh Logs</button>
    </div>
</template>