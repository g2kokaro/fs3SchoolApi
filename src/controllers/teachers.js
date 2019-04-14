import teachersModel from '../models/teachers'
import util from './util.js'

export default {
  getAll: async (req, res, next) => {
    util.getAll(teachersModel, req, res, next)
  },
  getById: async (req, res, next) => {
    const teacherId = req.params.id * 1
    try {
      const teacher = await teachersModel.getById(teacherId, next)
      if (teacher) {
        res.status(200).json(teacher)
      } else {
        res.status(404).send({
          error: `Teacher ${teacherId} not found.`
        })
      }
    } catch (err) {
      next(err)
    }
  },
  getClasses: async (req, res, next) => {
    const teacherId = req.params.id * 1
    try {
      const dbReturnVal = await teachersModel.getClasses(teacherId, next)
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
    const t = {
      ...req.body
    }
    try {
      const dbReturnVal = await teachersModel.create(t, next)
      if (typeof (dbReturnVal) === 'object') {
        let newTeacher =
          await teachersModel.getById(dbReturnVal.stmt.lastID, next)
        res.status(201).json(newTeacher)
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
    const teacherId = req.params.id * 1
    const t = {
      ...req.body
    }
    try {
      const dbReturnVal = await teachersModel.update(t, teacherId, next)
      if (typeof (dbReturnVal) === 'object') {
        let newTeacher = await teachersModel.getById(teacherId, next)
        res.status(201).json(newTeacher)
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
    const teacherId = req.params.id * 1
    try {
      const teacher = await teachersModel.delete(teacherId, next)
      if (teacher.stmt.changes) {
        res.status(200).json({ message: `Teacher ${teacherId} removed.` })
      } else {
        res.status(404).send({
          error: `Teacher ${teacherId} not found.`
        })
      }
    } catch (err) {
      next(err)
    }
  },
}
