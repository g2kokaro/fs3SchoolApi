export default {
  getAll: async (model, req, res, next) => {
    try {
      const classes = await model.getAll(next)
      res.status(200).json(classes)
    } catch (err) {
      next(err)
    }
  },
  getById: async (model, req, res, next) => {
    const id = req.params.id * 1
    try {
      const dbReturnVal = await model.getById(id, next)
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
}