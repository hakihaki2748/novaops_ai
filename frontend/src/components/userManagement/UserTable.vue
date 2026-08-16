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
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td class="border p-1">{{ user.id }}</td>
                    <td class="border p-1">{{ user.name }}</td>
                    <td class="border p-1">{{ user.email }}</td>
                    <td class="border p-1">{{ user.role }}</td>
                </tr>               
            </tbody>
                
        </table>
    </div>
</template>