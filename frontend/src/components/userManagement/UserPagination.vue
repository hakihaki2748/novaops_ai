<script setup>
const {page, totalPages} = defineProps({
    page: {type: Number, default: () => 1 },
    totalPages: {type: Number, default: () => 1 }
})

const emit = defineEmits(["change"])

function changePage (val) {
    emit('change', val);
}

</script>

<template>
    <div class="m-1">
        <button @click="changePage(page - 1)" class="m-1 bg-blue-400 text-white p-1 px-2 rounded-sm"
                :class="page === 1 ? 'disabled' : '' ">prev</button>
        <button @click="changePage(page + 1)" class="m-1 bg-blue-400 text-white p-1 px-2 rounded-sm"
                :class="page === totalPages ? 'disabled' : ''">next</button>
    </div>
</template>