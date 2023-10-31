<script setup lang="ts">
import AnnouncementCard from '@/components/AnnouncementCard.vue';
import { useAnnouncementStore } from '@/stores/announcement';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

  const announcementStore = useAnnouncementStore()

  const announcements = ref(announcementStore.getAnnouncement)

  const photos = [
                'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&q=80&w=2938&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&q=80&w=2767&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ]
        const selectedPhoto = ref<Number>(0)

        const showPhoto = (i) => {
          selectedPhoto.value = i
        }
        const closePhotoPopup = () => {
          selectedPhoto.value = 0
        }
        const nextPhoto = () => {
          if (selectedPhoto.value < photos.length - 1) {
            selectedPhoto.value++;
          } else {
            selectedPhoto.value = 0; // Loop back to the first photo
          }
        }
        const prevPhoto = () => {
          if (selectedPhoto.value > 0) {
              selectedPhoto.value--;
          } else {
              selectedPhoto.value = photos.length - 1; // Loop to the last photo
          }
        }

// import { type AnnouncementItem } from '@/type'
// import { computed, ref, watchEffect, type Ref , onMounted } from 'vue';
// import AnnouncementService from '@/services/AnnouncementService';
// import NProgress from 'nprogress'
// import { onBeforeRouteUpdate, useRouter,useRoute  } from 'vue-router'
// import type { AxiosResponse } from 'axios';
// import {useAnnouncementStore} from '@/stores/announcement';

// const router = useRouter
// const store = useStudentStore();
// const route = useRoute();

// const announcements: Ref<Array<AnnouncementItem>> = ref([])
// const totalAnnouncement = ref<number>(10)
</script>

<template>
  <main class="p-6 min-h-screen font-pri">
    <div class="max-w-screen-lg mx-auto" v-if="announcements">
      <AnnouncementCard v-for="announcement in announcements" :announcement="announcement" :key="announcement.id"></AnnouncementCard>
    </div>
  </main>
</template>
