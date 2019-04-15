const getDb = require('../db').getDb

export default {
  getAll: async (tableName, next) => {
    try {
      const db = getDb()
      return await db.all(`SELECT * FROM ${tableName}`)
    } catch (err) {
      next(err)
    }
  },
  getById: async (query, subject, next) => {
    try {
      const db = getDb()
      let result = await db.get(query)
      if (!result) {
        return `Failed to get ${subject} - not found.`
      }
      return result
    } catch (err) {
      next(err)
    }
  },
}