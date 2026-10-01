<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LayoutDashboard, Users, UserRound, Activity, Settings, LogOut, X } from 'lucide-vue-next';

import { getCurrentUser, clearCurrentUser } from '@/utils/userAuth.js';



const props = defineProps({
    mobileOpen: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["close"]);

const route = useRoute();
const router = useRouter();

const currentUser = computed(() => getCurrentUser());

const menuItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        route: "dashboard",
    },

    {
        name: "Customers",
        icon: Users,
        route: "customers",
    },

    {
        name: "Users",
        icon: UserRound,
        route: "users",
    },

    {
        name: "Activity",
        icon: Activity,
        route: null

    },
];

const bottomItems = [
    {
        name: "Settings",
        icon: Settings,
        route: null
    },
];


const isActive = (item) => {
    if (!item.route) return false;

    return route.name === item.route || route.name?.startsWith(`${item.route}_`)
};

const navigate = (item) => {
    if (!item.route) return;

    router.push({
        name: item.route,
    })

    emit("close")
}

const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    router.push({
        name: "login"
    })
}


</script>



<template>
    <div>
        <!-- Mobile Overlay -->
        <Transition name="fade">

            <div
                v-if="mobileOpen"
                class="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
                @click="emit('close')"
            />

        </Transition>

        
        <!-- Sidebar -->
        <aside
            class="
                fixed inset-y-0 left-0 z-50
                flex w-72 flex-col
                border-r border-slate-200
                bg-white
                transition-transform duration-300
                lg:translate-x-0
            "
            :class="mobileOpen ? 'translate-x-0' : '-translate-x-full'"
        >

            <!-- Brand -->
            <div
                class="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6"
            >

                <button
                    class="flex items-center gap-3"
                    @click="router.push({ name: 'dashboard' })"
                >

                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm"
                    >
                        N
                    </div>

                    <div class="text-left">

                        <p
                            class="text-base font-bold tracking-tight text-slate-900"
                        >
                            NovaOps AI
                        </p>

                        <p
                            class="text-[11px] font-medium uppercase tracking-wider text-slate-400"
                        >
                            Business Intelligence
                        </p>

                    </div>

                </button>


                <!-- Mobile Close -->
                <button
                    class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
                    @click="emit('close')"
                >
                    <X :size="20" />
                </button>

            </div>


            <!-- Navigation -->
            <nav class="flex-1 overflow-y-auto px-4 py-6">

                <p
                    class="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                    Workspace
                </p>


                <div class="space-y-1">

                    <button
                        v-for="item in menuItems"
                        :key="item.name"
                        type="button"
                        :disabled="!item.route"
                        @click="navigate(item)"
                        class="
                            group flex w-full items-center gap-3
                            rounded-xl px-3 py-3
                            text-sm font-medium
                            transition
                        "
                        :class="
                            isActive(item)
                                ? 'bg-indigo-50 text-indigo-700'
                                : item.route
                                    ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    : 'cursor-not-allowed text-slate-400'
                        "
                    >

                        <component
                            :is="item.icon"
                            :size="19"
                            :stroke-width="isActive(item) ? 2.2 : 1.9"
                        />

                        <span>
                            {{ item.name }}
                        </span>


                        <!-- Coming Soon -->
                        <span
                            v-if="!item.route"
                            class="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400"
                        >
                            Soon
                        </span>

                    </button>

                </div>


                <!-- Divider -->
                <div class="my-7 border-t border-slate-100" />


                <p
                    class="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                    System
                </p>


                <div class="space-y-1">

                    <button
                        v-for="item in bottomItems"
                        :key="item.name"
                        type="button"
                        class="
                            flex w-full items-center gap-3
                            rounded-xl px-3 py-3
                            text-sm font-medium
                            text-slate-600
                            transition
                            hover:bg-slate-50
                            hover:text-slate-900
                        "
                    >

                        <component
                            :is="item.icon"
                            :size="19"
                        />

                        {{ item.name }}

                        <span
                            class="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400"
                        >
                            Soon
                        </span>

                    </button>

                </div>

            </nav>


            <!-- User / Logout -->
            <div
                class="border-t border-slate-100 p-4"
            >

                <div
                    class="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                >

                    <div
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700"
                    >
                        {{ currentUser?.name?.charAt(0).toUpperCase() || 'U' }}
                    </div>

                    <div class="min-w-0 flex-1">

                        <p
                            class="truncate text-sm font-semibold text-slate-800"
                        >
                            {{ currentUser?.name || 'User' }}
                        </p>

                        <p
                            class="truncate text-xs text-slate-400"
                        >
                            {{ currentUser?.role || 'Role' }}
                        </p>

                    </div>


                    <button
                        type="button"
                        title="Logout"
                        class="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-red-500"
                        @click="logout"
                    >
                        <LogOut :size="17" />
                    </button>

                </div>

            </div>

        </aside>
    </div>
</template>


<style scoped>

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>