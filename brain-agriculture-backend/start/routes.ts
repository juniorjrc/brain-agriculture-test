/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

/**
 * Planted crops routes
 */
Route.get('/planted-crops', 'PlantedCropsController.findAll')
Route.get('/planted-crops/:id', 'PlantedCropsController.findById')
Route.post('/planted-crops/search-by-name', 'PlantedCropsController.findByPlantedCropName')
Route.post('/planted-crops', 'PlantedCropsController.create')
Route.put('/planted-crops/:id', 'PlantedCropsController.update')
Route.delete('/planted-crops/:id', 'PlantedCropsController.remove')
