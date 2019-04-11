const classesRoutes = require('express').Router()

classesRoutes.get('/', (req, res) => {
  const classes = 'Classes data'
  res.status(200).json({
    classes
  })
})

export default classesRoutes;
