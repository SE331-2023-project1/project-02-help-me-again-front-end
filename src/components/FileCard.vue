<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { string } from 'yup';


const prop = defineProps({
    url: string
})
console.log(prop.url);


</script>

<template>
    <a :href="url" target="_blank">
        <div class="bg-white m-2 border showdow-md flex"> 
            <img class="w-10 h-10 py-2" src="../assets/announce.png" />
            Attachment
        </div>
    </a>
</template>