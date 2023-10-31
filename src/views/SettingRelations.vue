<script setup lang="ts">
// import BaseSelectVue from "@/components/BaseSelect.vue";
import BaseInput from "@/components/BaseInput.vue";
const advisor = ref<AdvisorData[]>([]);
AdvisorService.getAdvisorBy().then((response) => {
  advisor.value = response.data;
});
function updateKeyword(value: string) {
  let queryFunction;
  if (keyword.value === "") {
    queryFunction = AdvisorService.getAdvisors(6, 1);
  } else {
    queryFunction = AdvisorService.getAdvisorByKeyword(keyword.value, 6, 1);
  }
  queryFunction.then((response: AxiosResponse<AdvisorData[]>) => {
    advisor.value = response.data;
  });
}
</script>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { type StudentConnect, type AdvisorData } from "@/type"; // Import the interfaces
import { type ResponseData } from "@/ResponseData";
import StudentService from "@/services/StudentService";
import AdvisorService from "@/services/AdvisorService";
import { type AxiosResponse } from "axios";
const keyword = ref("");
export default defineComponent({
  name: "student",
  data() {
    return {
      currentStudent: {} as StudentConnect,
      selectedData: {} as AdvisorData,
      message: "",
    };
  },
  methods: {
    getStudet(id: any) {
      StudentService.getStudentById(id)
        .then((response: ResponseData) => {
          this.currentStudent = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    updateStudent() {
      let data = {
        id: this.currentStudent.id,
        name: this.currentStudent.name,
        surname: this.currentStudent.surname,
        advisor: {
          id: this.currentStudent.advisor.id,
          name: this.currentStudent.advisor.name,
        },
      };
      StudentService.updateStudentById(this.currentStudent.id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message =
            "Setting the student relationship with Prof " +
            this.selectedData.name +
            " was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    selectAdvisor(selectedAdvisor: AdvisorData) {
      this.currentStudent.advisor.id = selectedAdvisor.id;
      this.currentStudent.advisor.name = selectedAdvisor.name;
      this.selectedData = selectedAdvisor;
    },

    searchAdvisor(keyword: any) {
      AdvisorService.getAdvisorByKeyword(keyword, 10, 1) // Adjust the perPage and page values as needed
        .then((response) => {
          advisor.value = response.data;
        })
        .catch((error) => {
          console.error("Error fetching advisors:", error);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getStudet(this.$route.params.id);
  },
});
</script>

<template>
  <div v-if="currentStudent.id">
    <form class="bg-white shadow-md rounded-lg p-6">
      <div class="mb-4">
        <label for="Name" class="block text-gray-700 font-bold mb-2"
          >Name</label
        >
        <input
          type="text"
          v-model="currentStudent.name"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div class="mb-4">
        <label for="Surname" class="block text-gray-700 font-bold mb-2"
          >Surname</label
        >
        <input
          id="description"
          v-model="currentStudent.surname"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <label for="Select Advisor" class="block text-gray-700 font-bold mb-2"
        >Select Advisor</label
      >
      <BaseInput
        v-model="keyword"
        placeholder="Search..."
        @input="updateKeyword"
        class="w-full px-3 py-2 rounded-lg p-2 border"
      />
      <div v-if="advisor.length > 0">
        <ul class="flex flex-wrap">
          <li v-for="adv in advisor" :key="adv.id">
            <button
              @click.prevent="selectAdvisor(adv)"
              class="py-2 px-4 rounded border hover:bg-gray-100 mr-2 mt-5"
              :class="{ 'bg-blue-200': adv.id === selectedData.id }"
            >
              {{ adv.name }}
            </button>
          </li>
        </ul>
      </div>
    </form>
    <div class="mb-5" v-if="message">
      <p class="text-red-600 p-3 border border-red-600 rounded">
        {{ message }}
      </p>
    </div>
    <div class="flex justify-center">
      <button
        type="submit"
        class="mt-3 bg-red-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
        @click="updateStudent"
      >
        Update
      </button>
    </div>
  </div>
</template>