import { defineStore } from "pinia";

import { getUsers, getUserById, createUser, updateStatus, updateRole, deleteUser } from "../services/user.api"

export const useUserStore = defineStore("user", {
    
    //state digunakan untuk menyimpan nilai atau gudang, bersifat reaktif
    state: () => ({
        users: [],
        user: null,
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0
        },
        loading: false,
        loadingDetail: false,
        error: null
    }),

    //actions digunakan untuk menjalankan logika atau fungsi untuk mengambil nilai
    actions: {
        //digunakan untuk mengambil data dan di import ke component
        async loadUsers (params = {}) {

            params = {
                page: this.pagination.page,
                limit: this.pagination.limit,
                ...params
            }

            try {
                this.loading = true
                this.error = null

                const res = await getUsers(params);
                this.users = res.data.data
                this.pagination = res.data.pagination
            } catch (err) {
                this.error = err.response?.data?.message || err.message

                this.users = [];
            }finally{
                this.loading = false
            }
        },

        //ambil user by id
        async loadUser (id) {
            try {
                this.loadingDetail = true
                this.error = null

                const res = await getUserById(id);
                this.users = res.data.data
            } catch (err) {
                this.error = err.response?.data?.message || err.message

                throw err
            }finally{
                this.loadingDetail = false
            }
        },

        //create user
        async createUser (payload) {
            try {
                this.loading = true
                this.error = null

                const res = await createUser(payload);
                this.users = res.data.data
            } catch (err) {
                this.error = err.response?.data?.message || err.message
                throw err

            }finally{
                this.loading = false
            }
        },

        //digunakan untuk merubah status
        async updateStatus (id, status) {
            try {
                this.loading = true
                this.error = null

                const res = await updateStatus(id, status)

                return res.data
            } catch (err) {
                this.error =
                    err.response?.data?.message ||
                    err.message

                throw err
            } finally {
                this.loading = false
            }
        },

        //digunakan untuk merubah role
        async updateRole (id, role){
            try {
                this.loading = true
                this.error = null

                const res = await updateRole(id, role)

                return res.data
            } catch (err) {
                this.error =
                    err.response?.data?.message ||
                    err.message

                throw err
            } finally {
                this.loading = false
            }
        },

        //untuk menghapus
        async deleteUser (id) {
            try {
                this.loading = true
                this.error = null

                const res = await deleteUser(id)

                return res.data
            } catch (err) {
                this.error =
                    err.response?.data?.message ||
                    err.message

                throw err
            } finally {
                this.loading = false
            }
        },

        //untuk mengatus halaman page
        async setPage (page) {
            if(page < 1){
                return;
            }

            if(this.pagination.totalPages > 0 && page > this.pagination.totalPages){
                return;
            }

            this.pagination.page = page;

            await this.loadUsers({
                page: this.pagination.page,
                limit: this.pagination.limit
            })
        },

        async setSearch (search) {
            this.pagination.page = 1

            await this.loadUsers({
                page: 1,
                limit: this.pagination.limit,
                search: search,
            })
        }
    }

})