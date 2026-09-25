<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCustomerStore } from '@/stores/customer.store';

import CustomerProfileCard from '@/components/customerDetail/CustomerProfileCard.vue'
import CustomerStats from '@/components/customerDetail/CustomerStats.vue'
import CustomersActivityTimeline from '@/components/customerDetail/CustomerActivityTimeline.vue'



const route = useRoute()
const router = useRouter()
const customerStore = useCustomerStore()

const customerId = route.params.id

const loadCustomer = async () =>
{
    try {
        await customerStore.loadCustomer(customerId)
    } catch (err) {
        console.log("Gagal Memuat Data")
    }
}

const goBack = () =>
{
    router.push({
        name: "customers"
    })
}

const retry = async () =>
{
    await loadCustomer()
}

onMounted(loadCustomer)


</script>

<template>
    <div class="min-h-screen bg-slate-50">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            <!-- Header -->
            <div class="mb-6">
                <button
                    type="button"
                    @click="goBack"
                    class="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                >
                    <span>←</span>
                    Back to Customers
                </button>

                <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p class="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                            Customer Management
                        </p>

                        <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Customer Detail
                        </h1>

                        <p class="mt-1 text-sm text-slate-500">
                            View customer information and activity history.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Loading -->
            <div
                v-if="customerStore.loadingDetail"
                class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
            >
                <div
                    class="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
                ></div>

                <p class="mt-4 text-sm text-slate-500">
                    Loading customer...
                </p>
            </div>

            <!-- Error -->
            <div
                v-else-if="customerStore.errorDetail"
                class="rounded-2xl border border-red-200 bg-red-50 p-6"
            >
                <div class="flex gap-4">
                    <div
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600"
                    >
                        !
                    </div>

                    <div>
                        <h2 class="font-semibold text-red-800">
                            Unable to load customer
                        </h2>

                        <p class="mt-1 text-sm text-red-600">
                            {{ customerStore.errorDetail }}
                        </p>

                        <button
                            type="button"
                            @click="retry"
                            class="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>

            <!-- Not Found -->
            <div
                v-else-if="!customerStore.customer"
                class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"
            >
                <div
                    class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl"
                >
                    ?
                </div>

                <h2 class="mt-4 font-semibold text-slate-800">
                    Customer not found
                </h2>

                <p class="mt-1 text-sm text-slate-500">
                    The customer may have been deleted or does not exist.
                </p>

                <button
                    type="button"
                    @click="goBack"
                    class="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                    Back to Customers
                </button>
            </div>

            <!-- Content -->
            <template v-else>
                <div class="grid gap-6 lg:grid-cols-3">

                    <!-- Main profile -->
                    <div class="lg:col-span-2">
                        <CustomerProfileCard
                            :customer="customerStore.customer"
                        />

                        <CustomerStats
                            :customer="customerStore.customer"
                            class="mt-6"
                        />
                    </div>

                    <!-- Activity -->
                    <div class="lg:col-span-1">
                        <CustomerActivityTimeline
                            :customer-id="customerId"
                        />
                    </div>

                </div>
            </template>

        </div>
    </div>
</template>
