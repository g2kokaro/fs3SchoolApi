const studentsRoutes = require('express').Router()
import studentsController from '../../controllers/students'

studentsRoutes.get('/', studentsController.getAll)
studentsRoutes.get('/:id', studentsController.getById)
studentsRoutes.post('/', studentsController.create)
studentsRoutes.put('/:id', studentsController.update)
studentsRoutes.delete('/:id', studentsController.delete)

export default studentsRoutes
