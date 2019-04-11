-- Up
CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  firstname TEXT,
  lastname TEXT
);

CREATE TABLE teachers (
  id INTEGER PRIMARY KEY,
  firstname TEXT,
  lastname TEXT
);

CREATE TABLE classes (
  id INTEGER PRIMARY KEY,
  code TEXT,
  name TEXT,
  teacher_id INTEGER,
  startDate: TEXT,
  endDate: TEXT,
  CONSTRAINT classes_fk_teacher_id 
    FOREIGN KEY REFERENCES teachers (id)
    ON UPDATE CASCADE
);

CREATE TABLE student_classes (
  class_id INTEGER,
  student_id INTEGER,
  CONSTRAINT student_classes_fk_class_id
    FOREIGN KEY REFERENCES classes (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT student_classes_fk_student_id
    FOREIGN KEY REFERENCES students(id)
    ON UPDATE CASCADE ON DELETE CASCADE
)

-- Down
DROP TABLE students;
DROP TABLE teachers;
DROP TABLE classes;
DROP TABLE student_classes;