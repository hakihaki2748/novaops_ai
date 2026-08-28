import { defineStore } from "pinia";

import { getUsers, getUserById, createUser, updateStatus, updateRole, deleteUser, getLogs } from "../services/user.api"

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
        search: "",
        loading: false,
        loadingDetail: false,
        error: null,
        errorDetail: null,
        logs: [],
        loadingLogs: false,
        errorLogs: null,
    }),

    //actions digunakan untuk menjalankan logika atau fungsi untuk mengambil nilai
    actions: {
        //digunakan untuk mengambil data dan di import ke component
        async loadUsers (params = {}) {

            params = {
                page: this.pagination.page,
                limit: this.pagination.limit,
                search: this.search,
                ...params
            }

            try {
                this.loading = true
                this.error = null

                const res = await getUsers(params);
                this.users = res.data.data
                this.pagination.page = res.data.pagination
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
                this.errorDetail = null

                const res = await getUserById(id);
                this.user = res.data.data
            } catch (err) {
                this.errorDetail = err.response?.data?.message || err.message

                this.user = null

                throw err
            }finally{
                this.loadingDetail = false
            }
        },

        //ambil logs
        async loadLogs (userId) {
            this.loadingLogs = true
            this.errorLogs = null
            this.logs = []
            
            try{
                const res = await getLogs(userId)
                this.logs = res.data.data

            }catch(err){
                this.errorLogs = err.response?.data?.message || err.message
            }finally{
                this.loadingLogs = false
            }
        },

        //create user
        async createUser (payload) {
            try {
                this.loading = true
                this.error = null

                const res = await createUser(payload);

                await this.refreshUsers()

                return res.data;

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

                await this.refreshUsers()

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

                await this.refreshUsers()

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

                await this.refreshUsers()

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

            await this.loadUsers()
        },

        async setSearch (search) {
            this.search = search
            this.pagination.page = 1

            await this.loadUsers()
        },

        async refreshUsers () {
            await this.loadUsers({
                page: this.pagination.page,
                limit: this.pagination.limit,
                search: this.search
            })
        }
    }

})