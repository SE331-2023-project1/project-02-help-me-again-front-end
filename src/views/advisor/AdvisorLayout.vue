<script setup lang="ts">
import { ref } from 'vue'
import { useAdvisorStore } from '@/stores/advisor'
import { useStudentStore } from '@/stores/student'
import { type AdvisorItem } from '@/type'
import { type StudentItem } from '@/type'
import { storeToRefs } from 'pinia'
import StudentService from "@/services/StudentService";

const props = defineProps({
  id: {
    type: String
  }
})

const advisors = ref<AdvisorItem | null>(null)
const students = ref<StudentItem[]>([])

const advisorStore = useAdvisorStore()
const storeStudent = useStudentStore()

advisorStore.getAdvisorById(props.id!).then((response) => {
  advisors.value = response
})

StudentService.getStudentsByAdvisor(props.id!).then((response) => {
  students.value = response
  // console.log(response)
})
// console.log(students.value)
</script>

<template>
  <div v-if="students">
    <div class="text-lg text-center text-black font-sans hover:font-serif flex flex-col p-4">
      <!-- <RouterLink :to="{name: 'advisor-detail', params: { id }}">Details</RouterLink> -->
    </div>
    <RouterView :advisor="advisors" :students="students"></RouterView>
  </div>
</template>
@/stores/advisor