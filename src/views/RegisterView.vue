<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import ImageUpload from '@/components/ImageUpload.vue'

const authStore = useAuthStore()
const router = useRouter()
const storeMessage = useMessageStore()

const { message } = storeToRefs(storeMessage)

const validationSchema = yup.object({
  username: yup.string()
    .required('The username is required')
    .matches(/^[A-Za-z0-9]+$/, 'Username should contain only alphabetic characters and numbers'),

  firstName: yup.string()
    .required('The firstName is required')
    .matches(/^[A-Za-z]+$/, 'First name should contain only alphabetic characters'),

  lastName: yup.string()
    .required('The lastName is required')
    .matches(/^[A-Za-z]+$/, 'Last name should contain only alphabetic characters'),

  email: yup.string()
    .required('The email is required')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Please enter a valid email address ending with example.com'),

  password: yup.string()
    .required('The password is required')
    .min(5, 'Password must be at least 5 characters long.'),
  images: yup.array()
  .required('Image is required')
})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    images: []
  }
})

const { value: username } = useField<string>('username')

const { value: firstName } = useField<string>('firstName')

const { value: lastName } = useField<string>('lastName')

const { value: email } = useField<string>('email')

const { value: password } = useField<string>('password')

const onSubmit = handleSubmit((values) => {
  authStore
    .studentRegister(values.username, values.firstName, values.lastName, values.email, values.password)
    .then((res) => {
      console.log(res.data);
      router.push({ name: 'Login' })
    })
    .catch(() => {
      storeMessage.updateMessage('could not register')

      setTimeout(() => {
        storeMessage.resetMessage()
      }, 3000)
    })
})

</script>

<template>
  <div class="flex min-h-screen justify-center items-center">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <img class="mx-auto h-[120px] w-auto animate-fade-down rounded" src="../assets/navlogo.png" alt="Your Company">
      <h2 class="text-2xl font-pri text-gray-700 text-center">Sign Up</h2>
      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <div>
          <label for="username" class="block text-sm font-pri text-gray-900">Student ID</label>
          <InputText type="text" v-model="username" class="block w-full text-sm font-pri text-gray-300 bg-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="Username"></InputText>
          <div v-if="errors['username']" class="text-red-500 text-sm mt-1">{{ errors['username'] }}</div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-pri text-gray-900">First Name</label>
            <InputText type="text" v-model="firstName" class="block w-full text-sm font-pri text-gray-300 bg-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="First Name"></InputText>
            <div v-if="errors['firstName']" class="text-red-500 text-sm mt-1">{{ errors['firstName'] }}</div>
          </div>
          <div>
            <label for="lastName" class="block text-sm font-pri text-gray-900">Last Name</label>
            <InputText type="text" v-model="lastName" class="block w-full text-sm font-pri text-gray-300 bg-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="Last Name"></InputText>
            <div v-if="errors['lastName']" class="text-red-500 text-sm mt-1">{{ errors['lastName'] }}</div>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-pri text-gray-900">Email Address</label>
          <InputText type="text" v-model="email" class="block w-full text-sm font-pri text-gray-300 bg-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="Email Address"></InputText>
          <div v-if="errors['email']" class="text-red-500 text-sm mt-1">{{ errors['email'] }}</div>
        </div>

        <div>
          <label for="password" class="block text-sm font-pri text-gray-900">Password</label>
          <InputText v-model="password" type="password" class="block w-full text-sm font-pri text-gray-300 bg-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="Password (at least 5 characters)"></InputText>
          <div v-if="errors['password']" class="text-red-500 text-sm mt-1">{{ errors['password'] }}</div>
        </div>

        <div>
          <div id="flashMessage" class="text-center text-sm font-pri text-white bg-red-500 rounded-md p-2" v-if="message">
            {{ message }}
          </div>
        </div>
        <ImageUpload v-model="images" :max="1" />

        <button type="submit" class="w-full bg-emerald-600 text-white text-sm font-pri py-2 rounded-md hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200">
          Sign Up
        </button>
      </form>

      <p class="mt-4 text-center font-pri text-sm text-gray-500">
        Already have an account?
        <RouterLink :to="{ name: 'Login' }" class="text-emerald-600 hover:underline">Sign in</RouterLink>
      </p>
    </div>
  </div>
</template>

