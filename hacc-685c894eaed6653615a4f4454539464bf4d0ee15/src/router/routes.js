const LOGIN =  {
        path: '/',
        name: 'login',
        component: () => import('../pages/login/Login'),
};

const REGISTRATION = [
    {
        path: '/registration',
        name: 'registration',
        component: () => import('../pages/registration/Registration'),
    },
]

const SCHOOLBOY = [
    {
        path: '/schoolboy',
        name: 'schoolboy',
        component: () => import('../pages/schoolboy/task-list/SchoolboyTaskList'),
    },
    {
        path: '/schoolboy/task/:id',
        name: 'schoolboy-task',
        component: () => import('../pages/schoolboy/task-execute/TaskLayout'),
    },
];
const TEACHER = [
        {
            path: '/teacher',
            name: 'teacher',
            component: () => import('../pages/teacher/task-list/TeacherTaskList')
        },
        {
            path: '/teacher/task/:id?',
            name: 'teacher-task',
            component: () => import('../pages/teacher/task-crud/TeacherTask'),
        },

];

const ADMIN = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../pages/admin/Admin')
    },
]

 export default [
     LOGIN,
     ...REGISTRATION,
     ...SCHOOLBOY,
     ...TEACHER,
     ...ADMIN
 ]