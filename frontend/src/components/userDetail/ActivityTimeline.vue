<script setup>
const { logs, loading, error } = defineProps({
    logs: {
        type: Array,
        default: () => [],
    },

    loading:{
        type: Boolean, 
        default: false
    },

    error: {
        type: String,
        default: null
    }
})
</script>

<template>
    <div>
        <h3>Activity Timeline</h3>
        <div v-if="loading">
            Loading Logs...
        </div>
        <div v-if="error">
            {{ error }}
        </div>
        <div v-if="logs.length === 0">
            Logs Not Found
        </div>
         <div v-for="log in logs" :key="log.id">
            <p>{{ log.user_id }}</p>
            <p>{{ log.actor_role }}</p>
            <p>{{ log.event_type }}</p>
            <p>{{ log.created_at }}</p>
         </div>
    </div>
</template>