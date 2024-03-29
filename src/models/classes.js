import util from './util.js'
const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  getAll: async next => {
    return util.getAll('classes', next)
  },
  getById: async (classId, next) => {
    const query = SQL`SELECT c.id, c.name, c.code, c.teacher_id, t.first_name, 
        t.last_name, c.start_date, c.end_date 
        FROM classes AS c INNER JOIN teachers AS t ON
        c.teacher_id = t.id WHERE c.id = ${classId}`
    return util.getById(query, 'class', next)
  },
  create: async (c, next) => {
    try {
      if (!(c.code && c.name && c.teacher_id && c.start_date && c.end_date)) {
        return 'Failed to create class. Invalid class format.'
      }
      const db = getDb()
      let existingClass = await db.get(
        SQL`SELECT * FROM classes WHERE code = ${c.code}`
      )
      if (existingClass) {
        return 'Failed to create class. Class already exists'
      }
      return await db.run(SQL`INSERT INTO classes 
        (code, name, teacher_id, start_date, end_date)
        VALUES(${c.code}, ${c.name}, ${c.teacher_id}, ${c.start_date}, 
        ${c.end_date})`)
    } catch (err) {
      next(err)
    }
  },
  update: async (c, classId, next) => {
    try {
      if (!(c.code || c.name || c.teacher_id || c.start_date || c.end_date)) {
        return 'Failed to update class. Invalid format.'
      }
      const db = getDb()
      let existingClass = await db.get(
        SQL`SELECT * FROM classes WHERE id=${classId}`)
      if (!existingClass) {
        return 'Failed to update class. Class does not exist.'
      }
      let dbStatement = SQL`UPDATE classes SET `
      let keyValueString = ''
      for (let [key, value] of Object.entries(c)) {
        if (['code', 'name', 'teacher_id',
          'start_date', 'end_date'].indexOf(key) > -1) {
          keyValueString += `'${key}' = '${value}', `
        }
      }
      keyValueString = keyValueString.slice(0, -2)
      dbStatement.append(keyValueString)
      dbStatement.append(SQL` WHERE id = ${classId}`)
      return await db.run(dbStatement)
    } catch (err) {
      next(err)
    }
  },
  delete: async (classId, next) => {
    try {
      const db = getDb()
      return await db.run(
        SQL`DELETE FROM classes WHERE id = ${classId}`
      )
    } catch (err) {
      next(err)
    }
  }
}
