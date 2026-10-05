<script setup>
const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    }
})

//memberi nama initials jika avatar tanpa foto
const initials = (name) => {
    if (!name) return "?"

    return name
        .split(" ")
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
}

const formatDate = (value) => {
    if (!value) return "-"

    return new Date(value).toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

//memberi warna pada role
const roleClass = (role) => {
    const classes = {
        owner: "bg-violet-100 text-violet-700",
        manager: "bg-blue-100 text-blue-700",
        admin: "bg-indigo-100 text-indigo-700",
        user: "bg-slate-100 text-slate-700",
    };

    return classes[role] || classes.user
}

//memberi warna pada status
const statusClass = (status) => {
    if (status === "active") {
        return "bg-emerald-100 text-emerald-700"
    }

    if(status === "blocked"){
        return "bg-red-100 text-red-700"
    }

    return "bg-amber-100 text-amber-700"
}



</script>

<template>

    <section
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >

        <!-- HERO -->
        <div
            class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-800 px-6 py-7 sm:px-8"
        >

            <!-- Decorative -->
            <div
                class="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/5"
            ></div>

            <div
                class="absolute -bottom-20 right-24 h-48 w-48 rounded-full bg-indigo-400/10"
            ></div>

            <div class="relative flex flex-col gap-5 sm:flex-row sm:items-center">

                <!-- Avatar -->
                <div
                    class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold text-white ring-1 ring-white/20 backdrop-blur"
                >
                    {{ initials(user.name) }}
                </div>

                <div class="min-w-0">

                    <div class="flex flex-wrap items-center gap-2">

                        <h2
                            class="truncate text-2xl font-bold tracking-tight text-white"
                        >
                            {{ user.name }}
                        </h2>

                        <span
                            class="rounded-full px-2.5 py-1 text-[11px] font-bold capitalize"
                            :class="roleClass(user.role)"
                        >
                            {{ user.role }}
                        </span>

                    </div>

                    <p class="mt-1 truncate text-sm text-indigo-100">
                        {{ user.email }}
                    </p>

                    <div class="mt-3 flex flex-wrap items-center gap-2">

                        <span
                            class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize"
                            :class="statusClass(user.status)"
                        >
                            <span
                                class="h-1.5 w-1.5 rounded-full bg-current"
                            ></span>

                            {{ user.status }}
                        </span>

                        <span
                            v-if="user.company_name"
                            class="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-indigo-100"
                        >
                            {{ user.company_name }}
                        </span>

                    </div>

                </div>

            </div>

        </div>

        <!-- INFORMATION -->
        <div class="grid sm:grid-cols-2">

            <div class="border-b border-slate-100 p-6 sm:border-r">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                </p>

                <p class="mt-2 break-all text-sm font-medium text-slate-800">
                    {{ user.email || "-" }}
                </p>
            </div>

            <div class="border-b border-slate-100 p-6">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone
                </p>

                <p class="mt-2 text-sm font-medium text-slate-800">
                    {{ user.phone || "Not provided" }}
                </p>
            </div>

            <div class="border-b border-slate-100 p-6 sm:border-r sm:border-b-0">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    User ID
                </p>

                <p class="mt-2 font-mono text-sm font-medium text-slate-800">
                    #{{ user.id }}
                </p>
            </div>

            <div class="p-6">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Company
                </p>

                <p class="mt-2 text-sm font-medium text-slate-800">
                    {{ user.company_name || "—" }}
                </p>
            </div>

        </div>

        <!-- FOOTER -->
        <div
            class="grid gap-4 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:grid-cols-2 sm:px-8"
        >

            <div>
                <p class="text-xs font-medium text-slate-400">
                    Created
                </p>

                <p class="mt-1 text-sm font-medium text-slate-700">
                    {{ formatDate(user.created_at) }}
                </p>
            </div>

            <div>
                <p class="text-xs font-medium text-slate-400">
                    Last Updated
                </p>

                <p class="mt-1 text-sm font-medium text-slate-700">
                    {{ formatDate(user.updated_at) }}
                </p>
            </div>

        </div>

    </section>

</template>

