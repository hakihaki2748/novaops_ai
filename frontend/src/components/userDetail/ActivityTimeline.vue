<script setup>
const props = defineProps({
    logs: {
        type: Array,
        default: () => [],
    },

    loading:{
        type: Boolean, 
        default: false
    },

    error: {
        type: String,
        default: null
    }
})

//label saat melakukan action
const eventLabel = (eventType) => {
    const labels = {
        "user.created": "User Created",
        "user.updated": "User Updated",
        "user.role_updated": "Role Updated",
        "user.status_updated": "Status Updated",
        "user.deleted": "User Deleted",
    }

    return labels[eventType] || eventType || "Activity"
}

const eventColor = (eventType) => {
    if(eventType?.includes("deleted")){
        return "bg-red-500"
    }

    if(eventType?.includes("created")){
        return "bg-emerald-500"
    }

    if(eventType?.includes("role")){
        return "bg-violet-500"
    }

    if(eventType?.includes("status")){
        return "bg-amber-500"
    }

    return "bg-indigo-500"
}


//format tanggal
const formatDate = (value) => {
    if(!value) return "?"

    return new Date(value).toLocaleString("id-ID",{
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}


</script>

<template>

    <section
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >

        <!-- HEADER -->
        <div class="border-b border-slate-100 px-5 py-5 sm:px-6">

            <div class="flex items-center justify-between">

                <div>
                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Audit Trail
                    </p>

                    <h2 class="mt-1 text-lg font-bold text-slate-900">
                        Activity
                    </h2>
                </div>

                <span
                    class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
                >
                    {{ props.logs.length }}
                </span>

            </div>

        </div>

        <!-- LOADING -->
        <div
            v-if="loading"
            class="px-6 py-12 text-center"
        >
            <div
                class="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
            ></div>

            <p class="mt-3 text-xs text-slate-500">
                Loading activity...
            </p>
        </div>

        <!-- ERROR -->
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

            </div>
        </div>

        <!-- EMPTY -->
        <div
            v-else-if="props.logs.length === 0"
            class="px-6 py-12 text-center"
        >

            <div
                class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-lg"
            >
                —
            </div>

            <h3 class="mt-4 text-sm font-semibold text-slate-800">
                No activity yet
            </h3>

            <p class="mt-1 text-xs text-slate-500">
                User actions will appear here.
            </p>

        </div>

        <!-- TIMELINE -->
        <div
            v-else
            class="max-h-[650px] overflow-y-auto px-5 py-6 sm:px-6"
        >

            <div class="relative">

                <!-- LINE -->
                <div
                    class="absolute bottom-0 left-[9px] top-0 w-px bg-slate-200"
                ></div>

                <article
                    v-for="log in props.logs"
                    :key="log.id"
                    class="relative pb-8 pl-8 last:pb-1"
                >

                    <!-- DOT -->
                    <div
                        class="absolute left-0 top-1 h-[19px] w-[19px] rounded-full border-4 border-white shadow-sm"
                        :class="eventColor(log.event_type)"
                    ></div>

                    <div>

                        <div class="flex items-start justify-between gap-3">

                            <div>
                                <h3 class="text-sm font-semibold text-slate-800">
                                    {{ eventLabel(log.event_type) }}
                                </h3>

                                <p
                                    v-if="log.description"
                                    class="mt-1 text-xs leading-relaxed text-slate-500"
                                >
                                    {{ log.description }}
                                </p>
                            </div>

                        </div>

                        <div
                            class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-400"
                        >

                            <span>
                                {{ formatDate(log.created_at) }}
                            </span>

                            <span>•</span>

                            <span class="capitalize">
                                {{ log.actor_role || "system" }}
                            </span>

                        </div>

                    </div>

                </article>

            </div>

        </div>

    </section>

</template>
