const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  getStudents: async (classId, next) => {
    try {
      const db = getDb()
      let existingClass = await db.get(
        SQL`SELECT * FROM classes WHERE id=${classId}`)
      if (!existingClass) {
        return 'Failed to get students. Class does not exist.'
      }
      return await db.all(SQL`SELECT s.first_name, s.last_name, s.id 
        FROM students AS s INNER JOIN student_classes AS s_c
        ON s_c.student_id = s.id
        WHERE s_c.class_id = ${classId}`)
    } catch (err) {
      next(err)
    }
  },
  addStudent: async (e, classId, next) => {
    try {
      if (!(e.student_id)) {
        return 'Failed to enrol student. Invalid format.'
      }
      const db = getDb()
      let existingEntry = await db.get(
        SQL`SELECT * FROM student_classes 
          WHERE student_id = ${e.student_id} AND class_id = ${classId}`)
      if (existingEntry) {
        return 'Failed to enrol. Student is already enrolled in that class.'
      }
      return await db.run(SQL`INSERT INTO student_classes 
        VALUES (${classId}, ${e.student_id})`)
    } catch (err) {
      next(err)
    }
  },
  removeStudent: async (classId, studentId, next) => {
    try {
      const db = getDb()
      return await db.run(
        SQL`DELETE FROM student_classes 
          WHERE class_id = ${classId} AND student_id = ${studentId}`
      )
    } catch (err) {
      next(err)
    }
  }
}
