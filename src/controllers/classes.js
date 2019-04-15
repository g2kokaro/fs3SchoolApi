import classesModel from '../models/classes'
import enrolmentModel from '../models/enrolment'
import util from './util.js'

export default {
  getAll: async (req, res, next) => {
    util.getAll(classesModel, req, res, next)
  },
  getById: async (req, res, next) => {
    util.getById(classesModel, req, res, next)
  },
  create: async (req, res, next) => {
    const enrolment = {
      ...req.body
    }
    try {
      const dbReturnVal = await classesModel.create(enrolment, next)
      if (typeof (dbReturnVal) === 'object') {
        let newClass = await classesModel.getById(dbReturnVal.stmt.lastID, next)
        res.status(201).json(newClass)
      } else {
        res.status(400).send({
          error: dbReturnVal
        })
      }
    } catch (err) {
      next(err)
    }
  },
  update: async (req, res, next) => {
    const classId = req.params.id * 1
    const enrolment = {
      ...req.body
    }
    try {
      const dbReturnVal = await classesModel.update(enrolment, classId, next)
      if (typeof (dbReturnVal) === 'object') {
        let newClass = await classesModel.getById(classId, next)
        res.status(201).json(newClass)
      } else {
        res.status(400).send({
          error: dbReturnVal
        })
      }
    } catch (err) {
      next(err)
    }
  },
  delete: async (req, res, next) => {
    const classId = req.params.id * 1
    try {
      const c1ass = await classesModel.delete(classId, next)
      if (c1ass.stmt.changes) {
        res.status(200).json({ message: `Class ${classId} removed.` })
      } else {
        res.status(404).send({
          error: `Class ${classId} not found.`
        })
      }
    } catch (err) {
      next(err)
    }
  },
  getStudents: async (req, res, next) => {
    const classId = req.params.class_id * 1
    try {
      const dbReturnVal = await enrolmentModel.getStudents(classId, next)
      if (typeof (dbReturnVal) === 'object') {
        res.status(201).json(dbReturnVal)
      } else {
        res.status(400).send({
          error: dbReturnVal
        })
      }
    } catch (err) {
      next(err)
    }
  },
  addStudent: async (req, res, next) => {
    const classId = req.params.class_id * 1
    const enrolment = {
      ...req.body
    }
    try {
      const dbReturnVal =
        await enrolmentModel.addStudent(enrolment, classId, next)
      if (typeof (dbReturnVal) === 'object') {
        res.status(201).json(dbReturnVal)
      } else {
        res.status(400).send({
          error: dbReturnVal
        })
      }
    } catch (err) {
      next(err)
    }
  },
  removeStudent: async (req, res, next) => {
    const classId = req.params.class_id * 1
    const studentId = req.params.id * 1
    try {
      const c1ass = await enrolmentModel.removeStudent(classId, studentId, next)
      if (c1ass.stmt.changes) {
        res.status(200).json({
          message: `Removed student ${studentId} from class ${classId}`
        })
      } else {
        res.status(404).send({
          error: 'Class or student does not exist, or student is not' +
            'enrolled in that class.'
        })
      }
    } catch (err) {
      next(err)
    }
  }
}