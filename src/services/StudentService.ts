import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { StudentDetail } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
    getStudent(): Promise<AxiosResponse<StudentDetail[]>> {
      return apiClient.get<StudentDetail[]>('/students')
    },
    getStudentById(id : number) : Promise<AxiosResponse<StudentDetail>>{
      return apiClient.get<StudentDetail>('students/'+ id.toString())
    }
  }