# Quick Start Guide - GearGuard with Database

## Step 1: Seed the Database

Run the seed script to populate the database with demo data:

```bash
npm run seed
```

This will create:
- **10 Users** (1 admin, 1 user, 8 technicians)
- **4 Equipment** items
- **3 Teams** (Mechanics, Electricians, IT Support)
- **5 Maintenance Requests**

## Step 2: Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## Step 3: Login

Use these demo credentials:

### Admin Account
- **Email**: `admin@gearguard.com`
- **Password**: `admin123`

### User Account
- **Email**: `john@example.com`
- **Password**: `user123`

### Technician Account
- **Email**: `robert@example.com`
- **Password**: `tech123`

## Step 4: Explore the Dashboard

### Admin Dashboard Features:
1. **Dashboard** - View stats, workflow, and recent requests (all from database)
2. **Maintenance** - Kanban board with real maintenance requests
3. **Calendar** - Monthly calendar with maintenance events from database
4. **Equipment** - View all equipment from database
5. **Reporting** - Analytics charts with real data
6. **Teams** - View teams with members and active requests

### User Dashboard Features:
1. **Dashboard** - View your request statistics
2. **My Requests** - See all your submitted requests from database
3. **Calendar** - View scheduled maintenance for your equipment
4. **New Request** - Submit new maintenance requests (saved to database)

### Technician Dashboard Features:
1. **Dashboard** - View assigned tasks
2. **My Tasks** - See assigned maintenance requests
3. **Calendar** - View your maintenance schedule
4. **Reports** - Generate reports

## Data Flow

All data is now loaded from the MongoDB database:
- ✅ Dashboard stats calculated from real data
- ✅ Equipment list from database
- ✅ Maintenance requests from database
- ✅ Teams with real member data
- ✅ Reports with actual analytics
- ✅ Calendar events from maintenance requests
- ✅ User requests filtered by user

## Testing New Features

1. **Submit a Request** (as User):
   - Go to "My Requests"
   - Click "+ New Request"
   - Fill the form and submit
   - See it appear in the table

2. **View Equipment** (as Admin):
   - Go to "Equipment"
   - See all equipment from database
   - Search and filter

3. **View Maintenance** (as Admin):
   - Go to "Maintenance"
   - See Kanban board with requests grouped by status
   - All data from database

4. **View Teams** (as Admin):
   - Go to "Teams"
   - See teams with members and active request counts

## Troubleshooting

### Database Not Connected
- Make sure MongoDB is running
- Check `.env` file has correct `MONGODB_URI`

### No Data Showing
- Run `npm run seed` to populate database
- Check browser console for errors
- Verify API endpoints are working

### Authentication Errors
- Make sure JWT_SECRET is set in `.env`
- Check token is being stored in localStorage
- Verify user is logged in

## Next Steps

The application is now fully connected to the database! All views load real data from MongoDB. You can:
- Add more equipment
- Create maintenance requests
- Manage teams
- View analytics
- Track maintenance schedules

Enjoy your fully functional GearGuard system! 🚀

