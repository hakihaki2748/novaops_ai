//import dari pinia
import { defineStore } from "pinia";

import {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    updateCustomerVip,
    updateCustomerSegment,
    updateCustomerStatus,
    deleteCustomer,
} from "../services/customer.api";


export const useCustomerStore = defineStore("customer", {
    state: () => ({
        customers: [],
        customer: null,
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
        },

        filters: {
            search: "",
            status:"",
            segment: "",
            is_vip: "",
            sort: "created_at",
            order: "desc",
        },

        loading: false,
        loadingDetail: false,
        error: null,
        errorDetail: null

    }),

    actions: {
        async loadCustomers(params = {}) {
            //buat variabel yang menampung nilai yang akan dikirimkan
            const query = {
                page: this.pagination.page,
                limit: this.pagination.limit,
                ...this.filters,
                ...params
            }

            try{
                this.loading = true
                this.error = null

                const res = await getCustomers(query)
                const result = res.data.data

                this.customers = result.customers
                this.pagination = result.pagination
            }catch(err){
                this.error = err.response?.data?.message || err.message
                this.customers = []
            }finally{
                this.loading = false
            }
        },

        async loadCustomer(id) {
            try{
                this.loadingDetail = true
                this.errorDetail = null

                const res = await getCustomerById(id)
                this.customer = res.data.data
            }catch(err){
                this.errorDetail = err.response?.data?.message || err.message
                this.customer = null

                throw err;
            }finally{
                this.loadingDetail = false
            }
        },

        async setPage (page) {
            if(page < 1){
                return
            }

            if(page > this.pagination.totalPages && this.pagination.totalPages > 0){
                return
            }

            this.pagination.page = page

            await this.loadCustomer()
        },

        async setSearch (search) {
            this.filters.search = search
            this.pagination.page = 1
            await this.loadCustomer();
        },

        async setSorting (sort, order) {
            this.filters.sort = sort
            this.filters.order = order

            await this.loadCustomer();
        },

        async resetFilters() { 
            this.filters = { 
                search: "", 
                status: "", 
                segment: "", 
                is_vip: "", 
                sort: "created_at", 
                order: "desc", 
            }; 
            this.pagination.page = 1; 
            await this.loadCustomers(); 
        },

        async createCustomer (payload) {
            try{
                this.loading = true
                this.error = null

                const res = await createCustomer(payload)

                await this.loadCustomers()

                const result = res.data.data
            }catch(err){
                this.error = err.response?.data?.message || err.message
                throw err
            }finally{
                this.loading = false
            }
        }



    }

    
})