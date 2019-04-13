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
    ON UPDATE CASCADE
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

insert into teachers (first_name, last_name) values 
  ('David the Dementor', 'Krett');

insert into teachers (first_name, last_name) values ('Tim', 'Williams');

insert into classes (code, name, teacher_id, start_date, end_date) values 
  ('BCDV1006', 'Full Stack Development I', 1, '2019-01-01', '2019-01-31');

insert into classes (code, name, teacher_id, start_date, end_date) values 
  ('BCDV1007', 'Full Stack Development II', 2, '2019-02-01', '2019-02-28');

insert into classes (code, name, teacher_id, start_date, end_date) values 
  ('BCDV1008', 'Full Stack Development III', 1, '2019-03-01', '2019-03-31');

insert into students (first_name, last_name) values ('Dima', 'Kokarovtsev');
insert into students (first_name, last_name) values ('Student', 'Two');
insert into students (first_name, last_name) values ('Classmate', 'Three');

insert into student_classes values (1, 1);
insert into student_classes values (2, 1);
insert into student_classes values (3, 1);
insert into student_classes values (2, 2);
insert into student_classes values (2, 3);
insert into student_classes values (3, 3);



-- Down
DROP TABLE students;
DROP TABLE teachers;
DROP TABLE classes;
DROP TABLE student_classes;