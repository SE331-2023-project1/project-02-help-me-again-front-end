<script setup lang="ts">
import type { AdvisorItem } from '@/type'
import type { PropType } from 'vue'

defineProps({
  advisor: {
    type: Object as PropType<AdvisorItemItem>,
    require: true
  }
})
</script>

<template>
  <RouterLink :to="{ name: 'advisor-detail', params: { id: advisor?.id } }">
    <div class="advisor-class flex flex-col items-center justify-center">
      <div
        class="grid gap-5 grid-cols-2 p-5 w-80 h-[130px] cursor-pointer border border-gray-700 rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:bg-gray-100 bg-white"
      >
        <div class="flex justify-center items-center">
          <img :src="advisor?.profileimage" alt="" class="w-24 h-24 object-cover rounded-full" />

        </div>
        <div class="">
          <span class="text-xs text-gray-500">ID: {{ advisor?.id }}</span> <br />

          <span class="font-bold text-black"> {{ advisor?.name }} {{ advisor?.surname }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
