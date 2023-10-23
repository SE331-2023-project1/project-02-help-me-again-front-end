import AdvisorService from "@/services/AdvisorService";
import type { AdvisorItem } from "@/type";
import axios from "axios";
import { defineStore } from "pinia";

export const useAdvisorStore = defineStore('advisor', {
    state: () => ({
        advisors: [] as AdvisorItem []
    }),
    getters: {
        getAdvisors: (state) => state.advisors,
        getAdvisorByPage: (state) => (perPage: number, page: number) => {
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            return state.advisors.slice(startIndex, endIndex);
        },
        getAdvisorById: (state) => async (id: string) => {
            const response = state.advisors.find(advisor => advisor.id == id)
            // console.log(response)
            return new Promise<AdvisorItem | null>((resolve) => {
                resolve(response || null)
            })
        }
        // getAdvisorById: (state) => (id: string) => {
        //     return new Promise<AdvisorItem | undefined>((resolve, reject) => {
        //         const advisor = state.advisors.find(advisor => advisor.advisorId === id);
        //         if (advisor) {
        //             resolve(advisor);
        //         } else {
        //             const error = new Error('Advisor not found');
        //             // Custom status for the error
        //             (error as any).status = 404;
        //             reject(error);
        //         }
        //     });
        // },
    },
    actions: {
        setAdvisor(advisors: AdvisorItem[]) {
            this.advisors = advisors
        },
        fetchAdvisors() {
            // const response = this.getAdvisors
            try {
                return this.advisors
            } catch (error) {
                console.log(error)
                return null
            }

            // this.setAdvisor(response)
            
        },
        async fetchAdvisorsFromDB() {
            const response = await AdvisorService.getAllAdvisors()
            // try {
            //     return response.data
            // } catch (error) {
            //     console.log(error)
            //     return null
            // }

            this.setAdvisor(response.data)
            
        },
        async fetchAdvisorById(id: string) {
            try {
                const response = this.getAdvisorById(id)
                return response
            } catch (error) {
                console.log(error)
                return null
            }
        },
        async fetchAdvisorrByPage(perPage: number, page: number) {
            try {
                const response = this.getAdvisorByPage(perPage, page)
                return response
            } catch (error) {
                console.log(error)
                return null
            }
        },
        // ส่วนของ useAdvisorStore
        async addAdvisor(advisor: AdvisorItem) {
            try {
              // สร้างข้อมูล requestData
              const requestData = {
                id: advisor.id,
                studentsId: advisor.studentsId,
                name: advisor.name,
                surname: advisor.surname,
                profileimage: advisor.profileimage,
              };
          
              // ส่ง POST request ไปยัง URL ของ API สำหรับการเพิ่มครู
              const response = await axios.post(import.meta.env.VITE_BASE_URL_ADVISOR, requestData);


          
              if (response.status === 201) {
                // การเพิ่มครูสำเร็จ
                this.advisors.push(advisor)
                // console.log(this.getAdvisors)
              } else {
                // การเพิ่มครูไม่สำเร็จ
                console.error('การเพิ่มครูไม่สำเร็จ');
              }
            } catch (error) {
              console.error('เกิดข้อผิดพลาดในการส่งคำขอหรือตอบกลับจาก API:', error);
            }
          },
  
        
    }
})