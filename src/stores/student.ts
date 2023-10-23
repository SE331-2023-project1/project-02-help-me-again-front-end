import StudentService from "@/services/StudentService";
import type { StudentItem } from "@/type";
import axios from "axios";
import { defineStore } from "pinia";
import { useAdvisorStore } from "./advisor";


export const useStudentStore = defineStore('student', {
    state: () => ({
        students: [] as StudentItem []
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
            // console.log(state.students[0].id)
            // console.log(response)
            return new Promise<StudentItem | null>((resolve) => {
                resolve(response || null)
            })
            // const response = state.students.filter(student => student.id === id)
            // console.log(state.students)
            // return Promise.resolve(response)
        },
        getStudentsByAdvisorId: (state) => async (advisorId: string) => {
            const advisorStore = useAdvisorStore();
            const advisor = advisorStore.getAdvisorById(advisorId);

            if (!advisor) {
                return Promise.resolve([]); 
            }

            // const students = state.students.filter(student => student.advisor.id == advisorId);
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
            // console.log(response)
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
            // console.log(response)

        },
        async addStudent(student: StudentItem) {
            try {
              // สร้างข้อมูล requestData
              const requestData = {
                name: student.name,
                surname: student.surname,
                id: student.id,
                profileimage: student.profileimage,
                courselist: student.courselist,
                advisorID: student.advisorID,
                comment: student.comment,
              };
          
              // ส่ง POST request ไปยัง URL ของ API สำหรับการเพิ่มนักเรียน
              const response = await axios.post(import.meta.env.VITE_BASE_URL_STUDENT, requestData);
          
              if (response.status === 201) {
                // การเพิ่มนักเรียนสำเร็จ
                this.students.push(student); // เพิ่ม student ใน array
              } else {
                // การเพิ่มนักเรียนไม่สำเร็จ
                console.error('การเพิ่มนักเรียนไม่สำเร็จ');
              }
            } catch (error) {
              console.error('เกิดข้อผิดพลาดในการส่งคำขอหรือตอบกลับจาก API:', error);
            }
        },
  
        
    }
})