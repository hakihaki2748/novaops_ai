import { defineStore } from "pinia";

import { getUsers, getUserById, createUser, updateStatus, updateRole, deleteUser } from "../services/user.api"

export const useUserStore = defineStore("user", {
    
    //state digunakan untuk menyimpan nilai atau gudang, bersifat reaktif
    state: () => ({
        user: null,
        logs: [],
        loading: false,
        error: null
    }),

    //actions digunakan untuk menjalankan logika atau fungsi untuk mengambil nilai
    actions: {
        //digunakan untuk mengambil data dan di import ke component
        async loadUsers (params) {
            try {
                this.loading = true
                this.error = null

                const res = await getUsers(params);
                this.user = res.data.data
            } catch (err) {
                this.error = err.message
                this.user = null

                console.log(err.message)
            }finally{
                this.loading = false
            }
        },

        //ambil user by id
        async loadUser (id) {
            try {
                this.loading = true
                this.error = null

                const res = await getUserById(id);
                this.user = res.data.data
            } catch (err) {
                this.error = err.message
                this.user = null

                console.log(err.message)
            }finally{
                this.loading = false
            }
        },

        async createUser (payload) {
            try {
                this.loading = true
                this.error = null

                const res = await getUsers(payload);
                this.user = res.data.data
            } catch (err) {
                this.error = err.message
                this.user = null

                console.log(err.message)
            }finally{
                this.loading = false
            }
        },

        //digunakan untuk merubah status
        async updateStatus (id, status) {
            await updateStatus(id, status);
        },

        //digunakan untuk merubah role
        async updateRole (id, role){
            await updateRole(id, role);
        },

        //untuk menghapus
        async deleteUser (id) {
            await deleteUser(id);
        }
    }

})