/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(async () => {
    router.post('/auth/register', [AuthController, 'register'])
    router.post('/auth/login', [AuthController, 'login'])
  })
  .prefix('/api')

router
  .group(async () => {
    router.get('/auth/info', [AuthController])
    router.post('auth/logout', [AuthController, 'logout'])
  })
  .prefix('/api')
  .use(middleware.auth({ guards: ['api'] }))
