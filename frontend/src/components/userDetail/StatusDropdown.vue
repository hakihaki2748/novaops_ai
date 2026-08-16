<script setup>
const { status } = defineProps({
    status: String
})

const emit = defineEmits(["change"])
function change (e){
    emit("change", e.target.value)
}

</script>

<template>
    <div>
        <select :value="status" @change="change">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
        </select>
    </div>
</template>