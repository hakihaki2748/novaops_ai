<script setup>
const { show } = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    }
})

const emit = defineEmits(["restore", "close"])

function change (val) {
    val == 'restore' ? emit("restore") : emit("close")
}

</script>

<template>
    <div v-if="show" class="border p-2 rounded-sm">
        <div>
            <button @click="change('restore')">Restore</button>
        </div>
        <div>
            <button @click="change('close')">Cancel</button>
        </div>
    </div>
</template>