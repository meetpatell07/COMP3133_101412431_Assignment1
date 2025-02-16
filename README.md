# Employee Management System (Backend API)

## Overview

This project is a GraphQL API for managing employee data. It allows users to create, update, delete, and search employees using GraphQL queries and mutations. The backend is built with Node.js, Express, GraphQL, and MongoDB. This application also includes basic validation, error handling, and an optional JWT authentication system for secure API access.

## Features

- **Signup:** Allows users to create a new account.
- **Login:** Users can log into the system using their credentials.
- **Get All Employees:** Fetch a list of all employees in the database.
- **Add New Employee:** Add a new employee to the system.
- **Search Employee by Employee ID:** Retrieve employee details using their unique employee ID.
- **Update Employee by Employee ID:** Update employee details such as salary, designation, etc.
- **Delete Employee by Employee ID:** Delete an employee from the database.
- **Search Employee by Designation or Department:** Find employees based on their designation or department.

## Technologies Used

- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for Node.js.
- **GraphQL**: Query language for APIs.
- **MongoDB**: NoSQL database for storing user and employee data.
- **Apollo Server**: GraphQL server implementation.
- **express-validator**: Data validation middleware.
- **JWT (Optional)**: JSON Web Tokens for securing API calls.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- Node.js and npm
- MongoDB (either locally or using a cloud database like MongoDB Atlas)
- Postman (for testing the APIs)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/StudentID_COMP3133_Assignment1.git
    cd Employee-Management-System
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI and other configurations.

4. Run the application:

    ```bash
    npm start
    ```

5. The API will be available at `http://localhost:4000/graphql`.

### GraphQL Endpoints

- **Signup:** `mutation signup(username: String, email: String, password: String)`
- **Login:** `query login(username: String, password: String)`
- **Get All Employees:** `query getAllEmployees`
- **Add New Employee:** `mutation addEmployee(firstName: String, lastName: String, email: String, gender: String, designation: String, salary: Float, dateOfJoining: String, department: String)`
- **Search Employee by ID:** `query searchEmployeeById(employeeId: ID)`
- **Update Employee:** `mutation updateEmployee(employeeId: ID, firstName: String, lastName: String, email: String, gender: String, designation: String, salary: Float, dateOfJoining: String, department: String)`
- **Delete Employee:** `mutation deleteEmployee(employeeId: ID)`
- **Search Employee by Designation or Department:** `query searchEmployeeByDesignationOrDepartment(designation: String, department: String)`


