<script setup lang="ts">

defineProps({
    resource: {
        type: String,
        required: true,
        default: 'page'
    }
})

</script>

<template>
    
    <div class="flex flex-col items-center justify-center my-5 p-4 bg-gray-100">
      <img src="../assets/404-error.png" class="notfound">
      <h1 class="text-3xl text-gray-600 font-bold font-pri mb-3">Oops! Something went wrong</h1>
      <h3 class="text-2xl text-gray-600 text-center font-bold font-pri">The {{ resource }} you're looking for is not here</h3>
      <RouterLink :to="{ name: 'home-page' }" class="mt-3">
        <button class="text-white mt-2 bg-gray-700 hover:bg-gray-400 font-pri py-3 px-7 shadow-md rounded-full">
          Go Back
        </button>
      </RouterLink>
    </div>
  </template>
  
  
