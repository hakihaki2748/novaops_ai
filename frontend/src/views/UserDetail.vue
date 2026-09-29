<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";

import UserProfileCard from "@/components/userDetail/UserProfileCard.vue";
import ActivityTimeline from "@/components/userDetail/ActivityTimeline.vue";
import StatusDropdown from "@/components/userDetail/StatusDropdown.vue";
import RoleDropdown from "@/components/userDetail/RoleDropdown.vue";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const userId = Number(route.params.id);

const goBack = () => {
    router.push({
        name: "users",
    });
};

const loadDetail = async () => {
    if (!Number.isInteger(userId) || userId <= 0) {
        goBack();
        return;
    }

    try {
        await userStore.loadUser(userId);
        await userStore.loadLogs(userId);
    } catch (error) {
        console.error("Failed to load user detail:", error);
    }
};

const changeStatus = async (status) => {
    try {
        await userStore.updateStatus(userId, status);
        await userStore.loadUser(userId);
        await userStore.loadLogs(userId);
    } catch (error) {
        console.error("Failed to update user status:", error);
    }
};

const changeRole = async (role) => {
    try {
        await userStore.updateRole(userId, role);
        await userStore.loadUser(userId);
        await userStore.loadLogs(userId);
    } catch (error) {
        console.error("Failed to update user role:", error);
    }
};

onMounted(loadDetail);
</script>

<template>
    <div class="min-h-screen bg-slate-50">

        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            <!-- Header -->
            <div class="mb-6">

                <button
                    type="button"
                    @click="goBack"
                    class="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                >
                    <span class="text-lg">←</span>
                    Back to Users
                </button>

                <p
                    class="text-sm font-semibold uppercase tracking-wider text-indigo-600"
                >
                    User Management
                </p>

                <h1
                    class="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                >
                    User Detail
                </h1>

                <p class="mt-1 text-sm text-slate-500">
                    View account information, permissions and activity history.
                </p>

            </div>

            <!-- Loading -->
            <div
                v-if="userStore.loadingDetail"
                class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
            >
                <div
                    class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
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

                <div class="mt-4 flex gap-3">

                    <button
                        type="button"
                        @click="loadDetail"
                        class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        Try Again
                    </button>

                    <button
                        type="button"
                        @click="goBack"
                        class="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                    >
                        Back to Users
                    </button>

                </div>
            </div>

            <!-- Not Found -->
            <div
                v-else-if="!userStore.user"
                class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"
            >
                <div
                    class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl"
                >
                    👤
                </div>

                <h2 class="mt-4 font-semibold text-slate-800">
                    User not found
                </h2>

                <p class="mt-1 text-sm text-slate-500">
                    The requested user does not exist or is no longer available.
                </p>

                <button
                    type="button"
                    @click="goBack"
                    class="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    Back to Users
                </button>
            </div>

            <!-- Content -->
            <template v-else>

                <div class="grid gap-6 lg:grid-cols-3">

                    <!-- Main -->
                    <div class="space-y-6 lg:col-span-2">

                        <!-- Profile -->
                        <UserProfileCard
                            :user="userStore.user"
                        />

                        <!-- Account Information -->
                        <div
                            class="grid gap-6 md:grid-cols-2"
                        >

                            <!-- Status -->
                            <section
                                class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >

                                <div class="mb-4">

                                    <p
                                        class="text-xs font-semibold uppercase tracking-wider text-slate-400"
                                    >
                                        Account Status
                                    </p>

                                    <h2
                                        class="mt-1 text-lg font-bold text-slate-900"
                                    >
                                        User Status
                                    </h2>

                                </div>

                                <StatusDropdown
                                    :status="userStore.user.status"
                                    @change="changeStatus"
                                />

                            </section>

                            <!-- Role -->
                            <section
                                class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >

                                <div class="mb-4">

                                    <p
                                        class="text-xs font-semibold uppercase tracking-wider text-slate-400"
                                    >
                                        Access Control
                                    </p>

                                    <h2
                                        class="mt-1 text-lg font-bold text-slate-900"
                                    >
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