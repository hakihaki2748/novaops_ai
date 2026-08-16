<script setup>
const { role } = defineProps({
    role: String,
})

const emit = defineEmits(["change"])
function change (e){
    emit("change", e.target.value);
}

</script>

<template>
    <div>
         <select :value="role" @change="change">
            <option value="owner">Owner</option>
            <option value="manager">Manager</option>
            <option value="staf">Staf</option>
            <option value="user">User</option>
         </select>
    </div>
</template>