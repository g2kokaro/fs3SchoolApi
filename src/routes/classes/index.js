const classesRoutes = require('express').Router()
import classesController from '../../controllers/classes'

classesRoutes.get('/', classesController.getAll)
classesRoutes.get('/:id', classesController.getById)
classesRoutes.post('/', classesController.create)
classesRoutes.put('/:id', classesController.update)
classesRoutes.delete('/:id', classesController.delete)
classesRoutes.get('/:class_id/students', classesController.getStudents)
classesRoutes.post('/:class_id/students', classesController.addStudent)
classesRoutes.delete('/:class_id/students/:id', classesController.removeStudent)

export default classesRoutes
