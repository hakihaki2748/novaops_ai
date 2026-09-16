<script setup>
import { ref } from 'vue';

const emit = defineEmits(["search", "filter", "sort", "reset"])

const search = ref("")
const status = ref("")
const segment = ref("")
const isVip = ref("")
const sort = ref("created_at")
const order = ref("desc")

let searchTimer = null

const handleSearch = () =>
{
    clearTimeout(searchTimeout);

    searchTimer = setTimeout(() =>
    {
        emit("search", search.value)
    }, 400)
};

const handleFilter = () =>
{
    emit("sort", sort.value, order.value)
}

const reset = () =>
{
    search.value = ""
    status.value = ""
    segment.value = ""
    isVip.value = ""
    sort.value = "created_at"
    order.value = "desc"

    emit("reset")
}


</script>

<template>
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-col gap-4">
            <!-- Search -->
            <div class="relative">
                <svg class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
                </svg>
                <input v-model="search" @input="handleSearch" type="text" placeholder="Search customers by name, email or phone..." class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />
            </div>
            <!-- Filters -->
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <select v-model="status" @change="handleFilter" class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                </select>
                <select v-model="segment" @change="handleFilter" class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" >
                    <option value="">All Segments</option>
                    <option value="retail">Retail</option>
                    <option value="startup">Startup</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="government">Government</option>
                </select>
                <select v-model="isVip" @change="handleFilter" class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" >
                    <option value="">All Customers</option>
                    <option value="true">VIP Only</option>
                    <option value="false">Non VIP</option>
                </select>
                <select v-model="sort" @change="handleSort" class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" >
                    <option value="created_at">Created Date</option>
                    <option value="updated_at">Updated Date</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="id">ID</option>
                </select>
                <select v-model="order" @change="handleSort" class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>
            <!-- Reset -->
            <div class="flex justify-end">
                <button @click="reset" type="button" class="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800" >
                Reset filters </button>
            </div>
        </div>
    </div>
</template>