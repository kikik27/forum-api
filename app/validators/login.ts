import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

export const loginUser = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .exists(async (db: Database, value: string, field: FieldContext) => {
        const users = await db.table('users')
        return users.some((user) => user.email === value)
      }),
    password: vine.string().minLength(8),
  })
)
