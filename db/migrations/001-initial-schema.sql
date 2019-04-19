-- Up
CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT
);

CREATE TABLE teachers (
  id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT
);

CREATE TABLE classes (
  id INTEGER PRIMARY KEY,
  code TEXT,
  name TEXT,
  teacher_id INTEGER,
  start_date TEXT,
  end_date TEXT,
  CONSTRAINT classes_fk_teacher_id 
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE student_classes (
  class_id INTEGER,
  student_id INTEGER,
  CONSTRAINT student_classes_fk_class_id
    FOREIGN KEY (class_id) REFERENCES classes(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT student_classes_fk_student_id
    FOREIGN KEY (student_id) REFERENCES students(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

-- Down
DROP TABLE students;
DROP TABLE teachers;
DROP TABLE classes;
DROP TABLE student_classes;