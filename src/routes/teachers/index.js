const teachersRoutes = require('express').Router()
import teachersController from '../../controllers/teachers'

teachersRoutes.get('/', teachersController.getAll)
teachersRoutes.get('/:id', teachersController.getById)
teachersRoutes.get('/:id/classes', teachersController.getClasses)
teachersRoutes.post('/', teachersController.create)
teachersRoutes.put('/:id', teachersController.update)
teachersRoutes.delete('/:id', teachersController.delete)

export default teachersRoutes
