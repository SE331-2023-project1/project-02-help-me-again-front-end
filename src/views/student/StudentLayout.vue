<script setup lang="ts">
import {ref} from 'vue'
import { useStudentStore } from '@/stores/student'
import { useAdvisorStore } from '@/stores/advisor';
import { storeToRefs } from 'pinia'
import type { AdvisorItem, StudentItem } from '@/type';

const props = defineProps({
    id: String
})

const student = ref<StudentItem | null>(null)
const advisor = ref<AdvisorItem | null>(null)

const studentStore = useStudentStore()
const advisorStore = useAdvisorStore()

studentStore.getStudentById(props.id!)
.then((response) =>{
    student.value = response
    // console.log(props.id)
    advisorStore.getAdvisorById(response?.advisorID!)
    .then((responseT) => {
        advisor.value = responseT
    })
})

// console.log(studentStore.getStudentById(props.id))

// advisorStore.getAdvisorById(student.value?.advisorID!)
// .then((response) => {
//     advisor.value = response
// })

// console.log(student.value)

// const students = storeToRefs(studentStore).students
// const advisors = storeToRefs(advisorStore).advisors
// const id = ref(students?.value?.id)


// console.log(students.value)
// console.log(students.value?.surname)
</script>

<template>
    <div v-if="student">
        <div class="text-lg text-center text-black font-sans hover:font-serif flex flex-col p-4">
            <!-- <RouterLink :to="{name: 'student-detail', params: { id }}">Details</RouterLink> -->
        </div>
        <RouterView :student="student" :advisor="advisor"></RouterView>

    </div>
</template>@/stores/advisor