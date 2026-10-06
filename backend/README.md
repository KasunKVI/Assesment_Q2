# Question 02: Spring Boot Backend (Employee & Designation Management)

Enterprise Spring Boot 3 REST API backend for managing employee records and designations.

## Features

- **Designation CRUD**: Full management of employee designations (ID, Name, Remark).
- **Employee CRUD**: Full management of employees (ID, Full Name, Designation, Date of Join, Is Manager).
- **Name Splitting Logic**: Automatically splits full names by first space into `firstName` and `lastName`.
- **Database Support**: Out-of-the-box in-memory H2 database for instant local execution + MySQL 8.0 DDL scripts.
- **REST APIs**: Full OpenAPI/JSON endpoints with CORS configured for React Vite frontend (`http://localhost:5173`).

---

## Technical Stack

- **Language**: Java 17
- **Framework**: Spring Boot 3.2.3, Spring Data JPA, Spring Web
- **Database**: H2 (Development/Test), MySQL 8.0 compatible
- **Build System**: Maven 3.8+

---

## API Endpoints

### 1. Designations
- `GET /api/designations` - Fetch all designations
- `GET /api/designations/{id}` - Fetch designation by ID
- `POST /api/designations` - Create new designation
- `PUT /api/designations/{id}` - Update designation
- `DELETE /api/designations/{id}` - Delete designation

### 2. Employees
- `GET /api/employees` - Fetch all employees (includes split `firstName` & `lastName`)
- `GET /api/employees/{id}` - Fetch employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee details
- `DELETE /api/employees/{id}` - Delete employee

---

## How to Build & Run

```bash
# Run unit tests
mvn clean test

# Launch Spring Boot server (Runs on port 8080)
mvn spring-boot:run
```

H2 Database Console available at: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:employeedb`).
