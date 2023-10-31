<template>
  <div class="flex flex-col p-3 w-3/4 h-4/5 border border-gray-700 rounded-lg mb-4 bg-gray-100 shadow-md my-5 mx-auto">
    <div class="font-pri mx-5 text-black">
      <h1 class="flex justify-center font-pri text-2xl mb-3 text-gray-600">Add Person</h1>
      <div class="flex mb-3 justify-center items-center">
        <label class="my-auto" for="personType">Select Person Type:</label>
        <select v-model="selectedPersonType" id="personType"
          class="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5">
          <option value="student">Student</option>
          <option value="advisor">Advisor</option>
        </select>
      </div>

      <div v-if="selectedPersonType === 'student'">
        <form @submit.prevent="addStudent">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex mb-3">
              <label for="studentName" class="my-auto mx-auto">First Name:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
                v-model="studentName" type="text" id="studentName" required pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed)." />
            </div>

            <div class="flex mb-3">
              <label for="studentLastName" class="my-auto mx-auto">Last name:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
                v-model="studentLastName" type="text" id="studentLastName" required pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed)." />
            </div>
          </div>

          <div class="mb-3">
            <label for="student id" class="mr-2">Student ID:</label>
            <input placeholder="642115000"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
              v-model="username">
          </div>

          <div class="mb-3">
            <label for="Email" class="mr-2">Email:</label>
            <input placeholder="email"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
              v-model="email">
          </div>

          <div class="mb-3">
            <label for="Password" class="mr-2">Password:</label>
            <input placeholder="Password" type="password"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
              v-model="password">
          </div>

          <div class="mb-3">
            <label for="studentProfileImage" class="mr-2">Profile Image:</label>
            <ImageUpload v-model="images" :max="1" />
          </div>


          <div class="grid grid-cols-2 gap-4">
            <div class="flex mb-3 mx-auto">

              <label for="studentCourseList" class="my-auto ">Course List:</label>
              <select
                class="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
                v-model="studentCourseList" id="studentCourseList" required>
                <option value disabled>Select Course</option>

                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Physics">Physics</option>
                <option value="ComSci">ComSci</option>
                <option value="Art">Art</option>
                <option value="Music">Music</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Spanish">Spanish</option>
                <option value="Literature">Literature</option>
                <option value="PolSci">PolSci</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Sports">Sports</option>
                <option value="PE">PE</option>
                <option value="Drama">Drama</option>
                <option value="Astronomy">Astronomy</option>
                <option value="Languages">Languages</option>


              </select>



            </div>


            <div class="flex mb-3 mx-auto">
              <label for="studentAdvisor" class="my-auto ">Advisor:</label>
              <select
                class="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
                v-model="studentAdvisor" id="studentAdvisor">
                <option value="" disabled>Select a Advisor</option>
                <option v-for="advisorOption in advisorList" :value="advisorOption.id">{{ advisorOption.firstName }}
                </option>

              </select>

            </div>
          </div>

          <div id="flashMessage" class="mb-2 animate-pulse text-center text-base font-pri bg-gray-500 font-pri text-white"
            v-if="message">
            <h4>{{ message }}</h4>
          </div>
          <FlashMessage />
          <div class="flex justify-center mb-2">
            <button class="bg-green-500 hover:bg-green-700 shadow-md px-2 py-1
            rounded-lg font-pri text-white" type="submit">Add Student</button>
          </div>
        </form>
      </div>

      <div v-else-if="selectedPersonType === 'advisor'">

        <form @submit.prevent="addAdvisor">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex mb-3">
              <label for="advisorName" class="mr-2 my-auto">Name:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
                v-model="advisorName" type="text" id="advisorName" required pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed).">
            </div>

            <div class="flex mb-3">
              <label for="advisorLastName" class="mr-2 my-auto">Last name:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
                v-model="advisorLastName" type="text" id="advisorLastName" required pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed).">
            </div>
          </div>


          <div class="mb-3">
            <label for="advisorProfileImage" class="mr-2">Profile Image</label>
            <ImageUpload v-model="images" :max="1" />
          </div>

          <div class="mb-3">
            <label for="Username" class="mr-2">Username:</label>
            <input placeholder="Username"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
              v-model="username">
          </div>

          <div class="mb-3">
            <label for="Email" class="mr-2">Email:</label>
            <input placeholder="email"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
              v-model="email">
          </div>

          <div class="mb-3">
            <label for="Password" class="mr-2">Password:</label>
            <input placeholder="Password" type="password"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"
              v-model="password">
          </div>

          <div id="flashMessage" class="mb-2 animate-pulse text-center text-base font-pri bg-gray-500 font-pri text-white"
            v-if="message">
            <h4>{{ message }}</h4>
          </div>
          <FlashMessage />
          <div class="flex justify-center mb-2">
            <button class="bg-green-500 hover:bg-green-700 shadow-md px-2 py-1
            rounded-lg font-bold text-white" type="submit">Add Advisor</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useStudentStore } from '@/stores/student';
