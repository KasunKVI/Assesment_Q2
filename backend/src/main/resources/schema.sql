CREATE TABLE IF NOT EXISTS designation (
    designation_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) DEFAULT NULL,
    remark VARCHAR(100) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS employee (
    employee INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(45) DEFAULT NULL,
    date_of_joining DATETIME DEFAULT NULL,
    is_manager TINYINT(4) DEFAULT 0,
    designation_id INT DEFAULT NULL,
    CONSTRAINT fk_employee_designation FOREIGN KEY (designation_id) REFERENCES designation(designation_id) ON DELETE SET NULL
);
