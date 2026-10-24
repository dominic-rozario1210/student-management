# Mentor and Student Management API

A RESTful API built with **Node.js, Express.js, MongoDB, and Mongoose** to manage mentors and students. The application supports creating mentors and students, assigning students to mentors, retrieving assigned and unassigned students, and tracking previous mentors.

## Features

- Create a mentor
- Create a student
- Assign multiple students to a mentor
- Retrieve all unassigned students
- Assign or change a student's mentor
- Retrieve all students assigned to a specific mentor
- Retrieve a student's previous mentor history
- Validate MongoDB ObjectIds
- Handle errors with appropriate HTTP status codes

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

## Project Structure

```text
mentor-student-management-api/
├── controllers/
│   ├── mentor.controller.js
│   └── student.controller.js
├── models/
│   ├── mentor.model.js
│   └── student.model.js
├── routers/
│   ├── mentor.router.js
│   └── student.router.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

*Note: Adjust the filenames above to match your actual project structure.*

## Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate into the project folder:

   ```bash
   cd mentor-student-management-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

   Make sure your `package.json` contains a development script such as `"dev": "nodemon index.js"`. Alternatively, run `node index.js`.

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/mentor` | Create a mentor |
| POST | `/api/student` | Create a student |
| PUT | `/api/mentor/:mentorId/assign-students` | Assign multiple students to a mentor |
| GET | `/api/student/unassigned` | Get all unassigned students |
| PUT | `/api/student/:studentId/assign-mentor` | Assign or change a student's mentor |
| GET | `/api/mentor/:mentorId/students` | Get students assigned to a mentor |
| GET | `/api/student/:studentId/previous-mentor` | Get a student's previous mentor history |

## Example Requests

### Create a Mentor

`POST /api/mentor`

```json
{
  "name": "John",
  "email": "john@example.com"
}
```

### Create a Student

`POST /api/student`

```json
{
  "name": "David",
  "email": "david@example.com"
}
```

### Assign Multiple Students to a Mentor

`PUT /api/mentor/MENTOR_ID/assign-students`

```json
{
  "studentIds": [
    "STUDENT_ID_1",
    "STUDENT_ID_2"
  ]
}
```

Replace the example IDs with valid MongoDB document IDs.

## Testing

Use **Postman** to test the API endpoints. Start the server, send requests to the endpoints, and verify the JSON responses and HTTP status codes.

## Environment Variables

- `PORT` — Port used by the Express server.
- `MONGO_URI` — MongoDB connection string.

**Important:** Never commit your `.env` file or expose your MongoDB credentials publicly.

## Learning Outcomes

This project demonstrates REST API development, CRUD operations, Mongoose models and references, request validation, asynchronous controllers, error handling, and relationships between MongoDB documents.

## License

This project is intended for learning and educational purposes.
