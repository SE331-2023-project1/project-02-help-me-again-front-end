<template>
  <div class="flex flex-col p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg mb-4 bg-white shadow-md my-5 mx-auto">

    <div class="font-fig mx-5 text-black">
      <h1 class="flex justify-center font-bold text-2xl mb-3 text-green-600">Add Person</h1>
      <div class="flex mb-3">
        <label class="my-auto" for="personType">Select Person Type:</label>
        <select v-model="selectedPersonType" id="personType"
          class="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5">
          <option value="student">Student</option>
          <option value="advisor">Advisor</option>
        </select>
      </div>


      <div v-if="selectedPersonType === 'student'">


        <form @submit.prevent="addStudent">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex mb-3">
              <label for="studentName" class="my-auto mr-2">Name:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                v-model="studentName" type="text" id="studentName" required pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed).">
            </div>

            <div class="flex mb-3">
              <label for="studentSurname" class="my-auto mx-2">Surname:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                v-model="studentSurname" type="text" id="studentSurname" required pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed).">
            </div>
          </div>


          <div class="mb-3">
            <label for="studentProfileImage" class="mr-2">Profile Image URL:</label>
            <input
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
              v-model="studentProfileImage" type="text" id="studentProfileImage" required pattern="https?://.+"
              placeholder="Add link of your picture ('http://..' or 'https://..)"
              title="Must start with 'http://' or 'https://'">
          </div>



          <div class="flex mb-3">

            <label for="studentCourseList" class="my-auto mr-2">Course List:</label>
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
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


          <div class="flex mb-3">
            <label for="studentAdvisor" class="my-auto mr-2">Advisor:</label>
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
              v-model="studentAdvisor" id="studentAdvisor">
              <option value="" disabled>Select a Advisor</option>
              <option value="T123">David Smith</option>
              <option value="T234">Alice Johnson</option>
              <option value="T345">Emily Williams</option>
              <option value="T456">Rose Brown</option>
              <option value="T567">Sarah Miller</option>
              <option value="T678">John Davis</option>
              <option value="T789">Olivia Wilson</option>
              <option value="T890">William Anderson</option>
              <option value="T901">Sophia Martinez</option>
              <option value="T012">Daniel Taylor</option>

            </select>

          </div>




          <div id="flashMessage"
            class="mb-2 animate-pulse text-center text-base font-fig bg-green-500 font-fig text-white" v-if="message">
            <h4>{{ message }}</h4>
          </div>
          <FlashMessage />
          <div class="flex justify-center mb-2">
            <button class="bg-green-500 hover:bg-green-700 shadow-md px-2 py-1
            rounded-lg font-bold text-white" type="submit">Add Student</button>
          </div>
        </form>
      </div>

      <div v-else-if="selectedPersonType === 'advisor'">

        <form @submit.prevent="addAdvisorr">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex mb-3">
              <label for="advisorName" class="mr-2 my-auto">Name:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                v-model="AdvisorName" type="text" id="advisorName" required pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed).">
            </div>

            <div class="flex mb-3">
              <label for="advisorSurname" class="mr-2 my-auto">Surname:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                v-model="AdvisorSurname" type="text" id="advisorSurname" required pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed).">
            </div>
          </div>


          <div class="mb-3">
            <label for="advisorProfileImage" class="mr-2">Profile Image URL:</label>
            <input placeholder="Add link of your picture ('http://..' or 'https://..)"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
              v-model="advisorProfileImage" type="text" id="advisorProfileImage" required pattern="https?://.+"
              title="Must start with 'http://' or 'https://'">
          </div>

          <div id="flashMessage"
            class="mb-2 animate-pulse text-center text-base font-fig bg-green-500 font-fig text-white" v-if="message">
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

const selectedPersonType = ref('student');
const studentName = ref('');
const studentSurname = ref('');
const studentProfileImage = ref('');
const studentCourseList = ref('');
const studentAdvisor = ref('');

const advisorName = ref('');
const advisorSurname = ref('');
const advisorProfileImage = ref('');
const advisorStudents = ref('');

const router = useRouter();

const storeMessage = useMessageStore()
const { message } = storeToRefs(storeMessage)

const addStudent = () => {
  const store = useStudentStore();

  const generateRandomID = () => {
    const min = 100000; 
    const max = 999999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const newStudent = {
    name: studentName.value,
    surname: studentSurname.value,
    id: generateRandomID().toString(), 
    profileimage: studentProfileImage.value,
    courselist: studentCourseList.value.split(',').map(course => course.trim()),
    advisorID: studentAdvisor.value,
  };

  store.addStudent(newStudent); 

  console.log(newStudent)

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
    name: advisorName.value,
    surname: advisorSurname.value,
    id: generateRandomTID().toString(), 
    profileimage: advisorProfileImage.value,
    studentsId: advisorStudents.value,
  };


  storeAdvisor.addAdvisor(newAdvisor);
  console.log(newAdvisor)


  fetchAdvisors();

  storeMessage.updateMessage('You are successfully for adding advisor.')
  setTimeout(() => {
    storeMessage.resetMessage()
  }, 4000)

  clearAdvisorForm();
};


const clearStudentForm = () => {
  studentName.value = '';
  studentSurname.value = '';
  studentProfileImage.value = '';
  studentCourseList.value = '';
  studentAdvisor.value = '';

};

const clearAdvisorForm = () => {
  advisorName.value = '';
  advisorSurname.value = '';
  advisorProfileImage.value = '';
  advisorStudents.value = '';
};
</script>

