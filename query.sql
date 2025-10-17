DROP DATABASE IF EXISTS dbhrcareer_talent;
CREATE DATABASE dbhrcareer_talent;
use dbhrcareer_talent;

CREATE TABLE job_roles(
	JRID INT(11) AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE,
   	description VARCHAR(255) NOT NULL,
    responsibility VARCHAR(255) NOT NULL,
    requirements VARCHAR(255) NOT NULL
);

CREATE TABLE employee(
	EID INT(11) AUTO_INCREMENT PRIMARY KEY,
    JRID INT(11),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255) NOT NULL,
	FOREIGN KEY (JRID) REFERENCES job_roles(JRID)
);

CREATE TABLE competencies(
	CID INT(11) AUTO_INCREMENT PRIMARY KEY,
    competency_name VARCHAR(50) UNIQUE,
    type ENUM('skills', 'knowldge', 'behavior')
);

CREATE TABLE role_competencies(
	RCID INT(11) AUTO_INCREMENT PRIMARY KEY,
   	JRID INT(11),
    CID INT(11),	
    FOREIGN KEY (JRID) REFERENCES job_roles(JRID),
    FOREIGN KEY (CID) REFERENCES competencies(CID)
);

CREATE TABLE employee_competency(
	ECID INT(11) AUTO_INCREMENT PRIMARY KEY,
   	EID INT(11),
    CID INT(11),
    level_attained INT(11) NOT NULL,
    FOREIGN KEY (EID) REFERENCES employee(EID),
    FOREIGN KEY (CID) REFERENCES competencies(CID)
);

CREATE TABLE hr_users(
	HRID INT(11) AUTO_INCREMENT PRIMARY KEY,
   	name varchar(50) NOT NULL,
    email varchar(50) UNIQUE,
	password varchar(255) NOT NULL,
    role enum('admin', 'manager', 'analyst') NOT NULL
);

CREATE TABLE courses(
	course_id  INT(11) AUTO_INCREMENT PRIMARY KEY,
   	course_name varchar(50) UNIQUE,
    description	varchar(255) NOT NULL,
    department varchar(50) NOT NULL,
    duration varchar(50) NOT NULL,
    format ENUM('Blended', 'Video', 'E-learning'),
    created_by int(11),
    FOREIGN KEY (created_by) REFERENCES hr_users(HRID)
);

CREATE TABLE enrollments(
	enrollment_id  INT(11) AUTO_INCREMENT PRIMARY KEY,
   	EID INT(11),
    course_id INT(11),
    progress INT(11) NOT NULL,
    status enum('in-progress', 'completed', 'dropped') NOT NULL,
    overall_score int(11) NOT NULL,
    FOREIGN KEY (EID) REFERENCES employee(EID),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE trainer(
    trainer_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    is_external BOOLEAN NOT NULL
);

CREATE TABLE TrainingSessions(
    session_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    session_name VARCHAR(50),
    venue VARCHAR(50) NOT NULL,
    session_date DATE NOT NULL,
    start_date TIME NOT NULL,
    end_date TIME NOT NULL,
    course_id INT(11),
    trainer_id INT(11),
    total_enrolled INT(11) NOT NULL DEFAULT 0,
    max_participants INT(11) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    FOREIGN KEY (trainer_id) REFERENCES trainer(trainer_id)
);

CREATE TABLE SessionAttendance(
    session_attendance_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    session_id INT(11),
    EID INT(11),
    FOREIGN KEY (session_id) REFERENCES TrainingSessions(session_id),
    FOREIGN KEY (EID) REFERENCES employee(EID)
);

CREATE TABLE SuccessionPlans(
    plan_id INT(11) AUTO_INCREMENT PRIMARY KEY,
	JRID  INT(11),
    critical_stage INT(11) NOT NULL DEFAULT 0,
    status enum('Low', 'Medium', 'High') NOT NULL,	
    FOREIGN KEY (JRID) REFERENCES job_roles(JRID)
);

CREATE TABLE SuccessorCandidates(
    candidate_id INT(11) AUTO_INCREMENT PRIMARY KEY,
	EID INT(11),
    SCID INT(11),
    readiness_level	enum ('Ready Now', 'Ready Soon', 'Needs Development') NOT NULL,
    FOREIGN KEY (EID) REFERENCES employee(EID),
    FOREIGN KEY (SCID) REFERENCES SuccessionPlans(plan_id)
);

CREATE TABLE DevelopmentPlans(
    DPID INT(11) AUTO_INCREMENT PRIMARY KEY,
	EID INT(11),
    target_role_id INT(11),
    skill_gaps INT(11),
    performance_score INT(11) NOT NULL,
    goal_title VARCHAR(50) NOT NULL,
    FOREIGN KEY (EID) REFERENCES employee(EID),
    FOREIGN KEY (target_role_id) REFERENCES job_roles(JRID)
);

CREATE TABLE DevelopmentSteps(
    DSID INT(11) AUTO_INCREMENT PRIMARY KEY,
	DPID INT(11),
    enrollment_id INT(11),
    priority INT(11) NOT NULL,
    due_date DATE NOT NULL,
    FOREIGN KEY (DPID) REFERENCES DevelopmentPlans(DPID),
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(enrollment_id)
);
