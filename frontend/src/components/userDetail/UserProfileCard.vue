<script setup>
const { user } = defineProps({
    user: {
        type: Object,
        default: () => {},
    }
})

</script>

<template>
    <div class="p-3 border border-amber-500 rounded-sm mb-3">
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
        <p>
            Role: <strong>{{ user.role }}</strong>
        </p>
        <p>
            Status: <strong>{{ user.status }}</strong>
        </p>
        <p>
            Created_at: <strong>{{ user.created_at }}</strong>
        </p>
        <p>
            Updated_at: <strong>{{ user.updated_at }}</strong>
        </p>
    </div>
</template>
