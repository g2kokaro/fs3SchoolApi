import express from 'express'
import classes from './classes'
import students from './students'
const router = express.Router()

router.use('/classes', classes)
router.use('/students', students)

export default router
