const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  getAll: async next => {
    try {
      const db = getDb()
      return await db.all('SELECT * FROM teachers;')
    } catch (err) {
      next(err)
    }
  },
  getById: async (teacherId, next) => {
    try {
      const db = getDb()
      return await db.get(
        SQL`SELECT * FROM teachers WHERE id = ${teacherId}`
      )
    } catch (err) {
      next(err)
    }
  },
  getClasses: async (teacherId, next) => {
    try {
      const db = getDb()
      let student = await db.get(SQL`SELECT * FROM teachers WHERE id = ${teacherId}`)
      if (!student) {
        return `Failed to get classes. Student ${teacherId} not found.`
      }
      return await db.all(SQL`SELECT c.id, c.code, c.name, c.teacher_id, 
        c.start_date, c.end_date
        FROM student_classes AS s_c 
        INNER JOIN classes as C ON s_c.class_id = c.id 
        WHERE student_id = ${teacherId}`
      )
    } catch (err) {
      next(err)
    }
  },
  create: async (s, next) => {
    try {
      if (!(s.first_name && s.last_name)) {
        return 'Failed to create student. Invalid format.'
      }
      const db = getDb()
      return await db.run(SQL`INSERT INTO teachers (first_name, last_name)
        VALUES (${s.first_name}, ${s.last_name})`)
    } catch (err) {
      next(err)
    }
  },
  update: async (s, teacherId, next) => {
    try {
      if (!(s.first_name || s.last_name)) {
        return 'Failed to update student. Invalid format.'
      }
      const db = getDb()
      let existingStudent = await db.get(
        SQL`SELECT * FROM teachers WHERE id = ${teacherId}`)
      if (!existingStudent) {
        return 'Failed to update student. Student does not exist.'
      }
      let dbStatement = SQL`UPDATE teachers SET `
      let keyValueString = ''
      for (let [key, value] of Object.entries(s)) {
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
