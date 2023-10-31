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
    advisorStore.getAdvisorById(response?.advisorID!)
    .then((responseT) => {
        advisor.value = responseT
    })
})

</script>

<template>
    <div v-if="student">
        <div class="text-lg text-center text-black font-sans hover:font-serif flex flex-col p-4">
        </div>
        <RouterView :student="student" :advisor="advisor"></RouterView>
        <RouterLink :to="{ name: 'connect-student', params: { id: student?.id } }">connect-student</RouterLink>

    </div>
</template>