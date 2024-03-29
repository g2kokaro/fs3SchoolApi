// This file is from the blog_app example

import sqlite from 'sqlite'
import assert from 'assert'
let _db

export const initDb = cb => {
  if (_db) {
    console.warn('DB has already been initialized')
    return cb(null, _db)
  }
  Promise.resolve()
    .then(() =>
      sqlite.open('./database.sqlite', {
        Promise
      })
    )
    .then(db =>
      db.migrate({
        migrationsPath: './db/migrations',
        force: 'last'
      })
    )
    .then(db => {
      db.run("PRAGMA foreign_keys = on;")
      console.log('DB Initialized')
      _db = db
      return cb(null, _db)
    })
}

export const getDb = () => {
  assert.ok(_db, 'Db has not been initialized. call initDB first')
  return _db
}
