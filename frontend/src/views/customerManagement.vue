<script setup>
import { onMounted } from "vue";

import CustomerToolbar from "@/components/customerManagement/CustomerToolbar.vue";

import CustomerTable from "@/components/customerManagement/CustomerTable.vue";

import CustomerPagination from "@/components/customerManagement/CustomerPagination.vue";

import { useCustomerStore } from "@/stores/customer.store";

const customerStore = useCustomerStore();

onMounted(async () => {

    await customerStore.loadCustomers();

});

const searchCustomer = async (search) => {

    await customerStore.setSearch(search);

};

const filterCustomer = async (filters) => {

    for (const [key, value] of Object.entries(filters)) {

        customerStore.filters[key] = value;

    }

    customerStore.pagination.page = 1;

    await customerStore.loadCustomers();

};

const sortCustomer = async (sort, order) => {

    await customerStore.setSorting(
        sort,
        order
    );

};

const resetFilters = async () => {

    await customerStore.resetFilters();

};

const changePage = async (page) => {

    await customerStore.setPage(page);

};

const detailCustomer = async (id) => {

    await customerStore.loadCustomer(id);

    console.log(
        "Customer detail:",
        customerStore.customer
    );

};
</script>

<template>

    <div class="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

        <div class="mx-auto max-w-7xl space-y-6">

            <!-- Header -->

            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <p class="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        Customer Management
                    </p>

                    <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Customers
                    </h1>

                    <p class="mt-1 text-sm text-slate-500">
                        Manage and monitor your customer relationships.
                    </p>

                </div>

                <button
                    type="button"
                    class="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                >
                    <span class="text-lg leading-none">+</span>
                    Add Customer
                </button>

            </div>

            <!-- Toolbar -->

            <CustomerToolbar
                @search="searchCustomer"
                @filter="filterCustomer"
                @sort="sortCustomer"
                @reset="resetFilters"
            />

            <!-- Loading -->

            <div
                v-if="customerStore.loading"
                class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
            >

                <div class="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

                <p class="mt-4 text-sm text-slate-500">
                    Loading customers...
                </p>

            </div>

            <!-- Error -->

            <div
                v-else-if="customerStore.error"
                class="rounded-2xl border border-red-200 bg-red-50 p-6"
            >

                <p class="font-semibold text-red-700">
                    Failed to load customers
                </p>

                <p class="mt-1 text-sm text-red-600">
                    {{ customerStore.error }}
                </p>

                <button
                    @click="customerStore.loadCustomers()"
                    class="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                    Retry
                </button>

            </div>

            <!-- Empty -->

            <div
                v-else-if="customerStore.customers.length === 0"
                class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"
            >

                <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                    👥
                </div>

                <h3 class="mt-4 font-semibold text-slate-800">
                    No customers found
                </h3>

                <p class="mt-1 text-sm text-slate-500">
                    Try changing your search or filter.
                </p>

            </div>

            <!-- Table -->

            <CustomerTable
                v-else
                :customers="customerStore.customers"
                @detail="detailCustomer"
            />

            <!-- Pagination -->

            <CustomerPagination
                :page="customerStore.pagination.page"
                :totalPages="customerStore.pagination.totalPages"
                :totalCustomer="customerStore.pagination.totalCustomer"
                :limit="customerStore.pagination.limit"
                @change="changePage"
            />

        </div>

    </div>

</template>