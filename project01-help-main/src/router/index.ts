import { createRouter, createWebHistory } from 'vue-router'
import StudentView from '../views/StudentView.vue'
import AdvisorView from '../views/AdvisorView.vue'
import addPersonView from '../views/addPersonView.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import StudentLayoutView from '../views/StudentLayoutView.vue'
import StudentDetailView from '../views/StudentDetailView.vue'
import StudentAdvisorView from '../views/StudentAdvisorView.vue'
import StudentService from '@/services/StudentService'
import { useTeacherStore } from '@/stores/teacher'
import { useStudentStore } from '@/stores/student'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'students',
      component: StudentView
    },
    {
      path: '/veevi',
      name: 'veevi',
      component: StudentView
    },
    {
      path: '/advisor',
      name: 'advisor',
      component: AdvisorView
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
    },
    {
      path: "/Register",
      name: "Register",
      component: Register,
    },
    {
      path: "/students/:id",
      name: "students-layout",
      component: StudentLayoutView,
      props: true,
      beforeEnter: (to) => {
        //add api
        const id: number = parseInt(to.params.id as string);
        const studentStore = useStudentStore();
        return StudentService.getStudentById(id)
          .then((response) => {
            //set up data for the component
            studentStore.setStudent(response.data);
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: "404-resource",
                params: { resource: "students" },
              };
            } else {
              return {
                name: "network-error",
              };
            }
          });
      },
     
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetailView,
          props: true
        },
        {
          path: 'advisor/:advisorId',
          name: 'student-advisor',
          component: StudentAdvisorView,
          props: true
        },
        {
          path: '/addPerson',
          name: 'addPerson',
          component: addPersonView,
          props: true
        }
      ]
    },
    {
        path: '/addPerson',
        name: 'addPerson',
        component: addPersonView,
        props: true
    }
  ]
});

// router.beforeEach(async () => {
//   NProgress.start()
//   const teacherStore = useTeacherStore()
//   const studentStore = useStudentStore()
//   if (teacherStore.teachers.length === 0) {
//     await teacherStore.fetchTeachersFromDB()
//   }
//   if (studentStore.students.length === 0) {
//     await studentStore.fetchStudentsFromDB()
//   }
// })

// Start the progress bar on navigation
router.beforeEach(() => {
  NProgress.start()
})

// Complete the progress bar after navigation
router.afterEach(() => {
  NProgress.done()
})


// const fetchStudents = async () => {
//   try {
//     const response = await StudentService.getStudent();
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     return [];
//   }
// };

// router.beforeEach(async () => {
//   const studentData: StudentDetail[] = await fetchStudents();
//   StudentService.getStudent(studentData);
// })

// const fetchTeacher = async () => {
//   try {
//     const response = await TeacherService.getTeacher();
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching Teacher:', error);
//     return [];
//   }
// };

// router.beforeEach(async () => {
//   const TeacherData: TeacherDetail[] = await fetchTeacher();
//   StudentService.getStudent(TeacherData);
// })






export default router
