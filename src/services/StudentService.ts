import apiClient from './AxiosClient'
import type { AxiosResponse } from 'axios'
import type { RegisterUserItem, StudentItem } from '@/type'

export default {
  getStudents(perPage: number, page: number): Promise<AxiosResponse<StudentItem[]>> {
    // perPage is limit
    // page is number of pages
    return apiClient.get<StudentItem[]>('/students?_limit=' + perPage + '&_page=' + page)
  },
  getAllStudents() : Promise<AxiosResponse<StudentItem[]>> {
    return apiClient.get<StudentItem[]>('/AllStudents')
  },
  getStudentById(id : string) : Promise<AxiosResponse<StudentItem>>{
    return apiClient.get<StudentItem>('/students/'+id.toString())
  },
  getStudentsByAdvisor(id :string) : Promise<AxiosResponse<StudentItem[]>> {
    return apiClient.get<StudentItem[]>('/studentsByAdvisor/'+id.toString())
  },

  getStudentsByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<StudentItem[]>>{
    return apiClient.get<StudentItem[]>('/students?filter=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  },
  addStudent(student: RegisterUserItem): Promise<AxiosResponse<StudentItem>> {
    return apiClient.post("/api/v1/auth/register/student", student)
  },
  updateStudent(student: StudentItem): Promise<AxiosResponse<StudentItem>> {
    return apiClient.put<StudentItem>('/updatestudents', student)
  }
}
