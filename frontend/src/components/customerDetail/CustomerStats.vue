<script setup>
const { customer } = defineProps({
    customer: {
        type: Object,
        required: true,
        default: {}
    }
})
</script>

<template>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Segment
            </p>

            <p class="mt-2 text-lg font-bold capitalize text-slate-900">
                {{ customer.segment }}
            </p>

            <p class="mt-1 text-xs text-slate-500">
                Customer classification
            </p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
            </p>

            <p class="mt-2 text-lg font-bold capitalize text-slate-900">
                {{ customer.status }}
            </p>

            <p class="mt-1 text-xs text-slate-500">
                Current customer status
            </p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                VIP
            </p>

            <p class="mt-2 text-lg font-bold text-slate-900">
                {{ customer.is_vip ? "Yes" : "No" }}
            </p>

            <p class="mt-1 text-xs text-slate-500">
                VIP customer status
            </p>
        </div>

    </div>
</template>
