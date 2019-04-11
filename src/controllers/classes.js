export default {
  list: async (req, res, next) => {
    try {
      const classes = 'Classes data'
      res.status(200).json({ classes })

    } catch (err) {
      next(err)
    }
  }
}
