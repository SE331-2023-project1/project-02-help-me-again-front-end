<script setup lang="ts">
import type { AnnouncementItem } from '@/type';
import {PropType} from 'vue'
import FileCard from './FileCard.vue';

defineProps({
    announcement: {
        type: Object as PropType<AnnouncementItem>,
        required: true
    }
})

</script>

<template>
     <div class="bg-white rounded-lg mt-4 shadow-md p-6">
        
        <div class="mb-1">
            <h1 class="text-3xl font-bold text-gray-900">{{ announcement.title }}</h1>
        </div>

        <div class="bg-white rounded-lg p-6">
            {{ announcement.description }}          
        </div>
        
        <FileCard v-for="file in announcement.files" :url="file" :key="file" />
      </div>
</template>