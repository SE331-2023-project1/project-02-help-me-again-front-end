<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
    <div class="flex flex-col font-pri items-center justify-center text-black my-8">
      <h1 class="text-4xl font-bold text-red-600">Uh-oh!</h1>
      <h3 class="text-center mt-4 text-2xl font-semibold">
        It seems like there are some network issues.
      </h3>
      <p class="text-center mt-2 text-lg">Please wait a moment and</p>
      <p class="text-center text-lg">
        <a href="#" @click="router.go(-1)" class="text-red-600 font-semibold hover:underline">click here</a>
        to try again.
      </p>
      <p class="text-center mt-2 text-lg">If the problem persists, please try again later.</p>
    </div>
  </template>
  