/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const DashboardController = () => import('#controllers/dashboard_controller')

const LoginController = () => import('#controllers/login_controller')
const RegisterController = () => import('#controllers/register_controller')
const LogoutController = () => import('#controllers/logout_controller')
const DefaultCategoryController = () => import('#controllers/default_category_controller')
const SettingsController = () => import('#controllers/settings_controller')
const HabitsController = () => import('#controllers/habits_controller')

// Route for not connected users
router
  .group(() => {
    router.get('/', ({ inertia }) => inertia.render('home'))
    router.get('/test', ({ inertia }) => inertia.render('test'))
    router.get('/login', [LoginController, 'renderView'])
    router.get('/register', [RegisterController, 'renderView'])
  })
  .middleware([middleware.guest()])

// Route for connected users
router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'index'])
    router.get('/habits', [HabitsController, 'addHabitsView'])
    router.post('/habits/new/custom', [HabitsController, 'createCustomHabits'])
    router.post('/habits/:id/update', [HabitsController, 'updateHabitsData'])
    router.post('habits/:id/delete', [HabitsController, 'deleteHabit'])
    router.get('/categories', [DefaultCategoryController, 'index'])
    router.get('/categories/new', [DefaultCategoryController, 'categoryFormView'])
    router.post('/categories/new', [DefaultCategoryController, 'create'])
    router.post('/categories/delete/:id', [DefaultCategoryController, 'delete'])
    router.get('/user/settings', [SettingsController, 'render'])
    router.post('/user/settings', [SettingsController, 'updateUserInfo'])
    router.get('/logout', [LogoutController]).as('auth.logout')
  })
  .middleware([middleware.auth()])

//Route
router.post('/login', [LoginController, 'login']).as('auth.login')
router.post('/register', [RegisterController, 'register']).as('auth.register')
