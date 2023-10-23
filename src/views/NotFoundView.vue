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
    <div class="flex flex-col items-center justify-center my-5">
        <img src="../assets/404-error.png" class="notfound">
        <h1 class="text-3xl text-pink-600 font-bold font-fig mb-3">Oop! Something wrong</h1>
        <h3 class="text-2xl text-pink-600 text-center font-bold font-fig">The {{ resource }} you're looking for is not here</h3>
        <RouterLink :to="{name: 'home-page'}" class="mt-3">
            <button class="text-white mt-2 bg-pink-700 hover:bg-pink-400 font-fig py-3 px-7 shadow-md rounded-full">
                Go Back</button>
            </RouterLink>
    </div>
    
</template>
