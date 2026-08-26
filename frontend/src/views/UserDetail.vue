<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user.store';

import UserProfileCard from '@/components/userDetail/UserProfileCard.vue';
import StatusDropdown from '@/components/userDetail/StatusDropdown.vue';
import RoleDropdown from '@/components/userDetail/RoleDropdown.vue';
import ActivityTimeline from '@/components/userDetail/ActivityTimeline.vue';

const userStore = useUserStore()
const route = useRoute()


const changeStatus = async (status) => {
    await userStore.updateStatus(route.params.id, status)
}

const changeRole = async (role) => {
    await userStore.updateRole(route.params.id, role)
}

const retryLoad = async (id) => {
    await userStore.loadUser(id)
}

onMounted(async () => {
        await userStore.loadUser(route.params.id);
})



</script>

<template>
    <div>
        <div v-if="userStore.loadingDetail">
            Loading Detail...
        </div>

        <div v-if="userStore.errorDetail">
            <div>Error....</div>
            <button @click="retryLoad(route.params.id)">Retry</button>
        </div>
        <div v-if="!userStore.loadingDetail && !userStore.errorDetail && !userStore.user">
            User Not Found
        </div>

         <UserProfileCard v-if="userStore.user"
         :user="userStore.user" />

         <StatusDropdown v-if="userStore.user"
         :status="userStore.user?.status" 
         @change="changeStatus"/>

         <RoleDropdown v-if="userStore.user"
         :role="userStore.user?.role" 
         @change="changeRole"/>

         <ActivityTimeline v-if="userStore.user"
         :logs="userStore.logs"/>
    </div>
</template>