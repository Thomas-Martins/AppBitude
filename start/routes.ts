/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const LoginController = () => import('#controllers/login_controller')
const RegisterController = () => import('#controllers/register_controller')
const LogoutController = () => import('#controllers/logout_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Route for not connected users
router
  .group(() => {
    router.get('/', ({ inertia }) => inertia.render('home'))
    router.get('/login', [LoginController, 'renderView'])
    router.get('/register', [RegisterController, 'renderView'])
  })
  .middleware([middleware.guest()])

// Route for connected users
router
  .group(() => {
    router.get('/dashboard', ({ inertia }) => inertia.render('dashboard')).use(middleware.auth())
    router.get('/logout', [LogoutController]).as('auth.logout')
  })
  .middleware([middleware.auth()])

//Route
router.post('/login', [LoginController, 'login']).as('auth.login')
router.post('/register', [RegisterController, 'register']).as('auth.register')
