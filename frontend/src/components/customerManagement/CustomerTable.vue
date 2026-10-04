<script setup>
const props = defineProps({
    customers: {
        type: Array,
        default: () => []
    }
});


const emit = defineEmits([
    "detail",
    "edit",
    "update-vip",
    "update-segment",
    "update-status",
    "delete"
]);
</script>

<template>

    <div
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >

        <div class="overflow-x-auto">

            <table class="min-w-[900px] w-full">

                <!-- Header -->

                <thead class="border-b border-slate-200 bg-slate-50">

                    <tr>

                        <th
                            class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                        >
                            Customer
                        </th>

                        <th
                            class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                        >
                            Contact
                        </th>

                        <th
                            class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                        >
                            Segment
                        </th>

                        <th
                            class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                        >
                            Status
                        </th>

                        <th
                            class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                        >
                            VIP
                        </th>

                        <th
                            class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"
                        >
                            Action
                        </th>

                    </tr>

                </thead>

                <!-- Body -->

                <tbody class="divide-y divide-slate-100">

                    <tr
                        v-for="customer in customers"
                        :key="customer.id"
                        class="transition hover:bg-slate-50"
                    >

                        <!-- Customer -->

                        <td class="whitespace-nowrap px-6 py-4">

                            <div class="flex items-center gap-3">

                                <div
                                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-600"
                                >
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

                            <select
                                :value="customer.segment"
                                @change="
                                    emit(
                                        'update-segment',
                                        customer,
                                        $event.target.value
                                    )
                                "
                                class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >

                                <option value="retail">
                                    Retail
                                </option>

                                <option value="enterprise">
                                    Enterprise
                                </option>

                                <option value="government">
                                    Government
                                </option>

                                <option value="startup">
                                    Startup
                                </option>

                            </select>

                        </td>

                        <!-- Status -->

                        <td class="px-6 py-4">

                            <select
                                :value="customer.status"
                                @change="
                                    emit(
                                        'update-status',
                                        customer,
                                        $event.target.value
                                    )
                                "
                                class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >

                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                                <option value="suspended">
                                    Suspended
                                </option>

                            </select>

                        </td>

                        <!-- VIP -->

                        <td class="px-6 py-4">

                            <label class="inline-flex cursor-pointer items-center relative">

                                <input
                                    type="checkbox"
                                    :checked="Boolean(customer.is_vip)"
                                    @change="
                                        emit(
                                            'update-vip',
                                            customer,
                                            $event.target.checked
                                        )
                                    "
                                    class="peer sr-only "
                                />

                                <span
                                    class="relative h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-indigo-600"
                                >

                                    <!-- <span
                                        class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"
                                    ></span> -->

                                </span>

                                 <!-- Knob -->
                                <span
                                    class="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5"
                                ></span>


                                <span
                                    class="ml-2 text-xs font-medium text-slate-500"
                                >
                                    {{ customer.is_vip ? "VIP" : "Standard" }}
                                </span>

                            </label>

                        </td>

                        <!-- Action -->

                        <td class="px-6 py-4">

                            <div class="flex justify-end gap-2">

                                <button
                                    @click="emit('detail', customer.id)"
                                    class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                                >
                                    View
                                </button>

                                <button
                                    @click="emit('edit', customer)"
                                    class="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                                >
                                    Edit
                                </button>

                                <button
                                    @click="emit('delete', customer)"
                                    class="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                >
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</template>