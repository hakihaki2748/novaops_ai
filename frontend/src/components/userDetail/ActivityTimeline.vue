<script setup>
const { logs } = defineProps({
    logs: {
        type: Array,
        default: () => [],
    }
})
</script>

<template>
    <div>
        <h3>Activity Timeline</h3>
         <div v-for="log in logs" :key="log.id">
            <p>{{ log.user_id }}</p>
            <p>{{ log.actor_role }}</p>
            <p>{{ log.event_type }}</p>
            <p>{{ log.created_at }}</p>
         </div>
    </div>
</template>