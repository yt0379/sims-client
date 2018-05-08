import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Student from '@/components/Student/Student'
import StudentAdd from '@/components/Student/StudentAdd'
import StudentUpdate from '@/components/Student/StudentUpdate'
import Class from '@/components/Class/Class'
import ClassAdd from '@/components/Class/ClassAdd'
import ClassUpdate from '@/components/Class/ClassUpdate'
import Work from '@/components/Work/Work'
import WorkAdd from '@/components/Work/WorkAdd'
import WorkUpdate from '@/components/Work/WorkUpdate'
import ScoreHistory from '@/components/Student/ScoreHistory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path:'/',redirect:'/student'
        },
        {
          path: '/student', name: 'student', component: Student,
          children: [
            {path: 'add', name: 'studentAdd', component: StudentAdd},
            {path: 'update', name: 'studentUpdate', component: StudentUpdate},
            {path: 'history', name: 'history', component: ScoreHistory},
          ]
        },
        {
          path: '/class', name: 'class', component: Class,
          children: [
            {path: 'add', name: 'classAdd', component: ClassAdd},
            {path: 'update', name: 'classUpdate', component: ClassUpdate},
          ]
        },
        {
          path: '/work', name: 'work', component: Work,
          children: [
            {path: 'add', name: 'workAdd', component: WorkAdd},
            {path: 'update', name: 'workUpdate', component: WorkUpdate},
          ]
        },
      ]
    },
  ]
})
