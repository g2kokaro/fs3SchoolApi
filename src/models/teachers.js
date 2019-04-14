import util from './util.js'
const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  getAll: async next => {
    return util.getAll('teachers', next)
  },
  getById: async (teacherId, next) => {
    const query = SQL`SELECT * FROM teachers WHERE id = ${teacherId}`
    return util.getById(query, 'teacher', next)
  },
  getClasses: async (teacherId, next) => {
    try {
      const db = getDb()
      let teacher = await db.get(SQL`SELECT * FROM teachers 
        WHERE id = ${teacherId}`)
      if (!teacher) {
        return `Failed to get classes. Teacher ${teacherId} not found.`
      }
      return await db.all(SQL`SELECT * FROM classes 
        WHERE teacher_id = ${teacherId}`
      )
    } catch (err) {
      next(err)
    }
  },
  create: async (t, next) => {
    try {
      if (!(t.first_name && t.last_name)) {
        return 'Failed to create teacher. Invalid format.'
      }
      const db = getDb()
      return await db.run(SQL`INSERT INTO teachers (first_name, last_name)
        VALUES (${t.first_name}, ${t.last_name})`)
    } catch (err) {
      next(err)
    }
  },
  update: async (t, teacherId, next) => {
    try {
      if (!(t.first_name || t.last_name)) {
        return 'Failed to update teacher. Invalid format.'
      }
      const db = getDb()
      let existingStudent = await db.get(
        SQL`SELECT * FROM teachers WHERE id = ${teacherId}`)
      if (!existingStudent) {
        return 'Failed to update teacher. Teacher does not exist.'
      }
      let dbStatement = SQL`UPDATE teachers SET `
      let keyValueString = ''
      for (let [key, value] of Object.entries(t)) {
        if (['first_name', 'last_name'].indexOf(key) > -1) {
          keyValueString += `'${key}' = '${value}', `
        }
      }
      keyValueString = keyValueString.slice(0, -2)
      dbStatement.append(keyValueString)
      dbStatement.append(SQL` WHERE id = ${teacherId}`)
      return await db.run(dbStatement)
    } catch (err) {
      next(err)
    }
  },
  delete: async (teacherId, next) => {
    try {
      const db = getDb()
      return await db.run(
        SQL`DELETE FROM teachers WHERE id = ${teacherId}`
      )
    } catch (err) {
      next(err)
    }
  }
}
