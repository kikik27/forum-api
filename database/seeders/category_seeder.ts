import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      { title: 'Food' },
      { title: 'Travel' },
      { title: 'Entertaiment' },
      { title: 'Gamer' },
      { title: 'Technology' },
    ])
  }
}
