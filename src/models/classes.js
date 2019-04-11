const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  list: async next => {
    try {
      const db = getDb()
      return await db.all('SELECT * FROM classes;')
    } catch (err) {
      next(err)
    }
  }
}
