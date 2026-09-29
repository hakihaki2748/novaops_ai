<script setup>
import { ref } from 'vue';
const emit = defineEmits(["search"])

const keyword = ref("")

const submitSearch = () => {
    emit("search", keyword.value.trim())
}
</script>


<template>
    <div class="flex flex-col gap-3 sm:flex-row">

        <!-- SEARCH -->
        <div class="relative flex-1">

            <span
                class="pointer-events-none absolute left-4 top-1/3 -translate-y-1/2 text-slate-400 text-4xl"
            >
                ⌕
            </span>

            <input
                v-model="keyword"
                type="search"
                placeholder="Search users by name or email..."
                class="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                @keyup.enter="submitSearch"
            />

        </div>

        <button
            type="button"
            @click="submitSearch"
            class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        >
            Search
        </button>

    </div>
</template>
