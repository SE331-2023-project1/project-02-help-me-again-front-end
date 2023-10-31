import { defineStore } from 'pinia'
import type { AdvisorItem } from '@/type'

export const useAdvisorProfileStore = defineStore('advisorProfile', {
  state: () => ({
    advisor: null as AdvisorItem | null
  }),
  actions: {
    setAdvisor(stu: AdvisorItem) {
      this.advisor = stu
    },
    clear() {
      this.advisor = null
    }
  }
})