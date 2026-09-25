<script setup>
const { customer } = defineProps({
    customer: {
        type: Object,
        require: true,
        default: {}
    },
})


const formatDate = (value) => {
    if (!value) return "-";

    //untuk merubah format tanggal yg masuk ke parameter
    return new Date(value).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    })
}


</script>

<template>
    <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <!-- Profile Header -->
        <div class="bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 px-6 py-7 sm:px-8">
            <div class="flex flex-col gap-5 sm:flex-row sm:items-center">

                <div
                    class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white ring-1 ring-white/30"
                >
                    {{ customer.name?.charAt(0)?.toUpperCase() }}
                </div>

                <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                        <h2 class="truncate text-2xl font-bold text-white">
                            {{ customer.name }}
                        </h2>

                        <span
                            v-if="customer.is_vip"
                            class="rounded-full bg-amber-300 px-2.5 py-1 text-xs font-bold text-amber-950"
                        >
                            VIP
                        </span>
                    </div>

                    <p class="mt-1 truncate text-sm text-indigo-100">
                        {{ customer.email }}
                    </p>
                </div>

            </div>
        </div>

        <!-- Information -->
        <div class="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">

            <div class="p-6">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone
                </p>

                <p class="mt-2 font-medium text-slate-800">
                    {{ customer.phone || "Not provided" }}
                </p>
            </div>

            <div class="p-6">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Customer ID
                </p>

                <p class="mt-2 font-mono font-medium text-slate-800">
                    #{{ customer.id }}
                </p>
            </div>

        </div>

        <!-- Tags -->
        <div class="border-t border-slate-100 px-6 py-5 sm:px-8">
            <div class="flex flex-wrap gap-2">

                <span
                    class="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold capitalize text-indigo-700"
                >
                    {{ customer.segment }}
                </span>

                <span
                    class="rounded-full px-3 py-1.5 text-xs font-semibold capitalize"
                    :class="
                        customer.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                    "
                >
                    {{ customer.status }}
                </span>

                <span
                    v-if="customer.deleted_at"
                    class="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
                >
                    Deleted
                </span>

            </div>
        </div>

        <!-- Dates -->
        <div class="grid gap-4 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:grid-cols-2 sm:px-8">

            <div>
                <p class="text-xs font-medium text-slate-400">
                    Created
                </p>

                <p class="mt-1 text-sm font-medium text-slate-700">
                    {{ formatDate(customer.created_at) }}
                </p>
            </div>

            <div>
                <p class="text-xs font-medium text-slate-400">
                    Last Updated
                </p>

                <p class="mt-1 text-sm font-medium text-slate-700">
                    {{ formatDate(customer.updated_at) }}
                </p>
            </div>

        </div>

    </section>
</template>