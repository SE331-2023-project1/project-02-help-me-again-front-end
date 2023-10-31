import { defineStore } from 'pinia'
import type { StudentItem } from '@/types'

export const useStudentProfileStore = defineStore('studentProfile', {
  state: () => ({
    student: null as StudentItem | null
  }),
  actions: {
    setStudent(stu: StudentItem) {
      this.student = stu
    },
    clear() {
      this.student = null
    }
  }
})