<script setup lang="ts">
import AdvisorService from '@/services/AdvisorService';
import StudentService from '@/services/StudentService';
import { useAdvisorStore } from '@/stores/advisor';
import { useStudentProfileStore } from '@/stores/studentProfile'
import { AdvisorItem, StudentItem } from '@/type'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const keyword = ref('')
const selectedAdvisor = ref<AdvisorItem>()
const advisors = ref<AdvisorItem[]>([])

AdvisorService.getAllAdvisors().then( res => {
  advisors.value = res.data
  console.log(advisors.value);
  
})



const stundentProfileStore = useStudentProfileStore()
const student = storeToRefs(stundentProfileStore).student

const onSubmit = () => {
  // student.value.advisor = selectedAdvisor
  StudentService.updateStudent(student.value).then(res => {
    console.log(res.data);
    
  })
}
</script>

<template>
  <div v-if="student">
    <form class="bg-white shadow-md rounded-lg p-6" @submit.prevent="onSubmit">
      <div class="mb-4">
        <label for="Name" class="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          v-model="student.firstName"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div class="mb-4">
        <label for="Surname" class="block text-gray-700 font-bold mb-2">Surname</label>
        <input
          id="description"
          v-model="student.lastName"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      
      <select v-model="student.advisor">
        <option v-for="advisor in advisors" :key="advisor.id" :value="advisor">{{ advisor.firstName }}</option>
      </select>
      
      <button type="submit" >Submit</button>
    </form>
  </div>
</template>
