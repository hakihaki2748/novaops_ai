import { defineStore } from "pinia";

import { getUser, updateStatus, updateRole, getLogs, restoreUser } from "../services/user.api"

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
        async loadUser (id) {
            try {
                this.loading = true
                this.error = null

                const res = await getUser(id);
                this.user = res.data.data
            } catch (err) {
                this.error = err.message
                this.user = null

                console.log(err.message)
            }finally{
                this.loading = false
            }
        },

        //digunakan untuk mengambil logs
        async loadLogs (id) {
            try {
                const res = await getLogs(id);
                
                this.logs = res.data.data
                
            } catch (err) {
                console.log(err.message)
                this.logs = []
            }
        },

        //digunakan untuk merubah status
        async changeStatus (id, status) {
            
            await updateStatus(id, status);
            await this.loadUser(id);
            await this.loadLogs(id);
        },

        //digunakan untuk merubah role
        async changeRole (id, role){
            await updateRole(id, role);
            await this.loadUser(id);
            await this.loadLogs(id);
        },

        //digunakan untuk melakukan restore
        async restore (id){
            await restoreUser(id);
            await this.loadUser(id);
            await this.loadLogs(id);
        }
    }

})