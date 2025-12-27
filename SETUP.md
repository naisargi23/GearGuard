# GearGuard - Setup and Running Guide

## Prerequisites

Before running the application, make sure you have the following installed:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)

## Step-by-Step Setup

### 1. Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 2. Configure Environment Variables

Make sure your `.env` file exists in the root directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/gearguard
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=3000
```

**Important Notes:**
- **MONGODB_URI**: 
  - For local MongoDB: `mongodb://localhost:27017/gearguard`
  - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/gearguard`
- **JWT_SECRET**: Change this to a random secret string for security (e.g., use `openssl rand -base64 32`)

### 3. Start MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB service is running on your system
- On Windows: MongoDB usually runs as a service automatically
- On Mac/Linux: Run `mongod` or `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
- No local setup needed, just use your Atlas connection string in `.env`

### 4. Run the Application

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Troubleshooting

### MongoDB Connection Error

If you see a MongoDB connection error:

1. **Check if MongoDB is running:**
   - Windows: Check Services (services.msc) for MongoDB
   - Mac/Linux: `sudo systemctl status mongod`

2. **Verify your MONGODB_URI:**
   - Make sure the connection string in `.env` is correct
   - For local: `mongodb://localhost:27017/gearguard`
   - Check if MongoDB is running on the default port 27017

3. **Test MongoDB connection:**
   ```bash
   mongosh mongodb://localhost:27017/gearguard
   ```

### JWT_SECRET Error

If you see JWT_SECRET errors:

1. Make sure `.env` file exists in the root directory
2. Verify `JWT_SECRET` is set in the `.env` file
3. Restart the server after changing `.env`

### Port Already in Use

If port 3000 is already in use:

1. Change the PORT in `.env` to a different port (e.g., `PORT=3001`)
2. Or stop the process using port 3000

### Module Not Found Errors

If you see module not found errors:

1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

## Testing the Application

1. **Register a new user:**
   - Click on "Register" tab
   - Fill in username, email, password
   - Select a role (admin, technician, or user)
   - Click "Register"

2. **Login:**
   - Use the email and password you registered with
   - Optionally select a role to verify access
   - Click "Login"

3. **View Dashboard:**
   - After successful login, you'll see the dashboard based on your role
   - Admin: Full dashboard with stats, workflow, and maintenance requests
   - Technician: Task management dashboard
   - User: Request submission dashboard

## Project Structure

```
GearGuard/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   └── User.js              # User model
├── routes/
│   └── auth.js              # Authentication routes
├── public/
│   └── index.html           # Frontend application
├── server.js                 # Main server file
├── package.json              # Dependencies
└── .env                      # Environment variables (create this)
```

## Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-reload (requires nodemon)

## Need Help?

If you encounter any issues:
1. Check the server console for error messages
2. Check the browser console (F12) for client-side errors
3. Verify all environment variables are set correctly
4. Make sure MongoDB is running and accessible

