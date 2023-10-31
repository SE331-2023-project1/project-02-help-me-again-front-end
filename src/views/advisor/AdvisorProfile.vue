<script setup lang="ts">
import { type StudentItem } from '@/type'
import { computed, onMounted, type PropType } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useAdvisorStore } from '@/stores/advisor'
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import StudentService from '@/services/StudentService'
import { type AdvisorItem } from '@/type'
import AdvisorService from '@/services/AdvisorService'
// Import the ref and computed functions from Vue

// Define a reactive property to track if the form is in edit mode
let isEditing = ref(false);

// Function to enter edit mode
const enterEditMode = () => {
  isEditing.value = true;
};

// // Create a computed property for the button label
// const buttonLabel = computed(() => (isEditing.value ? 'Save' : 'Edit'));

// // Create a computed property for the button color
// const buttonColor = computed(() => (isEditing.value ? 'bg-emerald-500 focus:ring-emerald-300' : 'bg-indigo-500'));

// Create a computed property for the button image source
// const buttonImage = computed(() => (isEditing.value ? 'src/assets/save.png' : 'src/assets/edit.png'));

const authStore = useAuthStore()
const router = useRouter()
const storeMessage = useMessageStore()

const { message } = storeToRefs(storeMessage)

// const student = ref<StudentItem | null>(null)
const advisor = ref<AdvisorItem | null>(null)

AdvisorService.getAdvisorById(authStore.id).then((res) => {
  advisor.value = res.data as AdvisorItem
})


</script>

<template>
  <!-- Flash message -->
  <div id="flashMessage" class="mb-2 animate-pulse text-center text-base font-fig bg-green-500 font-fig text-white"
    v-if="message">
    <h4>{{ message }}</h4>
  </div>
  <main class="flex flex-col items-center justify-center">
    <div class="font-fig flex items-center justify-center p-3 w-3/4 sm:w-2/4 h-4/5 text-2xl font-bold text-gray-900">
      Profile
    </div>

    <div v-if="advisor"
      class="mt-2 mb-10 font-fig flex flex-col  p-3 w-3/4 sm:w-2/4 h-auto text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">
      <span class="text-lg text-black"> Name: {{ advisor.firstName }} {{ advisor.lastName }}</span><br>

      <img class="object-cover w-40 h-40 p-1 rounded-full ring-2 mx-auto mt-2 ring-indigo-300 dark:ring-indigo-500"
        :src="advisor.images[0]" alt="Profile Picture" />
    </div>
  </main>
</template>
