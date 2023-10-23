<template>
  <div class="flex min-h-full flex-1 flex-col justify-center items-center mt-8">
    <div class="sm:w-full sm:max-w-sm p-8 mx-auto bg-white rounded-lg shadow-md">
      <img class="mx-auto h-[120px] w-auto animate-fade-down rounded" src="../assets/navlogo.png" alt="Your Company">
      <h2 class="mt-4 text-center text-xl font-pri text-gray-600">Sign in to the System</h2>
      <form class="mt-6 space-y-4" action="#" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-pri text-gray-900">Username</label>
          <InputText type="text" v-model="email" class="block w-full text-emerald-600 text-sm font-pri bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="Enter Your Username"></InputText>
          <div v-if="errors['email']" class="text-red-500 text-sm mt-1">{{ errors['email'] }}</div>
        </div>
        <div>
          <label for="password" class="block text-sm font-pri text-gray-900">Password</label>
          <InputText v-model="password" type="password" class="block w-full text-emerald-600 text-sm font-pri bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="Enter Your Password"></InputText>
          <div v-if="errors['password']" class="text-red-500 text-sm mt-1">{{ errors['password'] }}</div>
        </div>
        <div>
          <div id="flashMessage" class="text-center text-sm font-pri text-white bg-red-500 rounded-md p-2" v-if="message">
            {{ message }}
          </div>
        </div>
        <button type="submit" class="w-full bg-emerald-600 text-white text-sm font-pri py-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200">Sign in</button>
      </form>
      <p class="mt-4 text-center text-sm font-pri text-gray-500">
        Don't have an account yet? 
        <RouterLink :to="{ name: 'register-page' }" class="text-emerald-600 font-pri hover:underline">Sign Up here</RouterLink>
      </p>
    </div>
  </div>
</template>


<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const storeMessage = useMessageStore()
const { message } = storeToRefs(storeMessage)

const router = useRouter()

const authStore = useAuthStore()

const validationSchema = yup.object({
  email: yup.string()
  ,
  password: yup
    .string()
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',

    password: ''
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const onSubmit = handleSubmit((values) => {
  authStore.login(values.email, values.password)
    .then(() => {
      console.log('login success')
      router.push({ name: 'home-page' })

    }).catch((err) => {
      console.log('error', err)
      storeMessage.updateMessage('Username and Password does not match')
      setTimeout(() => {
        storeMessage.resetMessage()
      }, 3000)
    })
})
</script>