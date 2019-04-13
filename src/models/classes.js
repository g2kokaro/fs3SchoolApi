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
        SQL`SELECT c.id, c.name, c.code, c.teacher_id, t.first_name, 
        t.last_name, c.start_date, c.end_date 
        FROM classes AS c INNER JOIN teachers AS t ON
        c.teacher_id = t.id WHERE c.id=${classId}`
      )
    } catch (err) {
      next(err)
    }
  },
  create: async (c, next) => {
    try {
      if (!(c.code && c.name && c.teacher_id && c.start_date && c.end_date)) {
        return `Failed to create class. Invalid class format.`
      }
      const db = getDb()
      let existingClass = await db.get(
        SQL`SELECT * FROM classes WHERE code = ${c.code}`
      )
      if (existingClass) {
        return `Failed to create class. Class already exists`
      }
      return await db.run(SQL`INSERT INTO classes 
        (code, name, teacher_id, start_date, end_date)
      VALUES(${c.code}, ${c.name}, ${c.teacher_id}, ${c.start_date}, ${c.end_date})`)
    } catch (err) {
      next(err)
    }
  },
  update: async (c, classId, next) => {
    try {
      if (!(c.code || c.name || c.teacher_id || c.start_date || c.end_date)) {
        return `Failed to update class. Invalid class format.`
      }
      const db = getDb()
      let existingClass = await db.get(
        SQL`SELECT * FROM classes WHERE id=${classId}`)
      if (!existingClass) {
        return `Failed to update class. Class does not exist.`
      }
      let dbStatement = `UPDATE classes SET `
      for (let [key, value] of Object.entries(c)) {
        dbStatement += `'${key}' = '${value}', `
      }
      dbStatement = dbStatement.slice(0, -2)
      dbStatement += ` WHERE id = ${classId}`
      return await db.run(dbStatement)
    } catch (err) {
      next(err)
    }
  }
}
