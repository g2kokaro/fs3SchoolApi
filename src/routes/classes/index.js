const classesRoutes = require('express').Router()
import classesController from '../../controllers/classes'

classesRoutes.get('/', classesController.list)

export default classesRoutes
