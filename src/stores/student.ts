import StudentService from "@/services/StudentService";
import type { StudentItem } from "@/type";
import axios from "axios";
import { defineStore } from "pinia";
import { useAdvisorStore } from "./advisor";


export const useStudentStore = defineStore('student', {
    state: () => ({
        students: [] as StudentItem[]
    }),
    getters: {
        getStudent: (state) => state.students,
        getStudentByPage: (state) => (perPage: number, page: number) => {
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            return state.students.slice(startIndex, endIndex);
        },
        getStudentById: (state) => async (id: string) => {
            const response = state.students.find(student => student.id == id)
            return new Promise<StudentItem | null>((resolve) => {
                resolve(response || null)
            })
        },

        getStudentsByAdvisorId: (state) => async (advisorId: string) => {
            const advisorStore = useAdvisorStore();
            const advisor = advisorStore.getAdvisorById(advisorId);

            if (!advisor) {
                return Promise.resolve([]);
            }

            const students = state.students.filter(student => {
                return Array.isArray(student.advisor) && student.advisor.includes(advisorId);
            });
            return Promise.resolve(students);
        },
    },
    actions: {
        setStudent(students: StudentItem[]) {
            this.students = students
        },
        async fetchStudents() {
            try {
                return this.students
            } catch (error) {
                console.log(error)
                return null
            }

        },
        async fetchStudentsFromDB() {
            const response = await StudentService.getAllStudents()
            this.setStudent(response.data)
        },
        async fetchStudentById(id: string) {
            try {
                const response = this.getStudentById(id)
                return response
            } catch (error) {
                console.log(error)
                return null
            }
        },
        async fetchStudentsByAdvisor(id: string) {
            const response = await StudentService.getStudentsByAdvisor(id)
            this.setStudent(response.data)
        },
        async addStudent(student: StudentItem) {
            try {
                const requestData = {
                    name: student.name,
                    lastName: student.lastName,
                    id: student.id,
                    profileimage: student.profileimage,
                    courselist: student.courselist,
                    advisorID: student.advisorID,
                    comment: student.comment,
                };
                const response = await axios.post(import.meta.env.VITE_BASE_URL_STUDENT, requestData);

                if (response.status === 201) {
                    this.students.push(student); 
                } else {
                    console.error('Fail to uplode the data');
                }
            } catch (error) {
                console.error('fail to call API', error);
            }
        },


    }
})