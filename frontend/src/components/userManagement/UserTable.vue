<script setup>

const {users} = defineProps({
    users: {type: Array, default: () => []},
})

const emit = defineEmits(["updateRole", "updateStatus", "detailUser", "deleteUser"])

function detailUser (id) {
    emit("detailUser", id)
}

function updateRole (id) {
    emit("updateRole", id)
}

function updateStatus (id) {
    emit("updateStatus", id)
}

function deleteUser (id) {
    emit("deleteUser", id)
}


</script>

<template>
    <div>
        <table class="m-2">
            <thead>
                <tr>
                    <th class="border p-1">ID</th>
                    <th class="border p-1">Name</th>
                    <th class="border p-1">Email</th>
                    <th class="border p-1">Role</th>
                    <th class="border p-1">Status</th>
                    <th class="border p-1">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td class="border p-1">{{ user.id }}</td>
                    <td class="border p-1">{{ user.name }}</td>
                    <td class="border p-1">{{ user.email }}</td>
                    <td class="border p-1">{{ user.role }}</td>
                    <td class="border p-1">{{ user.status }}</td>
                    <td v-if="users.length">
                        <button class="p-1 rounded-xs text-white cursor-pointer bg-blue-400 hover:bg-blue-500"
                            @click="detailUser(user.id)">Detail
                        </button>
                        <button class="p-1 rounded-xs text-white cursor-pointer bg-cyan-400 hover:bg-cyan-500"
                            @click="updateRole(user.id)">
                            Update Role
                        </button>
                        <button class="p-1 rounded-xs text-white cursor-pointer bg-amber-500 hover:bg-amber-600"
                            @click="updateStatus(user.id)">
                            Update Status
                        </button>
                        <button class="p-1 rounded-xs text-white cursor-pointer bg-red-500 hover:bg-red-600"
                            @click="deleteUser(user.id)">
                            Delete
                        </button>
                    </td>
                </tr>               
            </tbody>
                
        </table>
    </div>
</template>