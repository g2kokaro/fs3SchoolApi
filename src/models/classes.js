const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  getAll: async next => {
    try {
      const db = getDb()
      return await db.all('SELECT * FROM classes;')
    } catch (err) {
      next(err)
    }
  },
  getById: async (classId, next) => {
    try {
      const db = getDb()
      return await db.get(
        SQL`SELECT * FROM classes INNER JOIN teachers ON
        classes.teacher_id = teachers.id WHERE classes.id=${classId}`
      )
    } catch (err) {
      next(err)
    }
  },
  create: async (c, next) => {
    try {
      const db = getDb()
      let existingClass = await db.get(SQL`SELECT * FROM classes WHERE code = ${c.code}`)
      if(existingClass) {
        return -1
      }
      return await db.run(SQL`INSERT INTO classes 
        (code, name, teacher_id, start_date, end_date)
      VALUES(${c.code}, ${c.name}, ${c.teacher_id}, ${c.start_date}, ${c.end_date})`)
    } catch (err) {
      next(err)
    }
  }
}
