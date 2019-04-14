import express from 'express'
import classes from './classes'
import students from './students'
import teachers from './teachers'
const router = express.Router()

router.use('/classes', classes)
router.use('/students', students)
router.use('/teachers', teachers)

export default router
