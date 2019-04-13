import studentsModel from '../models/students'

export default {
  getAll: async (req, res, next) => {
    try {
      const classes = await studentsModel.getAll(next)
      res.status(200).json(classes)
    } catch (err) {
      next(err)
    }
  },
  getById: async (req, res, next) => {
    const studentId = req.params.id * 1
    try {
      const c1ass = await studentsModel.getById(studentId, next)
      if (c1ass) {
        res.status(200).json(c1ass)
      } else {
        res.status(404).send({
          error: `Student ${studentId} not found.`
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
      console.log(dbReturnVal)
      if (typeof (dbReturnVal) === 'object') {
        let newStudent = await studentsModel.getById(dbReturnVal.stmt.lastID, next)
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
      const c1ass = await studentsModel.delete(studentId, next)
      if (c1ass.stmt.changes) {
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
