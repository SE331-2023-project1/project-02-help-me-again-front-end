<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
    <div class="flex flex-col font-pri items-center justify-center text-black my-8">
        <h1 class="text-3xl font-bold">Uh-oh!</h1>
        <h3 class="text-center mt-1 text-xl">
            It looks like have some network issues, wait a second <br> and
            <a href="#" @click="router.go(-1)" class="text-red-600 font-semibold">click here</a>
            to try again.
        </h3>
        <p class="text-center mt-1 text-lg">Can't get the data from the server.</p>
        <p class="text-center mt-1 text-lg">Please try again later.</p>
    </div>
    
</template>