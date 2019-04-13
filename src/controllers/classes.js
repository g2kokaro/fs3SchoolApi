import classesModel from '../models/classes'

export default {
  getAll: async (req, res, next) => {
    try {
      const classes = await classesModel.getAll(next)
      res.status(200).json(classes)
    } catch (err) {
      next(err)
    }
  },
  getById: async (req, res, next) => {
    const classId = req.params.id * 1
    try {
      const c1ass = await classesModel.getById(classId, next)
      if (c1ass) {
        res.status(200).json(c1ass)
      } else {
        res.status(404).send({
          error: `Class ${classId} not found`
        })
      }
    } catch (err) {
      next(err)
    }
  },
  create: async (req, res, next) => {
    const c = {
      ...req.body
    }
    try {
      const dbReturnVal = await classesModel.create(c, next)
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
    const c = {
      ...req.body
    }
    try {
      const dbReturnVal = await classesModel.update(c, classId, next)
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
}
