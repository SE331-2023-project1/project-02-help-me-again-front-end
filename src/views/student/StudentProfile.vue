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
import AdvisorService from '@/services/AdvisorService'
import { type AdvisorItem } from '@/type'
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

const student = ref<StudentItem | null>(null)
const advisor = ref<AdvisorItem | null>(null)

let advisorId = ''
let advisorName = ''
let advisorLastName = ''
let advisorImages = ''

let images = ''

// student.value = useStudentStore().getStudentById(authStore.id);
// console.log(student.value);

// useStudentStore().getStudentById(authStore.id).then((response) => {
//     student.value = response
//     console.log(student.value)
// })

onMounted(async () => {
  try {
    const res = await StudentService.getStudentById(authStore.id)
    student.value = res.data

    const responseAdvisor = await AdvisorService.getAdvisorById(student.value.advisor.id)
    advisor.value = responseAdvisor.data;
    console.log(student.value, advisor.value);

  } catch (error) {
    console.error('Error fetching student data:', error);
  }
});

const validationSchema = yup.object({
  id: yup.string()
    .required('Enter ID'),
  firstName: yup
    .string()
    .required('Enter firstName '),
  lastName: yup
    .string()
    .required('Enter lastName'),
  images: yup.array().required("Image is required")
})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    id: student.value?.id,
    username: student.value?.username,
    firstName: student.value?.firstName,
    lastName: student.value?.lastName,
    images: student.value?.images
  }
})

// console.log(student.value.data)

const { value: id } = useField<string>('id')

const { value: username } = useField<string>('username')

const { value: firstName } = useField<string>('firstName')

const { value: lastName } = useField<string>('lastName')

// const { value: images } = useField<string[]>('images')



// Function to save changes and exit edit mode
const saveChanges = () => {
  // Add your logic to save changes here
  isEditing.value = false;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    // console.log(values)

    await authStore.studentUpdateProfile(values.id, values.firstName, values.lastName);

    storeMessage.updateMessage('Complete profile update');
    setTimeout(() => {
      storeMessage.resetMessage();
    }, 4000);
    // router.push({ name: 'home-page' });
  } catch (error) {
    storeMessage.updateMessage('Profile update failed');
    setTimeout(() => {
      storeMessage.resetMessage();
    }, 3000);
  }
});

const showConfirmation = () => {
  if (confirm("Confirm to post the announcement")) {
    saveAndSubmitForm();
  }
};

