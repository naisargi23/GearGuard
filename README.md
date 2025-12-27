# GearGuard - Maintenance Management System

A comprehensive maintenance management system with role-based access control, built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Admin, Technician, User)

### 📊 Admin Dashboard
- **Dashboard**: Overview with stats, workflow stages, and recent requests
- **Maintenance**: Kanban board view for managing maintenance requests
- **Maintenance Calendar**: Monthly calendar view with scheduled maintenance
- **Equipment**: Complete equipment management with search and filters
- **Reporting**: Analytics with charts (Requests by Team, Status, Types)
- **Teams**: Team management with member details

### 🔧 Technician Dashboard
- **Dashboard**: Task overview and quick actions
- **My Tasks**: Assigned maintenance tasks
- **Equipment**: View equipment details
- **Calendar**: Personal maintenance schedule
- **Reports**: Generate maintenance reports

### 👤 User Dashboard
- **Dashboard**: Request statistics
- **My Requests**: View and track submitted requests
- **Calendar**: View scheduled maintenance for equipment
- **Equipment Status**: Check equipment status
- **New Request**: Submit maintenance requests

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Security**: bcryptjs for password hashing

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GearGuard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/gearguard
   JWT_SECRET=your_super_secret_jwt_key_change_this
   PORT=3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed demo data (optional)**
   ```bash
   npm run seed
   ```
   This will create:
   - Demo users (admin, technicians, users)
   - Sample equipment
   - Maintenance teams
   - Maintenance requests

6. **Start the server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

7. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Demo Credentials

After running `npm run seed`, you can use these credentials:

### Admin
- Email: `admin@gearguard.com`
- Password: `admin123`

### User
- Email: `john@example.com`
- Password: `user123`

### Technician
- Email: `robert@example.com`
- Password: `tech123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Equipment
- `GET /api/equipment` - Get all equipment (protected)
- `GET /api/equipment/:id` - Get single equipment (protected)
- `POST /api/equipment` - Create equipment (protected)
- `PUT /api/equipment/:id` - Update equipment (protected)
- `DELETE /api/equipment/:id` - Delete equipment (protected)

### Maintenance Requests
- `GET /api/maintenance` - Get all requests (protected)
- `GET /api/maintenance/:id` - Get single request (protected)
- `POST /api/maintenance` - Create request (protected)
- `PUT /api/maintenance/:id` - Update request (protected)
- `DELETE /api/maintenance/:id` - Delete request (protected)

### Teams
- `GET /api/teams` - Get all teams (protected)
- `GET /api/teams/:id` - Get single team (protected)
- `POST /api/teams` - Create team (protected)

### Reports
- `GET /api/reports` - Get reports data (protected)

## Project Structure

```
GearGuard/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── User.js              # User model
│   ├── Equipment.js         # Equipment model
│   ├── MaintenanceRequest.js # Maintenance request model
│   └── Team.js              # Team model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── equipment.js         # Equipment routes
│   ├── maintenance.js       # Maintenance routes
│   ├── teams.js             # Teams routes
│   └── reports.js           # Reports routes
├── scripts/
│   └── seedData.js          # Database seeding script
├── public/
│   └── index.html           # Frontend application
├── server.js                 # Main server file
├── package.json              # Dependencies
└── .env                      # Environment variables
```

## Features in Detail

### Dashboard Views
- **Stats Cards**: Real-time statistics for each role
- **Workflow Visualization**: Track request status through stages
- **Data Tables**: Sortable, searchable tables with pagination
- **Interactive Charts**: Visual analytics for reports

### Maintenance Management
- **Kanban Board**: Drag-and-drop interface for request management
- **Calendar View**: Monthly view with color-coded events
- **Priority System**: Critical, High, Medium, Low priorities
- **Status Tracking**: New → In Progress → Repaired → Scrap

### Equipment Management
- **Search & Filter**: Find equipment quickly
- **Department Filtering**: Filter by department
- **Team Assignment**: Assign equipment to teams
- **Maintenance Tracking**: Track maintenance count per equipment

## Development

### Adding New Features
1. Create model in `models/` directory
2. Create routes in `routes/` directory
3. Add route to `server.js`
4. Update frontend to use new API endpoints

### Database Seeding
To reset and seed the database:
```bash
npm run seed
```

## Security

- Passwords are hashed using bcryptjs
- JWT tokens for secure authentication
- Protected routes require authentication
- Role-based access control

## License

MIT License

## Support

For issues and questions, please open an issue on the repository.

