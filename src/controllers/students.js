import studentsModel from '../models/students'
import util from './util.js'

export default {
  getAll: async (req, res, next) => {
    util.getAll(studentsModel, req, res, next)
  },
  getById: async (req, res, next) => {
    util.getById(studentsModel, req, res, next)
  },
  getClasses: async (req, res, next) => {
    const studentId = req.params.id * 1
    try {
      const dbReturnVal = await studentsModel.getClasses(studentId, next)
      if (typeof (dbReturnVal) === 'object') {
        res.status(200).json(dbReturnVal)
      } else {
        res.status(404).send({
          error: dbReturnVal
        })
      }
    } catch (err) {
      next(err)
    }
  },
  create: async (req, res, next) => {
    const s = {
      ...req.body
    }
    try {
      const dbReturnVal = await studentsModel.create(s, next)
      if (typeof (dbReturnVal) === 'object') {
        let newStudent =
          await studentsModel.getById(dbReturnVal.stmt.lastID, next)
        res.status(201).json(newStudent)
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
    const studentId = req.params.id * 1
    const s = {
      ...req.body
    }
    try {
      const dbReturnVal = await studentsModel.update(s, studentId, next)
      if (typeof (dbReturnVal) === 'object') {
        let newStudent = await studentsModel.getById(studentId, next)
        res.status(201).json(newStudent)
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
    const studentId = req.params.id * 1
    try {
      const student = await studentsModel.delete(studentId, next)
      if (student.stmt.changes) {
        res.status(200).json({ message: `Student ${studentId} removed.` })
      } else {
        res.status(404).send({
          error: `Student ${studentId} not found.`
        })
      }
    } catch (err) {
      next(err)
    }
  },
}
