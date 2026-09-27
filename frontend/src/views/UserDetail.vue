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

const loadDetail = async () => {
    await userStore.loadUser(route.params.id);
    await userStore.loadLogs(route.params.id)
}

onMounted(loadDetail)



</script>

<template>
    <div class="min-h-screen bg-slate-50">

        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            <!-- Header -->
            <div class="mb-6">

                <router-link
                    :to="{ name: 'users' }"
                    class="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                >
                    <span>←</span>
                    Back to Users
                </router-link>

                <div>
                    <p class="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        User Management
                    </p>

                    <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        User Detail
                    </h1>

                    <p class="mt-1 text-sm text-slate-500">
                        Manage account information, permissions and activity.
                    </p>
                </div>

            </div>

            <!-- Loading -->
            <div
                v-if="userStore.loadingDetail"
                class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
            >
                <div
                    class="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
                ></div>

                <p class="mt-4 text-sm text-slate-500">
                    Loading user...
                </p>
            </div>

            <!-- Error -->
            <div
                v-else-if="userStore.errorDetail"
                class="rounded-2xl border border-red-200 bg-red-50 p-6"
            >
                <h2 class="font-semibold text-red-800">
                    Unable to load user
                </h2>

                <p class="mt-1 text-sm text-red-600">
                    {{ userStore.errorDetail }}
                </p>

                <button
                    type="button"
                    @click="retryLoad(route.params.id)"
                    class="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>

            <!-- Not Found -->
            <div
                v-else-if="!userStore.user"
                class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"
            >
                <h2 class="font-semibold text-slate-800">
                    User not found
                </h2>

                <p class="mt-1 text-sm text-slate-500">
                    The requested user does not exist.
                </p>

                <router-link
                    :to="{ name: 'users' }"
                    class="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                    Back to Users
                </router-link>
            </div>

            <!-- Content -->
            <template v-else>

                <div class="grid gap-6 lg:grid-cols-3">

                    <!-- User -->
                    <div class="space-y-6 lg:col-span-2">

                        <UserProfileCard
                            :user="userStore.user"
                        />

                        <div class="grid gap-6 md:grid-cols-2">

                            <!-- Status -->
                            <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <div class="mb-4">
                                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Account Status
                                    </p>

                                    <h2 class="mt-1 text-lg font-bold text-slate-900">
                                        User Status
                                    </h2>
                                </div>

                                <StatusDropdown
                                    :status="userStore.user.status"
                                    @change="changeStatus"
                                />

                            </section>

                            <!-- Role -->
                            <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <div class="mb-4">
                                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Access Control
                                    </p>

                                    <h2 class="mt-1 text-lg font-bold text-slate-900">
                                        User Role
                                    </h2>
                                </div>

                                <RoleDropdown
                                    :role="userStore.user.role"
                                    @change="changeRole"
                                />

                            </section>

                        </div>

                    </div>

                    <!-- Activity -->
                    <aside class="lg:col-span-1">

                        <ActivityTimeline
                            :logs="userStore.logs"
                            :loading="userStore.loadingLogs"
                            :error="userStore.errorLogs"
                        />

                    </aside>

                </div>

            </template>

        </div>

    </div>
</template>