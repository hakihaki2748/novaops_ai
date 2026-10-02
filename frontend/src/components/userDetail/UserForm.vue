<script setup>
import { computed, ref, watch } from 'vue';
import { useUserStore } from '@/stores/user.store.js';
import { userSchema } from '@/schemas/user.schema';

const userStore = useUserStore();
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(["close", "success"])


//membuat form untuk menampung data user
const form = ref({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
})

//membuat error untuk menampung error dari backend
const errors = ref({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
})

const submitError = ref("")
const submitting = ref(false)
const showPassword = ref(false)

const currentUserRole = computed(() => {
    try{
        const user  = JSON.parse(localStorage.getItem("user"))

        return user?.role || null
    }catch(err){
        return 'user'
    }
}) 

// penentuan role user baru tergantung role user pembuat
const availableRoles = computed(() => ({
    owner: ['manager', 'admin', 'user'],
    manager: ['admin', 'user'],
    default: ['user'],
})[currentUserRole.value] || ['user'])

// pilihan field untuk digunakan input form create user
const fields = [
    { key: "name", label: "Name", type: "text", placeholder: "Full Name",  },
    { key: "phone", label: "Phone", type: "text", placeholder: "Phone Number",  },
    { key: "email", label: "Email", type: "email", placeholder: "Email Address",  },
]

const resetForm = () => {
    form.value = {
        name: "",
        phone: "",
        email: "",
        password: "",
        role: "",
    }
    errors.value = {
        name: "",
        phone: "",
        email: "",
        password: "",
        role: "",
    }
    submitError.value = ""
    showPassword.value = false
}

//gunakan watch agar setiap kali props.show berubah, nolai form selalu kosong
watch(() => props.show, (newVal) => {
    if(newVal){
        resetForm()
    }
})

//lakukan validasi dataForm sebelum di submit
const validation = () => {
    let valid = true
    errors.value = {
        name: "",
        phone: "",
        email: "",
        password: "",
        role: "",
    }

    const result = userSchema.safeParse(form.value)

    if(!result.success) {
        errors.value = result.error.flatten().fieldErrors
        return false
    }

    if(!availableRoles.value.includes(form.value.role)){
        errors.value.role = ["Role tidak valid"]
        return false
    }

    errors.value = {}
    return valid
}


//submit data
const submit = async () => {
    if(submitting.value) return

    submitting.value = true
    submitError.value = ""

    try{
        const data = userSchema.parse(form.value)

        if(!data){
            throw new Error("Data tidak valid")
        }

        await userStore.createUser({
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: data.password,
            role: data.role,
        })

        emit("success")
        resetForm()
        console.log("User created successfully")
    }catch(err){
        submitError.value = err.response?.data?.message || err.response?.data?.error
        console.error("Failed to create user:", err)
    }finally{
        submitting.value = false
    }

}
</script>

<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-4"
            @click.self="emit('close')"
        >
            <div
                class="flex max-h-[95vh] w-full max-w-xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
            >
                <!-- HEADER -->
                <header
                    class="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5"
                >
                    <div>
                        <h2 class="text-base font-bold text-slate-900 sm:text-lg">
                            Add User
                    </h2>

                        <p class="mt-1 text-xs text-slate-500 sm:text-sm">
                            Create a new user account.
                    </p>
                </div>

                    <button
                        type="button"
                        class="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        @click="emit('close')"
                    >
                        ✕
                </button>
            </header>

                <!-- FORM -->
                <form
                    class="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6"
                    @submit.prevent="submit"
                >
                    <!-- SERVER ERROR -->
                    <div
                        v-if="submitError"
                        class="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {{ submitError }}
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                        <!-- TEXT FIELDS -->
                        <div
                            v-for="field in fields"
                            :key="field.key"
                            :class="{ 'sm:col-span-2': field.full }"
                        >
                            <label
                                class="mb-1.5 block text-sm font-semibold text-slate-700"
                            >
                                {{ field.label }}
                            </label>

                            <input
                                v-model="form[field.key]"
                                :type="field.type"
                                :maxlength="field.maxlength"
                                :placeholder="field.placeholder"
                                class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                :class="{
                                    'border-red-400': errors[field.key]?.[0]
                                }"
                            />

                            <p
                                v-if="errors[field.key]?.[0]"
                                class="mt-1 text-xs text-red-600"
                            >
                                {{ errors[field.key][0] }}
                            </p>
                        </div>

                        <!-- PASSWORD -->
                        <div>
                            <label
                                class="mb-1.5 block text-sm font-semibold text-slate-700"
                            >
                                Password
                            </label>

                            <div class="relative">
                                <input
                                    v-model="form.password"
                                    :type="
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    "
                                    autocomplete="new-password"
                                    placeholder="Minimum 12 characters"
                                    class="w-full rounded-xl border border-slate-200 px-4 py-3 pr-14 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                    :class="{
                                        'border-red-400':
                                            errors.password?.[0]
                                    }"
                                />

                                <button
                                    type="button"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700"
                                    @click="
                                        showPassword = !showPassword
                                    "
                                >
                                    {{ showPassword ? 'Hide' : 'Show' }}
                                </button>
                            </div>

                            <p
                                v-if="errors.password?.[0]"
                                class="mt-1 text-xs text-red-600"
                            >
                                {{ errors.password[0] }}
                            </p>
                        </div>

                        <!-- ROLE -->
                        <div>
                            <label
                                class="mb-1.5 block text-sm font-semibold text-slate-700"
                            >
                                Role
                            </label>

                            <select
                                v-model="form.role"
                                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                :class="{
                                    'border-red-400': errors.role?.[0]
                                }"
                            >
                                <option
                                    v-for="role in availableRoles"
                                    :key="role"
                                    :value="role"
                                >
                                    {{
                                        role.charAt(0).toUpperCase() +
                                        role.slice(1)
                                    }}
                                </option>
                            </select>

                            <p
                                v-if="errors.role?.[0]"
                                class="mt-1 text-xs text-red-600"
                            >
                                {{ errors.role[0] }}
                            </p>
                        </div>
                    </div>

                    <!-- FOOTER -->
                    <footer
                        class="mt-5 flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:mt-7 sm:flex-row sm:justify-end sm:gap-3 sm:pt-5"
                    >
                        <button
                            type="button"
                            :disabled="submitting"
                            class="w-full rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            @click="emit('close')"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            :disabled="submitting"
                            class="w-full rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {{ submitting ? 'Creating...' : 'Add User' }}
                        </button>
                    </footer>
                </form>
        </div>
    </div>
</Teleport>
</template>