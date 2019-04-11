import classesModel from '../models/classes'

export default {
  list: async (req, res, next) => {
    try {
      const classes = await classesModel.list(next)
      res.status(200).json({ classes })
    } catch (err) {
      next(err)
    }
  }
}
