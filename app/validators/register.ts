import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

export const registerUser = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db: Database, value: string, field: FieldContext) => {
        const users = await db.table('users')
        return !users.some((user) => user.email === value)
      }),
    password: vine.string().minLength(8).confirmed(),
  })
)
