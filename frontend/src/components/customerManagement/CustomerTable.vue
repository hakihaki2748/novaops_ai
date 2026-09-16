<script setup>
defineProps({
    customers: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits([
    "detail"
]);
</script>

<template>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead class="border-b border-slate-200 bg-slate-50">
                    <tr>
                        <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Customer
                        </th>

                        <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Contact
                        </th>

                        <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Segment
                        </th>

                        <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Status
                        </th>

                        <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            VIP
                        </th>

                        <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr
                        v-for="customer in customers"
                        :key="customer.id"
                        class="transition hover:bg-slate-50"
                    >
                        <!-- Customer -->

                        <td class="whitespace-nowrap px-6 py-4">
                            <div class="flex items-center gap-3">
                                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-600">
                                    {{ customer.name?.charAt(0)?.toUpperCase() }}
                                </div>

                                <div>

                                    <p class="font-semibold text-slate-800">
                                        {{ customer.name }}
                                    </p>

                                    <p class="text-xs text-slate-400">
                                        #{{ customer.id }}
                                    </p>

                                </div>
                            </div>
                        </td>

                        <!-- Contact -->
                        <td class="px-6 py-4">
                            <p class="text-sm text-slate-700">
                                {{ customer.email }}
                            </p>

                            <p class="mt-1 text-xs text-slate-400">
                                {{ customer.phone || "No phone" }}
                            </p>
                        </td>

                        <!-- Segment -->
                        <td class="px-6 py-4">
                            <span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
                                {{ customer.segment }}
                            </span>
                        </td>

                        <!-- Status -->
                        <td class="px-6 py-4">
                            <span
                                class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                                :class="{
                                    'bg-emerald-50 text-emerald-700':
                                        customer.status === 'active',

                                    'bg-amber-50 text-amber-700':
                                        customer.status === 'inactive',

                                    'bg-red-50 text-red-700':
                                        customer.status === 'suspended'
                                }"
                            >

                                <span class="h-1.5 w-1.5 rounded-full bg-current"></span>

                                {{ customer.status }}

                            </span>
                        </td>

                        <!-- VIP -->
                        <td class="px-6 py-4">
                            <span
                                v-if="customer.is_vip"
                                class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                            >
                                ★ VIP
                            </span>

                            <span
                                v-else
                                class="text-xs text-slate-400"
                            >
                                Standard
                            </span>
                        </td>

                        <!-- Action -->
                        <td class="px-6 py-4 text-right">
                            <button
                                @click="emit('detail', customer.id)"
                                class="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                            >
                                View
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
