<script setup>
const {users} = defineProps({
    users: {type: Array, default: () => []},
})
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
                    <td v-if="users.length">
                        <button class="p-1 rounded-xs text-white cursor-pointer bg-blue-400 hover:bg-blue-500">Detail</button>
                        <button class="p-1 rounded-xs text-white cursor-pointer bg-cyan-400 hover:bg-cyan-500">Update Role</button>
                        <button class="p-1 rounded-xs text-white cursor-pointer bg-amber-500 hover:bg-amber-600">Update Status</button>
                        <button class="p-1 rounded-xs text-white cursor-pointer bg-red-500 hover:bg-red-600">Delete</button>
                    </td>
                </tr>               
            </tbody>
                
        </table>
    </div>
</template>