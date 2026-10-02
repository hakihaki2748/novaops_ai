<script setup>
import { useUserStore } from '@/stores/user.store';
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import UserSearch from '@/components/userManagement/UserSearch.vue';
import UserTable from '@/components/userManagement/UserTable.vue';
import UserPagination from '@/components/userManagement/UserPagination.vue';
import UserForm from '@/components/userDetail/UserForm.vue';

const userStore = useUserStore();

const showAddUser = ref(false)

const closeAddUser = () => {
    showAddUser.value = false
}

const userCreated = (user) => {
    showAddUser.value = false
}



const router = useRouter()

const searchUser = async (keywoard) => {
    await userStore.setSearch(keywoard)
}

const changePage = async (page) => {
    await userStore.setPage(page)
}

const detailUser = async (id) => {
    router.push({
        name: "user_detail",
        params: {
            id,
        }
    })
}


const deleteUser = async (id) => {
    await userStore.deleteUser(id)
}

const activeUsers = computed(() => {
    return userStore.users.filter((user) => user.status === "active" ).length
})

const inactiveUsers = computed(() => {
    return userStore.users.filter((user) => user.status !== "active" ).length
})


const refresh = async () => {
    await userStore.loadUsers()
}


onMounted(async () => {
    await userStore.loadUsers()
})


</script>

<template>
    <div class="min-h-screen bg-slate-50">

        <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            <!-- HEADER -->
            <section class="mb-7">

                <div
                    class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div>
                        <div
                            class="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                        >
                            <span class="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                            User Management
                        </div>

                        <h1
                            class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                        >
                            Users
                        </h1>

                        <p class="mt-1 max-w-2xl text-sm text-slate-500">
                            Manage user accounts, roles, access and account status.
                        </p>
                    </div>

                    <button
                        type="button"
                        @click="showAddUser = true"
                        class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"

                    >
                        <span class="text-lg leading-none">+</span>
                        Add User
                    </button>

                    <button
                        type="button"
                        @click="refresh"
                        class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                        <span>↻</span>
                        Refresh
                    </button>
                </div>

            </section>

            <!-- SUMMARY -->
            <section class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div
                    class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Total Users
                    </p>

                    <div class="mt-3 flex items-end justify-between">
                        <p class="text-2xl font-bold text-slate-900">
                            {{ userStore.pagination.total ?? userStore.users.length }}
                        </p>

                        <span class="rounded-lg bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
                            Users
                        </span>
                    </div>
                </div>

                <div
                    class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Active
                    </p>

                    <div class="mt-3 flex items-end justify-between">
                        <p class="text-2xl font-bold text-emerald-600">
                            {{ activeUsers }}
                        </p>

                        <span class="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                            Active
                        </span>
                    </div>
                </div>

                <div
                    class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Inactive
                    </p>

                    <div class="mt-3 flex items-end justify-between">
                        <p class="text-2xl font-bold text-amber-600">
                            {{ inactiveUsers }}
                        </p>

                        <span class="rounded-lg bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                            Inactive
                        </span>
                    </div>
                </div>

            </section>

            <!-- MAIN CARD -->
            <section
                class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >

                <!-- TOOLBAR -->
                <div
                    class="border-b border-slate-100 bg-white px-5 py-5 sm:px-6"
                >
                    <UserSearch
                        @search="searchUser"
                    />
                </div>

                <!-- LOADING -->
                <div
                    v-if="userStore.loading"
                    class="px-6 py-16 text-center"
                >
                    <div
                        class="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
                    ></div>

                    <p class="mt-4 text-sm text-slate-500">
                        Loading users...
                    </p>
                </div>

                <!-- ERROR -->
                <div
                    v-else-if="userStore.error"
                    class="p-6"
                >
                    <div
                        class="rounded-xl border border-red-200 bg-red-50 p-5"
                    >
                        <div class="flex gap-3">

                            <div
                                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600"
                            >
                                !
                            </div>

                            <div>
                                <h3 class="font-semibold text-red-800">
                                    Unable to load users
                                </h3>

                                <p class="mt-1 text-sm text-red-600">
                                    {{ userStore.error }}
                                </p>

                                <button
                                    type="button"
                                    @click="refresh"
                                    class="mt-3 text-sm font-semibold text-red-700 underline"
                                >
                                    Try again
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- EMPTY -->
                <div
                    v-else-if="userStore.users.length === 0"
                    class="px-6 py-16 text-center"
                >
                    <div
                        class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl"
                    >
                        👤
                    </div>

                    <h3 class="mt-4 font-semibold text-slate-800">
                        No users found
                    </h3>

                    <p class="mt-1 text-sm text-slate-500">
                        Try changing your search keyword.
                    </p>
                </div>

                <!-- TABLE -->
                <UserTable
                    v-else
                    :users="userStore.users"
                    @deleteUser="deleteUser"
                    @detailUser="detailUser"
                />

                <!-- PAGINATION -->
                <div
                    v-if="!userStore.loading && userStore.users.length"
                    class="border-t border-slate-100 px-5 py-4 sm:px-6"
                >
                    <UserPagination
                        :page="userStore.pagination.page"
                        :totalPages="userStore.pagination.totalPages"
                        @change="changePage"
                    />
                </div>

            </section>

        </main>
            <UserForm
               :show="showAddUser"
                @close="closeAddUser"
                @userCreated="userCreated"
            />
    </div>

</template>
