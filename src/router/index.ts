import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentList from '../views/StudentListView.vue'
import AdvisorList from '../views/AdvisorListView.vue'
import StudentLayout from '../views/student/StudentLayout.vue'
import StudentDetail from '../views/student/StudentDetail.vue'
import AdvisorLayout from '../views/advisor/AdvisorLayout.vue'
import AdvisorDetail from '../views/advisor/AdvisorDetail.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import HomePage from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AnnouncementView from '../views/announcement/AnnouncementView.vue'
import StudentProfile from '../views/student/StudentProfile.vue'
import NProgress from 'nprogress'
import StudentService from '@/services/StudentService'
import AdvisorService from '@/services/AdvisorService'
import { useStudentStore } from '@/stores/student'
import { useAdvisorStore } from '@/stores/advisor'
import type { StudentItem } from '@/type'
import { commentStudent } from '@/stores/comment'
import { commentStudentId } from '@/stores/comment_id'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.ts'

import AddPerson from '../views/AddPerson.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/Login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/announcements',
      name: 'announcement-view',
      component: AnnouncementView
    },
    {
      path: '/studentprofile',
      name: 'studentprofile-view',
      component: StudentProfile
    },
    {
      path: '/register',
      name: 'register-page',
      component: RegisterView
    },
    {
      path: '/students',
      name: 'student-list',
      component: StudentList,
      props: (route) => ({ page: parseInt(route.query?.page as string || '1'), limit: parseInt(route.query?.limit as string || '2') })
    },
    {
      path: '/advisors',
      name: 'advisor-list',
      component: AdvisorList,
      props: (route) => ({ page: parseInt(route.query?.page as string || '1'), limit: parseInt(route.query?.limit as string || '2') })
    },
    {
      path: '/advisors/:id',
      name: 'advisor-layout',
      component: AdvisorLayout,
      props: (route) => ({ id: route.params.id }),
      beforeEnter: async (to) => {
        const id: string = to.params.id as string
        const advisorStore = useAdvisorStore()
        const studentStore = useStudentStore()
        try {
          // const advisor = await advisorStore.getadvisorById(id)
          // advisorStore.setadvisor(advisor)
          // const studentPromises = advisor.studentsId.map(async studentId => {
          //   const student = await studentStore.getStudentById(studentId)
          //   return student
          // });
          // const students = await Promise.all(studentPromises)
          // // console.log(studentPromises)
          // studentStore.setStudent(students.filter(student => student !== null) as StudentItem[]);
          useAdvisorStore().getAdvisorrById(id)
          // console.log(studentStore)
        } catch (error: any) {
          if (error.response && error.response.status === 404) {
            // const errorUrl = error.response.config.url;
            // const resource = errorUrl.includes('advisors') ? 'advisors' : 'students';

            // console.log(`Resource '${resource}' not found.`);
            // console.log("Resource not found")

            const errorUrl = error.response.config.url
            console.log("Error URL:", errorUrl)

            const resourceIdentifier = errorUrl.split('/').pop() // Get the last segment
            console.log("Resource Identifier:", resourceIdentifier)

            const isAdvisor = resourceIdentifier.charAt(0) === 'T' // Check the first character
            console.log("Is Advisor:", isAdvisor)

            const resource = isAdvisor ? 'advisor' : 'student'
            console.log("Resource:", resource)

            router.push({
              name: '404-resource',
              params: { resource }
            })
          } else {
            router.push({ name: 'network-error' })
          }
        }
      },
      children: [
        {
          path: '',
          name: 'advisor-detail',
          component: AdvisorDetail
        }
      ]
    },
    {
      path: '/students/:id',
      name: 'student-layout',
      component: StudentLayout,
      props: (route) => ({ id: route.params.id }),
      beforeEnter: async (to) => {
        const id: string = to.params.id as string
        const studentStore = useStudentStore()
        const advisorStore = useAdvisorStore()
        try {
          // const student = await studentStore.getStudentById(id)
          // studentStore.setStudent(student)
          // const advisor = await advisorStore.getAdvisorById(student.advisorID)
          // advisorStore.setadvisorr(advisor)

          // studentStore.getStudentById(id)
          // advisorStore.getAdvisorrById(studentStore.getStudent.find(student?.id))
          // console.log(studentStore)

          useStudentStore().getStudentById(id)
          // console.log(id)

        } catch (error: any) {
          if (error.response && error.response.status === 404) {
            // const errorUrl = error.response.config.url;
            // console.log("Error URL:", errorUrl);
            // const resource = errorUrl.includes('T') ? 'advisors' : 'students';

            // console.log(`Resource '${resource}' not found.`);
            // console.log("Resource not found")

            const errorUrl = error.response.config.url
            console.log("Error URL:", errorUrl)

            const resourceIdentifier = errorUrl.split('/').pop() // Get the last segment
            console.log("Resource Identifier:", resourceIdentifier)

            const isAdvisor = resourceIdentifier.charAt(0) === 'T' // Check the first character
            console.log("Is Advisor:", isAdvisor)

            const resource = isAdvisor ? 'advisor' : 'student'
            console.log("Resource:", resource)
            router.push({
              name: '404-resource',
              params: { resource }
            })
          } else {
            router.push({ name: 'network-error' })
          }
        }
      },
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetail,
        }
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }, {
      path: '/add',
      name: 'add-person',
      component: AddPerson,
      beforeEnter: () => {
        useAdvisorStore().fetchAdvisors()
      }
    }
  ]
})

router.beforeEach(async () => {
  NProgress.start()
  const advisorStore = useAdvisorStore()
  const studentStore = useStudentStore()
  const authStore = useAuthStore()
  if (advisorStore.advisors.length === 0 && authStore.userRole?.includes("ROLE_ADMIN")) {
    await advisorStore.fetchAdvisorsFromDB()
  }
  if (studentStore.students.length === 0 && authStore.userRole?.includes("ROLE_ADMIN")) {
    await studentStore.fetchStudentsFromDB()
    // console.log(studentStore.students)
  }
  if (studentStore.students.length === 0 && authStore.userRole?.includes("ROLE_ADVISOR")
    && authStore.id != null) {
    await studentStore.fetchStudentsByAdvisor(authStore.id)
    // console.log(studentStore.students)
  }

})

router.afterEach(() => {
  NProgress.done()
})

export default router
