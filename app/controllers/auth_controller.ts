// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { loginUser } from '#validators/login'
import { registerUser } from '#validators/register'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const validateData = await request.validateUsing(registerUser)
    const user = await User.create(validateData)
    return response.status(200).json({
      status: true,
      message: 'User registration successfully',
      data: user,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUser)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user, ['*'], {
      name: 'token',
      expiresIn: '30 days',
    })
    return response.status(200).json({
      status: true,
      message: 'Login successfully',
      data: token,
    })
  }

  async info({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    return response.status(200).json({
      status: true,
      message: 'User found',
      data: user,
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = await User.accessTokens.find(user, 1)
    console.log(token)
    return User.accessTokens.delete(user, token.id)
  }
}
