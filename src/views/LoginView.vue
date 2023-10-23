<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-[350px] w-auto animate-fade-down rounded " src="../assets/navlogo.png" alt="Your Company">
      <h2 class="mt-1 text-center text-lg font-pri leading-9 111 text-gray-600">Sign in to system</h2>
    </div>

    <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-pri leading-6 text-gray-900">Username</label>
          <InputText type="text" v-model="email" class="text-emerald-600 text-sm font-pri"
            placeholder="Enter Your Username"></InputText>
          <div v-if="errors['email']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌ {{
            errors['email'] }}</div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-pri leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <InputText v-model="password" type="password" class="text-emerald-600 text-sm font-pri"
              placeholder="Enter Your Password"></InputText>
            <div v-if="errors['password']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
              {{ errors['password'] }}</div>

          </div>
        </div>
        <div>
          <div id="flashMessage" class="mb-2 animate-pulse text-center text-base font-pri bg-red-500 font-pri text-white"
            v-if="message">
            <h4>{{ message }}</h4>
          </div>
          <FlashMessage />
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-pri leading-6 text-white shadow-sm
                    hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Sign
            in</button>
        </div>
      </form>
      <p class="mt-10 font-pri text-center text-sm text-gray-500">
        Doesn't have an account yet?
        {{ ' ' }}
        <RouterLink :to="{ name: 'register-page' }" class="font-pri leading-6 text-gray-600 hover:text-gray-400">
          Sign Up here</RouterLink>
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