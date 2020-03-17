

const routes = [
  {
    path: '/',
    component: () => import('layouts/Main'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index') },
      { path: 'projects', name: 'projects', component: () => import('pages/Projects') },
      { path: 'reading', name: 'reading', component: () => import('pages/Reading') },
      { path: 'view', name: 'view', component: () => import('pages/View/index') },
      { path: 'admin',  component: ()=>import('pages/Admin'), 
        children: [
          { name: 'manage-projects', path: '', component: ()=>import('pages/Admin/Main/Projects')},
          { name: 'manage-users', path: 'users', component: ()=>import('pages/Admin/Main/Users')},
        ] 
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../pages/Admin'),
    children: [
      {path: 'login', name: 'admin-login', component: ()=> import('../pages/Admin/Auth')}
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/Auth'),
    children: [
      {path: '', name: 'login', component: ()=>import('pages/Login')}
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
