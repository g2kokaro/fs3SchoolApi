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
      let result = await db.get(SQL`SELECT * FROM students 
        WHERE id = ${studentId}`)
      if (!result) {
        return 'Failed to get student. Student not found.'
      }
      return result
    } catch (err) {
      next(err)
    }
  },
  getClasses: async (studentId, next) => {
    try {
      const db = getDb()
      let student = await db.get(SQL`SELECT * FROM students 
        WHERE id = ${studentId}`)
      if (!student) {
        return `Failed to get classes. Student ${studentId} not found.`
      }
      return await db.all(SQL`SELECT c.id, c.code, c.name, c.teacher_id, 
        c.start_date, c.end_date
        FROM student_classes AS s_c 
        INNER JOIN classes as C ON s_c.class_id = c.id 
        WHERE student_id = ${studentId}`
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
      return await db.run(SQL`INSERT INTO students (first_name, last_name)
        VALUES (${s.first_name}, ${s.last_name})`)
    } catch (err) {
      next(err)
    }
  },
  update: async (s, studentId, next) => {
    try {
      if (!(s.first_name || s.last_name)) {
        return 'Failed to update student. Invalid format.'
      }
      const db = getDb()
      let existingStudent = await db.get(
        SQL`SELECT * FROM students WHERE id = ${studentId}`)
      if (!existingStudent) {
        return 'Failed to update student. Student does not exist.'
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
