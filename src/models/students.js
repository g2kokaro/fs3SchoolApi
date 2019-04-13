const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  getAll: async next => {
    try {
      const db = getDb()
      return await db.all('SELECT * FROM students;')
    } catch (err) {
      next(err)
    }
  },
  getById: async (studentId, next) => {
    try {
      const db = getDb()
      return await db.get(
        SQL`SELECT * FROM students WHERE id = ${studentId}`
      )
    } catch (err) {
      next(err)
    }
  },
  create: async (s, next) => {
    try {
      if (!(s.first_name && s.last_name)) {
        return `Failed to create student. Invalid format.`
      }
      const db = getDb()
      return await db.run(SQL`INSERT INTO students (first_name, last_name)
        VALUES (${s.first_name}, ${s.last_name})`)
    } catch (err) {
      next(err)
    }
  },
  update: async (s, studentId, next) => {
    try {
      if (!(s.first_name || s.last_name)) {
        return `Failed to update student. Invalid format.`
      }
      const db = getDb()
      let existingStudent = await db.get(
        SQL`SELECT * FROM students WHERE id = ${studentId}`)
      if (!existingStudent) {
        return `Failed to update student. Student does not exist.`
      }
      let dbStatement = SQL`UPDATE students SET `
      let keyValueString = ''
      for (let [key, value] of Object.entries(s)) {
        if (['first_name', 'last_name'].indexOf(key) > -1) {
          keyValueString += `'${key}' = '${value}', `
        }
      }
      keyValueString = keyValueString.slice(0, -2)
      dbStatement.append(keyValueString)
      dbStatement.append(SQL` WHERE id = ${studentId}`)
      return await db.run(dbStatement)
    } catch (err) {
      next(err)
    }
  },
  delete: async (studentId, next) => {
    try {
      const db = getDb()
      return await db.run(
        SQL`DELETE FROM students WHERE id = ${studentId}`
      )
    } catch (err) {
      next(err)
    }
  }
}
