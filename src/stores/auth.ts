import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
// import type { EventOrganizer } from '@/type'
import type { StudentItem, AdvisorItem } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,

  withCredentials: false,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    userRole: null as string[] | null,
    username: null as string | null,
    id: null as string | null
  }),
  getters: {
    currentUserName(): string {
        return this.username || ''
    },
    isAdmin(): boolean {
        return this.userRole?.includes('ROLE_ADMIN') || false
    }
  },
  actions: {
    login(email: string, password: string) {
      return apiClient
        .post('/api/v1/auth/authenticate', {
          username: email,
          password: password
        })
        .then((response) => {
            this.token = response.data.access_token
            // this.user = response.data.user
            this.userRole = response.data.user_role
            this.id = response.data.id
            this.username = response.data.username
            localStorage.setItem('access_token', this.token as string)
            localStorage.setItem('user_role', JSON.stringify(this.userRole))
            localStorage.setItem('id', this.id as string)
            localStorage.setItem('username', this.username as string)
            console.log(response.data.id)
            return response
        })
        
    },
    async studentRegister(
      username: string, 
      firstName: string, 
      lastName: string, 
      email: string, 
      password: string,
      images: string[]
      ) {
      const response = await apiClient.post('/api/v1/auth/register/student', {
        id: generateRandomID().toString(), 
        username: username,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        images: images
      })
      // this.token = response.data.access_token
      // this.userRole = response.data.user_role
      // this.id = response.data.id
      // localStorage.setItem('access_token', this.token as string)
      // localStorage.setItem('user_role', JSON.stringify(this.userRole))
      // localStorage.setItem('id', this.id as string)
      return response
    },
    async advisorRegister(
      username: string, 
      firstName: string, 
      lastName: string, 
      email: string, 
      password: string,
      images: string[],
      department: string,
      academic: string
      ) {
      const response = await apiClient.post('/api/v1/auth/register/advisor', {
        username: username,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        images: images,
        department: department,
        academic: academic
      })
      // this.token = response.data.access_token
      // this.userRole = response.data.user_role
      // this.id = response.data.id
      // localStorage.setItem('access_token', this.token as string)
      // localStorage.setItem('user_role', JSON.stringify(this.userRole))
      // localStorage.setItem('id', this.id as string)
      return response
    },
    async studentUpdateProfile(id: string, firstName: string, lastName: string) {
      const response = await apiClient.put('/updatestudents', {
        id: id,
        name: firstName,
        lastName: lastName,
      })
      return response
    },
    async advisorUpdateProfile(id: string, firstName: string, lastName: string) {
      const response = await apiClient.put('/updateadvisors', {
        id: id,
        name: firstName,
        lastName: lastName,
      })
      return response
    },
    async announcementPost(title: string, description: string, files: string[]) {
      const response = await apiClient.post('/announcement', {
        title: title,
        description: description,
        files: files
      })
      return response
    },
    logout() {
        console.log('logout')
        this.token = null
        this.userRole = null
        this.id = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_role')
        localStorage.removeItem('id')
    },
    reload(token: string, userRole: string[], id: string) {
        this.token = token
        this.userRole = userRole
        this.id = id
    }
  }
})
function generateRandomID() {
  const min = 100000; 
  const max = 999999; 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

