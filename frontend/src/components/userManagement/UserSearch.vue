<script setup>
import { ref } from 'vue';
const emit = defineEmits(["search"])

const keyword = ref("")

function submitSearch  () {
    emit("search", keyword.value)
}
</script>

<template>
    <div class="p-1">
        <input type="text" v-model="keyword" class="border rounded-xs m-1 focus:outline-amber-200"
                placeholder="Search User.."
                @keyup.enter="submitSearch()">
        <button @click="submitSearch()">search</button>
    </div>
</template>