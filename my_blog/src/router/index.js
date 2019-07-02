import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



import Home from '@/views/admin/home/home'
import Login from '@/views/admin/auth/Login'
import company from '@/views/admin/company/company'
import department from '@/views/admin/company/department'
import job from '@/views/admin/company/job'
import employeeInfo from '@/views/admin/employee/employeeInfo'
import employeeReward from '@/views/admin/employee/employeeReward'
import employeeDimission from '@/views/admin/employee/employeeDimission'
import salaryEmployee from '@/views/admin/salary/salaryEmployee'
import salaryGrade from '@/views/admin/salary/salaryGrade'
import salarySocial from '@/views/admin/salary/salarySocial'
import salarySheet from '@/views/admin/salary/salarySheet'
import attenceInfo from '@/views/admin/attence/attenceInfo'
import attenceRule from '@/views/admin/attence/attenceRule'
import recruitNeeds from '@/views/admin/recruit/recruitNeeds'
import recruitPublish from '@/views/admin/recruit/recruitPublish'
import recruitTrench from '@/views/admin/recruit/recruitTrench'
import candidate from '@/views/admin/recruit/candidate'
import talent from '@/views/admin/recruit/talent'
import activity from '@/views/admin/activity/activity'
import holiday from '@/views/admin/activity/holiday'





const router = new Router({
  routes: [
    {
        path:'/',
        name:'home',
        component:Home
    },

    {
        path:'/login',
        name:'login',
        component:Login
    },
    
    {
        path:'/admin/company',
        name:'company',
        component:company
    },
    {
        path:'/admin/department',
        name:'department',
        component:department
    },
    {
        path:'/admin/job',
        name:'job',
        component:job
    },
    {
        path:'/admin/employee/info',
        name:'employeeInfo',
        component:employeeInfo
    },
    {
        path:'/admin/employee/reward',
        name:'employeeReward',
        component:employeeReward
    },
    {
        path:'/admin/employee/dimission',
        name:'employeeDimission',
        component:employeeDimission
    },
    {
        path:'/admin/salary/employee',
        name:'salaryEmployee',
        component:salaryEmployee
    },
    {
        path:'/admin/salary/grade',
        name:'salaryGrade',
        component:salaryGrade
    },
    {
        path:'/admin/salary/social',
        name:'salarySocial',
        component:salarySocial
    },
    {
        path:'/admin/salary/sheet',
        name:'salarySheet',
        component:salarySheet
    },
    //考勤
    {
        path:'/admin/attence/info',
        name:'attenceInfo',
        component:attenceInfo
    },
    {
        path:'/admin/attence/rule',
        name:'attenceRule',
        component:attenceRule
    },
    //招聘
    {
        path:'/admin/recruit/needs',
        name:'recruitNeeds',
        component:recruitNeeds
    },
    {
        path:'/admin/recruit/publish',
        name:'recruitPublish',
        component:recruitPublish
    },
    {
        path:'/admin/recruit/trench',
        name:'recruitTrench',
        component:recruitTrench
    },
    {
        path:'/admin/recruit/candidate',
        name:'candidate',
        component:candidate
    },
    {
        path:'/admin/recruit/talent',
        name:'talent',
        component:talent
    },
    //团建
    {
        path:'/admin/activity',
        name:'activity',
        component:activity
    },
    {
        path:'/admin/holiday',
        name:'holiday',
        component:holiday
    },

  ]
})


// 路由守卫
router.beforeEach((to, from, next) => {
    // console.log(to)
    const isLogin = localStorage.userInfo ? true : false;
    if (to.path == '/login') {
      next();
    } else {
      // 是否在登录状态下
      isLogin ? next() : next('/login');
    }
  });

  
export default router