import { useAdvisorStore } from '@/stores/advisor';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
import AdvisorService from '@/services/AdvisorService';
import StudentService from '@/services/StudentService';
import { AdvisorItem } from '@/type';
import ImageUpload from '@/components/ImageUpload.vue';

const username = ref('')
const email = ref('')
const password = ref('')

const selectedPersonType = ref('student');
const studentName = ref('');
const studentLastName = ref('');
const studentProfileImage = ref('');
const studentCourseList = ref('');
const studentAdvisor = ref('');

const advisorName = ref('');
const advisorLastName = ref('');
const advisorProfileImage = ref('');
const advisorStudents = ref('');

const router = useRouter();

const storeMessage = useMessageStore()
const { message } = storeToRefs(storeMessage)

const advisorList = ref<AdvisorItem[]>([])
AdvisorService.getAllAdvisors().then(res => {
  advisorList.value = res.data as AdvisorItem[]
})

const images = ref<string[]>([])

const addStudent = () => {
  const store = useStudentStore();

  const generateRandomID = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const newStudent = {
    firstName: studentName.value as string,
    lastName: studentLastName.value as string,
    id: generateRandomID().toString(),
    images: images.value,
    courselist: studentCourseList.value.split(',').map(course => course.trim()),
    advisorID: studentAdvisor.value,
    password: password.value as string,
    email: email.value as string,
    username: username.value as string
  };


  StudentService.addStudent(newStudent)
    .then(res => {
      console.log(newStudent);
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })

  storeMessage.updateMessage('You are successfully for adding student.')
  setTimeout(() => {
    storeMessage.resetMessage()
  }, 4000)


  clearStudentForm();
};

const fetchAdvisors = () => {

  const advisorStore = useAdvisorStore();
  advisorStore.fetchAdvisors();

  console.log(advisorStore.getAdvisors)

};

const addAdvisor = () => {
  const storeAdvisor = useAdvisorStore();

  const generateRandomTID = () => {
    const min = 100;
    const max = 999;
    const randomThreeDigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return `T${randomThreeDigitNumber}`;
  };

  const newAdvisor = {
    firstName: advisorName.value as string,
    lastName: advisorLastName.value as string,
    id: generateRandomTID().toString(),
    images: images.value,
    roles: [],
    password: password.value as string,
    email: email.value as string,
    username: username.value as string
  };


  AdvisorService.addAdvisor(newAdvisor)
    .then(res => {
      console.log(newAdvisor);

      console.log("Successs");

      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })

  // storeAdvisor.addAdvisor(newAdvisor);
  // console.log(newAdvisor)


  fetchAdvisors();

  storeMessage.updateMessage('You are successfully for adding advisor.')
  setTimeout(() => {
    storeMessage.resetMessage()
  }, 4000)

  clearAdvisorForm();
};


const clearStudentForm = () => {
  studentName.value = '';
  studentLastName.value = '';
  studentProfileImage.value = '';
  studentCourseList.value = '';
  studentAdvisor.value = '';

};

const clearAdvisorForm = () => {
  advisorName.value = '';
  advisorLastName.value = '';
  advisorProfileImage.value = '';
  advisorStudents.value = '';
};
</script>

