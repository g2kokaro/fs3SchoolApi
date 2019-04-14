export default {
  getAll: async (model, req, res, next) => {
    try {
      const classes = await model.getAll(next)
      res.status(200).json(classes)
    } catch (err) {
      next(err)
    }
  }
}