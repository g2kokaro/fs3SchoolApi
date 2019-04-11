import express from 'express'
import classes from './classes'
const router = express.Router()

router.use('/classes', classes)

// We can add routes for other resources here later
// by adding other folders to the routes folder

export default router
