<script setup>
import { onMounted, ref } from 'vue';
import { getCustomerHistory } from "@/services/customer.api"

const props = defineProps({
    customerId: {
        type: [String, Number],
        required: true,
        default : () => []
    }
})

const logs = ref("")
const loading = ref(false)
const error = ref(null)

//mengambil history
const loadHistory = async () => {
    try {
        loading.value = true
        error.value = null

        const res = await getCustomerHistory(props.customerId)

        logs.value = res.data.data || []
    } catch (err) {
        error.value =
            err.response?.data?.message || "Gagal Memuat Data"

        logs.value = []
    }finally{
        loading.value = false
    }
}

const eventLabel = (eventType) => {
    const labels = {
        "customer.created": "Customer Created",
        "customer.updated": "Customer Updated",
        "customer.vip_updated": "VIP Updated",
        "customer.segment_updated": "Segment Updated",
        "customer.status_updated": "Status Updated",
        "customer.deleted": "Customer Deleted",
    };


    return labels[eventType] || eventType;
}

const eventColor = (eventType) => {
    if (eventType?.includes("deleted")) "bg-red-500"

    if (eventType?.includes("created")) "bg-emerald-500"

    if (eventType?.includes("vip")) "bg-indigo-500"

    return "bg-indig0-500"
}

const formatDate = (value) => {
    if(!value) "-";
}

</script>

<template>
    <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <!-- Header -->
        <div class="border-b border-slate-100 px-5 py-5">
            <div class="flex items-center justify-between gap-3">
                <div>
                    <h2 class="font-bold text-slate-900">
                        Activity History
                    </h2>

                    <p class="mt-1 text-xs text-slate-500">
                        Customer activity and audit trail
                    </p>
                </div>

                <span
                    class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
                >
                    {{ logs.length }}
                </span>
            </div>
        </div>

        <!-- Loading -->
        <div
            v-if="loading"
            class="p-8 text-center"
        >
            <div
                class="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
            ></div>

            <p class="mt-3 text-xs text-slate-500">
                Loading activity...
            </p>
        </div>

        <!-- Error -->
        <div
            v-else-if="error"
            class="p-5"
        >
            <div class="rounded-xl bg-red-50 p-4">
                <p class="text-sm font-semibold text-red-700">
                    Unable to load activity
                </p>

                <p class="mt-1 text-xs text-red-600">
                    {{ error }}
                </p>

                <button
                    type="button"
                    @click="loadHistory"
                    class="mt-3 text-xs font-semibold text-red-700 underline"
                >
                    Try again
                </button>
            </div>
        </div>

        <!-- Empty -->
        <div
            v-else-if="logs.length === 0"
            class="p-8 text-center"
        >
            <div
                class="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100"
            >
                —
            </div>

            <p class="mt-3 text-sm font-medium text-slate-700">
                No activity yet
            </p>

            <p class="mt-1 text-xs text-slate-500">
                Customer activity will appear here.
            </p>
        </div>

        <!-- Timeline -->
        <div
            v-else
            class="max-h-[620px] overflow-y-auto px-5 py-5"
        >
            <div class="relative">

                <!-- Vertical line -->
                <div
                    class="absolute bottom-0 left-[9px] top-0 w-px bg-slate-200"
                ></div>

                <div
                    v-for="log in logs"
                    :key="log.id"
                    class="relative pb-7 pl-8 last:pb-1"
                >

                    <!-- Dot -->
                    <div
                        class="absolute left-0 top-1 h-[19px] w-[19px] rounded-full border-4 border-white shadow-sm"
                        :class="eventColor(log.event_type)"
                    ></div>

                    <div>
                        <div class="flex flex-col gap-1">
                            <p class="text-sm font-semibold text-slate-800">
                                {{ eventLabel(log.event_type) }}
                            </p>

                            <p class="text-xs leading-relaxed text-slate-500">
                                {{ log.description }}
                            </p>
                        </div>

                        <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                            <span>
                                {{ formatDate(log.created_at) }}
                            </span>

                            <span>
                                •
                            </span>

                            <span class="capitalize">
                                {{ log.actor_role }}
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </section>
</template>
