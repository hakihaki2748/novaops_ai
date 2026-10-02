<script setup>
import { ref, watch } from "vue";
import { useCustomerStore } from "@/stores/customer.store";

const customerStore = useCustomerStore();

const props = defineProps({
    show: { type: Boolean, default: false },
})

const emit = defineEmits(["close", "success"])

const form = ref({
    name: "",
    email: "",
    phone: "",
})

const error = ref("")
const loading = ref(false)

const resetForm = () => {
    form.value = {
        name: "",
        email: "",
        phone: "",
    }
    error.value = ""
}

watch(() => props.show, (newVal) => {
    if (newVal) {
        resetForm();
    }
})

const submit = async () => {
    if(loading.value) return

    if(!form.value.name || !form.value.email || !form.value.phone){
        error.value = "Please fill in all required fields."
        return
    }

    loading.value = true
    error.value = ""

    try{
        await customerStore.createCustomer({
            name: form.value.name.trim(),
            email: form.value.email.trim(),
            phone: form.value.phone,
        })
        emit("success")
        resetForm()

        console.log("Customer created successfully")
    } catch (err) {
        error.value = "An error occurred while submitting the form."
        console.error("Error creating customer:", err)
    } finally {
        loading.value = false
    }
}

</script>

<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            @click.self="emit('close')"
        >
            <form
                @submit.prevent="submit"
                class="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                <!-- Header -->
                <div class="flex items-center justify-between border-b px-5 py-4 sm:px-6">
                    <div>
                        <h2 class="text-lg font-bold text-slate-900">
                            Add Customer
                        </h2>
                        <p class="text-sm text-slate-500">
                            Tambahkan customer baru.
                        </p>
                    </div>

                    <button
                        type="button"
                        @click="emit('close')"
                        class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                        ✕
                    </button>
                </div>

                <!-- Body -->
                <div class="max-h-[75vh] overflow-y-auto p-5 sm:p-6">

                    <div
                        v-if="error"
                        class="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                        {{ error }}
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">

                        <!-- Name -->
                        <div class="sm:col-span-2">
                            <label class="mb-1.5 block text-sm font-medium text-slate-700">
                                Name
                            </label>

                            <input
                                v-model="form.name"
                                type="text"
                                maxlength="100"
                                placeholder="Customer name"
                                class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>

                        <!-- Email -->
                        <div class="sm:col-span-2">
                            <label class="mb-1.5 block text-sm font-medium text-slate-700">
                                Email
                            </label>

                            <input
                                v-model="form.email"
                                type="email"
                                maxlength="100"
                                placeholder="customer@example.com"
                                class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>

                        <!-- Phone -->
                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-slate-700">
                                Phone
                            </label>

                            <input
                                v-model="form.phone"
                                type="tel"
                                maxlength="100"
                                placeholder="+62..."
                                class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="flex flex-col-reverse gap-3 border-t px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                    <button
                        type="button"
                        @click="emit('close')"
                        :disabled="loading"
                        class="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {{ loading ? 'Creating...' : 'Add Customer' }}
                    </button>
                </div>
            </form>
        </div>
    </Teleport>
</template>
