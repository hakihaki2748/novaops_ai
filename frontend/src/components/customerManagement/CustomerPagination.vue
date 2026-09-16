<script setup>
import { computed } from "vue";

const props = defineProps({
    page: {
        type: Number,
        default: 1
    },

    totalPages: {
        type: Number,
        default: 0
    },

    total: {
        type: Number,
        default: 0
    },

    limit: {
        type: Number,
        default: 10
    }
});

const emit = defineEmits([
    "change"
]);

const start = computed(() => {

    if (props.total === 0) {
        return 0;
    }

    return ((props.page - 1) * props.limit) + 1;
});

const end = computed(() => {

    return Math.min(
        props.page * props.limit,
        props.total
    );
});

const visiblePages = computed(() => {

    if (props.totalPages <= 0) {
        return [];
    }

    const pages = [];

    const startPage =
        Math.max(1, props.page - 2);

    const endPage =
        Math.min(
            props.totalPages,
            props.page + 2
        );

    for (
        let page = startPage;
        page <= endPage;
        page++
    ) {
        pages.push(page);
    }

    return pages;
});

const goTo = (page) => {

    if (
        page < 1 ||
        page > props.totalPages ||
        page === props.page
    ) {
        return;
    }

    emit("change", page);
};
</script>

<template>
    <div
        
        class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
        <p class="text-sm text-slate-500">
            Showing
            <span class="font-semibold text-slate-700">
                {{ start }}–{{ end }}
            </span>
            of
            <span class="font-semibold text-slate-700">
                {{ total }}
            </span>
            customers
        </p>

        <div class="flex items-center gap-1">
            <button
                @click="goTo(page - 1)"
                :disabled="page === 1"
                class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>

            <button
                v-for="pageNumber in visiblePages"
                :key="pageNumber"
                @click="goTo(pageNumber)"
                class="h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition"
                :class="
                    pageNumber === page
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                "
            >
                {{ pageNumber }}
            </button>

            <button
                @click="goTo(page + 1)"
                :disabled="page === totalPages"
                class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </div>
    </div>
</template>
