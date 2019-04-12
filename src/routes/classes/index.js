const classesRoutes = require('express').Router()
import classesController from '../../controllers/classes'

classesRoutes.get('/', classesController.getAll)
classesRoutes.get('/:id', classesController.getById)
classesRoutes.post('/', classesController.create)

export default classesRoutes
