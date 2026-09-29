<script setup>
import {
  Users,
  UserRound,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-vue-next";


</script>

<template>

    <div class="min-h-screen bg-slate-50">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            <!-- Header -->
            <div class="mb-8">

                <p
                    class="text-sm font-semibold uppercase tracking-wider text-indigo-600"
                >
                    Overview
                </p>

                <div
                    class="mt-1 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
                >

                    <div>

                        <h1
                            class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                        >
                            Dashboard
                        </h1>

                        <p class="mt-1 text-sm text-slate-500">
                            Overview of your business activity and performance.
                        </p>

                    </div>

                    <div
                        class="text-sm text-slate-400"
                    >
                        Today
                    </div>

                </div>

            </div>


            <!-- KPI -->
            <div
                class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >

                <!-- Revenue -->
                <div
                    class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >

                    <div class="flex items-center justify-between">

                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
                        >
                            <TrendingUp :size="21" />
                        </div>

                        <span
                            class="flex items-center gap-1 text-xs font-semibold text-emerald-600"
                        >
                            <ArrowUpRight :size="14" />
                            12.5%
                        </span>

                    </div>

                    <p class="mt-5 text-sm text-slate-500">
                        Revenue
                    </p>

                    <p class="mt-1 text-2xl font-bold text-slate-900">
                        Rp 0
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                        Compared with previous period
                    </p>

                </div>


                <!-- Customers -->
                <div
                    class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >

                    <div class="flex items-center justify-between">

                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
                        >
                            <Users :size="21" />
                        </div>

                        <span
                            class="text-xs font-semibold text-slate-400"
                        >
                            Customers
                        </span>

                    </div>

                    <p class="mt-5 text-sm text-slate-500">
                        Total Customers
                    </p>

                    <p class="mt-1 text-2xl font-bold text-slate-900">
                        0
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                        Active customers
                    </p>

                </div>


                <!-- Users -->
                <div
                    class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >

                    <div class="flex items-center justify-between">

                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600"
                        >
                            <UserRound :size="21" />
                        </div>

                        <span
                            class="text-xs font-semibold text-slate-400"
                        >
                            Team
                        </span>

                    </div>

                    <p class="mt-5 text-sm text-slate-500">
                        Active Users
                    </p>

                    <p class="mt-1 text-2xl font-bold text-slate-900">
                        0
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                        Members in your company
                    </p>

                </div>


                <!-- Activity -->
                <div
                    class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >

                    <div class="flex items-center justify-between">

                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600"
                        >
                            <Activity :size="21" />
                        </div>

                        <span
                            class="text-xs font-semibold text-slate-400"
                        >
                            Activity
                        </span>

                    </div>

                    <p class="mt-5 text-sm text-slate-500">
                        Recent Activities
                    </p>

                    <p class="mt-1 text-2xl font-bold text-slate-900">
                        0
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                        Activity recorded today
                    </p>

                </div>

            </div>


            <!-- Main Dashboard -->
            <div
                class="mt-6 grid gap-6 xl:grid-cols-3"
            >

                <!-- Sales Chart -->
                <section
                    class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2"
                >

                    <div
                        class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                    >

                        <div>

                            <p
                                class="text-xs font-semibold uppercase tracking-wider text-slate-400"
                            >
                                Performance
                            </p>

                            <h2
                                class="mt-1 text-lg font-bold text-slate-900"
                            >
                                Sales Overview
                            </h2>

                        </div>

                        <select
                            class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        >
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                        </select>

                    </div>


                    <!-- Chart Placeholder -->
                    <div
                        class="mt-6 flex h-72 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50"
                    >

                        <div class="text-center">

                            <TrendingUp
                                :size="32"
                                class="mx-auto text-slate-300"
                            />

                            <p
                                class="mt-3 text-sm font-medium text-slate-500"
                            >
                                Sales chart
                            </p>

                            <p
                                class="mt-1 text-xs text-slate-400"
                            >
                                Sales analytics will appear here.
                            </p>

                        </div>

                    </div>

                </section>


                <!-- Action Center -->
                <section
                    class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                    <div>

                        <p
                            class="text-xs font-semibold uppercase tracking-wider text-slate-400"
                        >
                            Decision Support
                        </p>

                        <h2
                            class="mt-1 text-lg font-bold text-slate-900"
                        >
                            Action Center
                        </h2>

                        <p
                            class="mt-1 text-sm text-slate-500"
                        >
                            Things that may need your attention.
                        </p>

                    </div>


                    <div class="mt-6 space-y-3">

                        <!-- Pending -->
                        <div
                            class="flex gap-3 rounded-xl border border-slate-200 p-4"
                        >

                            <Clock
                                :size="19"
                                class="mt-0.5 shrink-0 text-amber-500"
                            />

                            <div>

                                <p
                                    class="text-sm font-semibold text-slate-800"
                                >
                                    Pending actions
                                </p>

                                <p
                                    class="mt-1 text-xs leading-5 text-slate-500"
                                >
                                    Follow-ups and tasks requiring attention will appear here.
                                </p>

                            </div>

                        </div>


                        <!-- Alert -->
                        <div
                            class="flex gap-3 rounded-xl border border-slate-200 p-4"
                        >

                            <AlertCircle
                                :size="19"
                                class="mt-0.5 shrink-0 text-orange-500"
                            />

                            <div>

                                <p
                                    class="text-sm font-semibold text-slate-800"
                                >
                                    Business alerts
                                </p>

                                <p
                                    class="mt-1 text-xs leading-5 text-slate-500"
                                >
                                    Important customer and business signals will appear here.
                                </p>

                            </div>

                        </div>


                        <!-- Completed -->
                        <div
                            class="flex gap-3 rounded-xl border border-slate-200 p-4"
                        >

                            <CheckCircle2
                                :size="19"
                                class="mt-0.5 shrink-0 text-emerald-500"
                            />

                            <div>

                                <p
                                    class="text-sm font-semibold text-slate-800"
                                >
                                    Completed
                                </p>

                                <p
                                    class="mt-1 text-xs leading-5 text-slate-500"
                                >
                                    Recently completed activities will appear here.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

            </div>


            <!-- Activity Summary -->
            <section
                class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >

                <div
                    class="flex items-center justify-between"
                >

                    <div>

                        <p
                            class="text-xs font-semibold uppercase tracking-wider text-slate-400"
                        >
                            Activity
                        </p>

                        <h2
                            class="mt-1 text-lg font-bold text-slate-900"
                        >
                            Recent Activity
                        </h2>

                    </div>

                    <Activity
                        :size="20"
                        class="text-slate-400"
                    />

                </div>


                <div
                    class="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center"
                >

                    <p
                        class="text-sm font-medium text-slate-500"
                    >
                        No activity data yet
                    </p>

                    <p
                        class="mt-1 text-xs text-slate-400"
                    >
                        Recent company activity will appear here.
                    </p>

                </div>

            </section>

        </div>

    </div>

</template>
