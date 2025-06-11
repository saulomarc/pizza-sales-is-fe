<script setup lang="ts">
import { ref } from 'vue'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup';

import { useAuthStore } from '@/stores/auth'
import { useCounterStore } from '@/stores/counter'
import Input from "./Input.vue";

const counterStore = useCounterStore()
const authStore = useAuthStore()

const { increment, fetchTestData } = counterStore

const credentials = ref({
    email: '',
    password: ''
})

const loginSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

const inputType = ref('password')

function handleLogin() {
    authStore.loginUser(credentials.value)
}

function handleShowPassword() {
    if (inputType.value == 'password') {
        inputType.value = 'text'
    } else {
        inputType.value = 'password'
    }
}

</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        
        <VeeForm ref="refDestinationForm" v-slot="{ handleSubmit }" :validation-schema="loginSchema" as="div" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent.stop="handleSubmit($event, handleLogin)">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <Field v-model="credentials.email" v-slot="{ field }" name="email">
                        <input v-bind="field" type="email" name="email" id="email" autocomplete="email" required="true" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </Field>
                    <ErrorMessage v-slot="{ message }" as="div" name="email">
                        <p class="text-xs text-red-600">{{ message }}</p>
                    </ErrorMessage>
                </div>
                
                <div>
                    <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                    <Field v-model="credentials.password" v-slot="{ field }" name="password">
                        <input v-bind="field" :type="inputType" name="password" id="password" autocomplete="current-password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </Field>                        
                    <div class="text-xs flex items-center mt-1 justify-between">
                        <div>
                            <ErrorMessage v-slot="{ message }" as="div" name="password">
                                <p class="text-xs text-red-600">{{ message }}</p>
                            </ErrorMessage>
                        </div>
                        <div class="flex items-center">
                            <input type="checkbox" @click="handleShowPassword" class="mr-1 mt-0.5"> Show Password
                        </div>
                    </div>
                </div>
                
                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </form>
        </VeeForm>
    </div>
</template>

<style scoped>

</style>
