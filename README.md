# Task Management Application

A complete full-stack Task Management application built with Node.js + MongoDB backend and Angular frontend.

## Features

### Backend (Node.js + Express + MongoDB)
- **User Authentication**: JWT-based authentication with refresh tokens
- **Task Management**: Full CRUD operations with role-based access control
- **File Uploads**: Support for multiple file attachments
- **Email Notifications**: Automatic email notifications to admin on task creation
- **Activity Logging**: Complete audit trail of all task modifications
- **Pagination & Filtering**: Advanced search with filters and sorting
- **Rate Limiting**: Global rate limiting to prevent abuse
- **Swagger Documentation**: Interactive API documentation

### Frontend (Angular 20)
- **Authentication UI**: Modern login and registration forms
- **Task Management UI**: Create, read, update, delete tasks
- **Advanced Filters**: Filter by priority, status, due date, search
- **File Management**: Upload and download files from tasks
- **Activity View**: View complete activity logs for tasks
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Express server
│   ├── uploads/             # File uploads directory
│   ├── .env                 # Environment variables
│   └── package.json
└── src/
    ├── app/
    │   ├── auth/            # Authentication components
    │   ├── tasks/           # Task management components
    │   ├── shared/          # Services and models
    │   ├── app.component.ts # Root component
    │   └── app.routing.ts   # Route definitions
    ├── main.ts              # Angular bootstrap
    ├── global_styles.css    # Global styles
    └── index.html           # HTML template
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@taskmanagement.com
```

5. Start MongoDB:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

6. Start the backend server:
```bash
npm start
```

The API will be available at `http://localhost:5000`
API Documentation: `http://localhost:5000/api-docs`

### Frontend Setup

1. In the project root directory, install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Tasks
- `GET /api/tasks` - List all tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/:taskId/logs` - Get task activity logs

## Authentication

The application uses JWT for authentication:
1. Access tokens are valid for 15 minutes
2. Refresh tokens are valid for 7 days
3. Tokens are stored in localStorage (with protection measures)
4. Automatic token refresh on 401 responses

## File Upload

- Maximum file size: 5MB
- Supported formats: Images (JPEG, PNG, GIF), Documents (PDF, Word, Excel), Text files
- Files are stored in the `/backend/uploads` directory

## Database Models

### User
- email (unique)
- password (hashed)
- firstName
- lastName
- role (user/admin)
- refreshTokens
- timestamps

### Task
- title
- description
- dueDate
- priority (Low/Medium/High)
- status (Pending/In-Progress/Completed)
- tags
- files
- createdBy (userId)
- timestamps

### TaskLog
- taskId
- userId
- action (Created/Updated/StatusChanged/Deleted)
- changes
- timestamp

## Validation Rules

- **Title**: Required, non-empty
- **DueDate**: Required, must be future date
- **Priority**: Low, Medium, or High
- **Status**: Pending, In-Progress, or Completed
- **Tags**: Array of strings
- **Files**: Maximum 5 files, max size 5MB each

## Error Handling

All API responses follow a consistent format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

Common error codes:
- 400: Bad Request (validation error)
- 401: Unauthorized (missing/invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 429: Too Many Requests (rate limit exceeded)
- 500: Server Error

## Rate Limiting

- Global rate limit: 100 requests per minute per IP
- Returns 429 status when limit exceeded

## Development

### Run Backend in Development Mode
```bash
cd backend
npm run dev
```

### Run Frontend Build
```bash
npm run build
```

## Testing

To test the application:
1. Register a new user account
2. Login with credentials
3. Create a task with file attachments
4. Edit and update task status
5. View activity logs
6. Test filters and search functionality

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Refresh token rotation
- Role-based access control
- Protected routes with guards
- CORS enabled
- Helmet for HTTP headers
- Rate limiting
- Input validation and sanitization

## Performance

- Indexed MongoDB queries
- Pagination support
- Efficient filtering and sorting
- Client-side caching with HTTP interceptors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**MongoDB connection error**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network connectivity

**File upload not working**
- Check upload folder permissions
- Verify file size is under 5MB
- Check supported file types

**CORS errors**
- Ensure backend URL is correct in Angular services
- Check CORS configuration in Express

## Future Enhancements

- Real-time notifications with WebSockets
- Task collaboration features
- Email reminders for due dates
- Task templates
- Team workspaces
- Advanced reporting and analytics
- Mobile app
- Dark mode
- Two-factor authentication

## License

MIT License

## Support

For issues or questions, please contact the development team.
