<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
    users: {type: Array, default: () => []},
})

const emit = defineEmits(["deleteUser"])

function openDetail (id) {
    router.push({
        name: "user_detail",
        params: { id },
    })
}


function deleteUser (id) {
    emit("deleteUser", id)
}

//menampilkan initial nama pada avatar
const initials = (name) => {
    if(!name) return "?"

    return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

//memformat tanggal yang masuk

const formatDate = (value) => {
    if(!value) return "-";

    return new Date(value).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: numeric
    })
}


const roleClass = (role) => {
    //memilih warna untuk tipe role
    const classes = {
        owner: "bg-violet-50 text-violet-700 ring-violet-200",
        manager: "bg-blue-50 text-blue-700 ring-blue-200",
        admin: "bg-indigo-50 text-indigo-700 ring-indigo-200",
        user: "bg-slate-100 text-indigo-700 ring-indigo-200"
    }

    return classes[role] || classes.user
}


const statusClass = (status) => {
    //membuat class
    if (status === "active") {
        return "bg-emerald-500";
    }

    if (status === "blocked"){
        return "bg-red-500"
    }

    return "bg-amber-500"
}



</script>

<template>
    <div class="w-full">
        <!-- Wrapper agar tabel bisa di-scroll pada layar kecil -->
        <div class="w-full overflow-x-auto">
            <table class="w-full min-w-[640px] text-left">
                <!-- HEADER -->
                <thead>
                    <tr class="border-b border-slate-100 bg-slate-50/70">
                        <th
                            class="px-3 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:px-4 sm:py-4 sm:text-xs lg:px-6"
                        >
                            User
                        </th>

                        <th
                            class="px-3 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:px-4 sm:py-4 sm:text-xs"
                        >
                            Role
                        </th>

                        <th
                            class="px-3 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:px-4 sm:py-4 sm:text-xs"
                        >
                            Status
                        </th>

                        <!-- Hanya tampil di layar lg ke atas -->
                        <th
                            class="hidden px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 lg:table-cell"
                        >
                            Updated
                        </th>

                        <th
                            class="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:px-4 sm:py-4 sm:text-xs lg:px-6"
                        >
                            Action
                        </th>
                    </tr>
                </thead>

                <!-- BODY -->
                <tbody class="divide-y divide-slate-100">
                    <tr
                        v-for="user in props.users"
                        :key="user.id"
                        class="group cursor-pointer transition hover:bg-indigo-50/40"
                        
                    >
                        <!-- USER -->
                        <td class="px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
                            <div class="flex min-w-0 items-center gap-2 sm:gap-3">
                                <!-- Avatar -->
                                <div
                                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white shadow-sm sm:h-10 sm:w-10 sm:rounded-xl sm:text-sm lg:h-11 lg:w-11"
                                >
                                    {{ initials(user.name) }}
                                </div>

                                <!-- User info -->
                                <div class="min-w-0">
                                    <p
                                        class="max-w-[120px] truncate text-xs font-semibold text-slate-800 sm:max-w-[180px] sm:text-sm lg:max-w-none lg:text-base"
                                    >
                                        {{ user.name }}
                                    </p>

                                    <p
                                        class="max-w-[140px] truncate text-[10px] text-slate-500 sm:max-w-[200px] sm:text-xs lg:max-w-none"
                                    >
                                        {{ user.email }}
                                    </p>

                                    <!-- Company hanya tampil mulai sm -->
                                    <p
                                        v-if="user.company_name"
                                        class="mt-0.5 hidden max-w-[200px] truncate text-[11px] text-slate-400 sm:block"
                                    >
                                        {{ user.company_name }}
                                    </p>
                                </div>
                            </div>
                        </td>

                        <!-- ROLE -->
                        <td class="px-3 py-3 sm:px-4 sm:py-4">
                            <span
                                class="inline-flex rounded-md px-2 py-1 text-[10px] font-semibold capitalize ring-1 ring-inset sm:rounded-lg sm:px-2.5 sm:text-xs"
                                :class="roleClass(user.role)"
                            >
                                {{ user.role }}
                            </span>
                        </td>

                        <!-- STATUS -->
                        <td class="px-3 py-3 sm:px-4 sm:py-4">
                            <div class="inline-flex items-center gap-1.5 sm:gap-2">
                                <span
                                    class="h-1.5 w-1.5 shrink-0 rounded-full sm:h-2 sm:w-2"
                                    :class="statusClass(user.status)"
                                ></span>

                                <span
                                    class="text-[10px] font-medium capitalize text-slate-700 sm:text-xs lg:text-sm"
                                >
                                    {{ user.status }}
                                </span>
                            </div>
                        </td>

                        <!-- UPDATED -->
                        <td
                            class="hidden px-4 py-4 lg:table-cell"
                        >
                            <span class="text-sm text-slate-500">
                                {{ formatDate(user.updated_at) }}
                            </span>
                        </td>

                        <!-- ACTION -->
                        <td
                            class="px-3 py-3 text-right sm:px-4 sm:py-4 lg:px-6"
                        >
                            <button
                                type="button"
                                @click.stop="openDetail(user.id)"
                                class="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-indigo-600 hover:shadow-sm sm:px-3 sm:py-2 sm:text-sm"
                            >
                                <span class="hidden sm:inline">
                                    View
                                </span>

                                <span>
                                    →
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
