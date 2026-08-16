<script setup>
const { user } = defineProps({
    user: {
        type: Object,
        defaut: () => {},
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
    </div>
</template>