// Function to save changes and submit the form
const saveAndSubmitForm = async () => {
  saveChanges(); // Call the saveChanges function
  // You can set a different message here based on your needs
  const successMessage = 'Save changes completely.';
  const errorMessage = 'Save changes failed.';

  try {
    await onSubmit();
    console.log(onSubmit())
    storeMessage.updateMessage(successMessage);
    setTimeout(() => {
      storeMessage.resetMessage();
      location.reload()
    }, 4000);
  } catch (error) {
    storeMessage.updateMessage(errorMessage);
    setTimeout(() => {
      storeMessage.resetMessage();
      location.reload()
    }, 3000);
  }
};


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

    <div
      class="mt-2 mb-10 font-fig flex flex-col items-center justify-center p-3 w-3/4 sm:w-2/4 h-auto text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">
      <div class="flex flex-col items-center justify-center py-4 space-y-5">
        <img class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
          :src="student?.images[0]" alt="Profile Picture" />
        <!-- <div class="flex justify-center"> -->
        <!-- Change Profile button -->
        <!-- <button href="/updatestudents" v-if="isEditing" @click="changePicture"
            class="flex mt-2 text-white bg-gray-400 hover:bg-gray-600 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center justify-center items-center"> -->
        <!-- <img src="src/assets/save.png" class="h-[15px] mr-2"> -->
        <!-- Change Profile Picture
          </button>
        </div> -->
      </div>

      <div v-if="advisorId">
        <p class="font-fig text-sm font-semibold text-indigo-900 mb-2">Advisor:</p>

        <RouterLink :to="{ name: 'advisor-detail', params: { id: advisorId } }">
          <button
            class="mb-2 bg-amber-300 hover:bg-amber-400 text-black shadow-md
            font-bold py-2 px-5 rounded-xl font-fig hover:transform hover:scale-[1.05] transition-transform duration-100">
            <div class="flex justify-center items-center ">
              <img :src="advisorImages" class="w-10 h-10 object-cover rounded-full mr-2">
              <div class="flex flex-col">
                <span class="advisorid font-fig text-left text-sm font-semibold">{{ advisorName }} {{ advisorLastName
                }}</span>
                <!-- <span class="advisorid font-fig text-left">Advisor ID: {{ student.advisor.id }}</span> -->
              </div>
            </div>
          </button>
        </RouterLink>
      </div>

      <div class="items-center mt-4 mb-2 lg:mb-2 lg:mt-2 w-full text-[#202142]">
        <div class="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 ">
          <div class="items-center mt-4 lg:mb-2 lg:mt-2 w-full text-[#202142]">


            <span class="font-bold text-black my-2"> Student ID: {{ student?.username }}</span><br>
            <span class=" text-lg text-black"> Name: {{ student?.firstName }} {{ student?.lastName }}</span><br>

            <hr class="font-bold mt-2 py-3" />
            <div v-if="advisor">
              <span class="font-bold text-gray-600">Advisor</span><br>
              <span class=" text-lg text-black"> Name: {{ advisor.firstName }} {{ advisor.lastName }}</span>
              <img class="object-cover w-40 h-40 p-1 rounded-full ring-2 mx-auto mt-2 ring-indigo-300 dark:ring-indigo-500"
                :src="advisor.images[0]" alt="Profile Picture" />
            </div>


            <!-- <form class="" @submit.prevent="onSubmit">

              <div
                class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                  <label for="studentid" class="block mb-2 text-sm font-semibold text-indigo-900">
                    Student ID</label>
                  <input type="text" id="studentid" disabled
                    class="bg-gray-300 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="" v-model="username" required>
                </div>

                <div class="w-full">
                  <label for="username" class="block mb-2 text-sm font-semibold text-indigo-900">
                    Username</label>
                  <input type="text" id="username" disabled
                    class="bg-gray-300 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="" v-model="username" required>
                </div>


              </div>
              <div
                class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                  <label for="first_name" class="block mb-2 text-sm font-semibold text-indigo-900">
                    First name</label>
                  <input type="text" id="first_name" :disabled="!isEditing"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="" v-model="firstName" required>
                </div>

                <div class="w-full">
                  <label for="last_name" class="block mb-2 text-sm font-semibold text-indigo-900 ">
                    Last name</label>
                  <input type="text" id="last_name" :disabled="!isEditing"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="" v-model="lastName" required>
                </div>
              </div>

              <div
                class="flex flex-col items-center mb-5 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                  <label for="department" class="block mb-2 text-sm font-semibold text-indigo-900">
                    Department</label>
                  <input type="text" id="department" disabled
                    class="bg-gray-300 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="" v-model="department" required>
                </div>

              </div>

              <div class="flex justify-center">
             
                <button v-if="!isEditing" @click="enterEditMode"
                  class="flex text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center justify-center items-center">
                  <img src="../../assets/edit.png" class="h-[15px] mr-2">
                  Edit
                </button>

                <button v-if="isEditing" disabled
                  class="flex opacity-50 text-white bg-gray-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center items-center justify-center">
                  <img src="../../assets/edit.png" class="h-[15px] mr-2">
                  Edit
                </button>
              </div>
              <div class="flex justify-center">
                <button href="/updatestudents" v-if="isEditing" @click="showConfirmation"
                  class="flex mt-2 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center justify-center items-center">
                  <img src="../../assets/save.png" class="h-[15px] mr-2">
                  Save
                </button>
              </div>

            </form> -->

          </div>
        </div>


      </div>


    </div>
  </main>
</template>
