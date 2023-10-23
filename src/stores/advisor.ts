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
            return new Promise<AdvisorItem | null>((resolve) => {
                resolve(response || null)
            })
        }
    },
    actions: {
        setAdvisor(advisors: AdvisorItem[]) {
            this.advisors = advisors
        },
        fetchAdvisors() {
            try {
                return this.advisors
            } catch (error) {
                console.log(error)
                return null
            }
            
        },
        async fetchAdvisorsFromDB() {
            const response = await AdvisorService.getAllAdvisors()
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
        async addAdvisor(advisor: AdvisorItem) {
            try {
              const requestData = {
                id: advisor.id,
                studentsId: advisor.studentsId,
                name: advisor.name,
                surname: advisor.surname,
                profileimage: advisor.profileimage,
              };
    
              const response = await axios.post(import.meta.env.VITE_BASE_URL_ADVISOR, requestData);

              if (response.status === 201) {
                this.advisors.push(advisor)
              } else {
                console.error('Fail to uplode the data');
              }
            } catch (error) {
              console.error('fail to call API:', error);
            }
          },  
    }
})