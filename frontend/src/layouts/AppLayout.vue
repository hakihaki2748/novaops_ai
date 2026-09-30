<script setup>
import { computed, ref } from 'vue';
import { useRoute, RouterView } from 'vue-router';

import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

const route = useRoute();

const sidebarOpen = ref(false);

const pageTitle = computed(() => {
    const titles = {
        dashboard: "Dashboard",
        users: "Users",
        user_detail: "User Detail",
        customers: "Customers",
        customer_detail: "Customer Detail"
    }

    return titles[route.name] || "NovaoOps AI"
})

const closeSidebar = () => {
    sidebarOpen.value = false;
}

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}

</script>

<template>

    <div class="min-h-screen bg-slate-50">

        <div class="flex min-h-screen">

            <!-- Sidebar -->
            <AppSidebar
                :mobile-open="sidebarOpen"
                @close="closeSidebar"
            />


            <!-- Main -->
            <div class="flex min-w-0 flex-1 flex-col">

                <AppTopbar
                    :title="pageTitle"
                    @toggle-sidebar="toggleSidebar"
                />


                <!-- Page -->
                <main class="min-w-0 flex-1">

                    <RouterView />

                </main>

            </div>

        </div>

    </div>

</template>
