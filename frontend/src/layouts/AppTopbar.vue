<script setup>
import { Menu, Bell, Search } from "lucide-vue-next"

defineProps({
    title: {
        type: String,
        default: "Dashboard",
    },
});


const emit = defineEmits(["toggle-sidebar"])

</script>

<template>

    <header
        class="
            sticky top-0 z-30
            flex h-20
            items-center justify-between
            border-b border-slate-200
            bg-white/90
            px-4
            backdrop-blur-xl
            sm:px-6
            lg:px-8
        "
    >

        <!-- Left -->
        <div class="flex items-center gap-3">

            <!-- Mobile Menu -->
            <button
                type="button"
                class="
                    rounded-xl p-2
                    text-slate-500
                    hover:bg-slate-100
                    hover:text-slate-800
                    lg:hidden
                "
                @click="emit('toggle-sidebar')"
            >
                <Menu :size="22" />
            </button>


            <div>

                <h1
                    class="text-lg font-bold tracking-tight text-slate-900"
                >
                    {{ title }}
                </h1>

                <p
                    class="hidden text-xs text-slate-400 sm:block"
                >
                    Manage your business from one place
                </p>

            </div>

        </div>


        <!-- Right -->
        <div class="flex items-center gap-2 sm:gap-4">

            <!-- Search -->
            <button
                type="button"
                class="
                    hidden items-center gap-2
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-3 py-2
                    text-xs text-slate-400
                    transition
                    hover:border-slate-300
                    hover:bg-white
                    sm:flex
                "
            >

                <Search :size="16" />

                <span>
                    Search
                </span>

                <kbd
                    class="rounded bg-white px-1.5 py-0.5 text-[10px] text-slate-400 shadow-sm"
                >
                    /
                </kbd>

            </button>


            <!-- Notification -->
            <button
                type="button"
                class="
                    relative
                    rounded-xl
                    p-2.5
                    text-slate-500
                    transition
                    hover:bg-slate-100
                    hover:text-slate-800
                "
            >

                <Bell :size="19" />

                <span
                    class="
                        absolute right-2 top-2
                        h-1.5 w-1.5
                        rounded-full
                        bg-red-500
                    "
                />

            </button>


            <!-- Avatar -->
            <button
                type="button"
                class="
                    flex items-center gap-2
                    rounded-xl
                    p-1.5
                    transition
                    hover:bg-slate-100
                "
            >

                <div
                    class="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        bg-indigo-100
                        text-sm font-bold
                        text-indigo-700
                    "
                >
                    H
                </div>

                <div class="hidden text-left md:block">

                    <p
                        class="text-xs font-semibold text-slate-800"
                    >
                        Haki
                    </p>

                    <p
                        class="text-[10px] text-slate-400"
                    >
                        Owner
                    </p>

                </div>

            </button>

        </div>

    </header>

</template>
