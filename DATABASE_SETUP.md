# Database Setup and Data Seeding Guide

## Overview

GearGuard now uses MongoDB to store all data. The application includes:
- ✅ Complete database models
- ✅ API endpoints for all features
- ✅ Demo data seeding script
- ✅ Frontend connected to database

## Database Models

### 1. User Model
- Username, Email, Password (hashed)
- Role (admin, technician, user)
- Created timestamp

### 2. Equipment Model
- Name, Category, Serial Number
- Department, Assigned To, Location
- Team assignment
- Maintenance count
- Status (active, inactive, maintenance)

### 3. MaintenanceRequest Model
- Request ID (auto-generated)
- Title, Equipment, Description
- Priority (low, medium, high, critical)
- Status (new, in-progress, repaired, scrap)
- Submitted by, Assigned to
- Dates (submitted, start, completed)
- Time elapsed

### 4. Team Model
- Team name
- Members (with user references)
- Active requests count

## Seeding the Database

### Step 1: Run the Seed Script

```bash
npm run seed
```

### What Gets Created:

**Users (10 total):**
- 1 Admin: admin@gearguard.com
- 1 User: john@example.com
- 8 Technicians: robert, james, thomas, william, christopher, daniel, matthew, andrew

**Equipment (4 items):**
- CNC Milling Machine
- Industrial Robot Arm
- Server Rack Unit
- Hydraulic Press

**Teams (3 teams):**
- Mechanics (3 members)
- Electricians (2 members)
- IT Support (3 members)

**Maintenance Requests (5 requests):**
- 2 New requests
- 2 In Progress requests
- 1 Repaired request

## API Endpoints

All endpoints require authentication (JWT token in Authorization header).

### Equipment
- `GET /api/equipment` - Get all equipment
- `GET /api/equipment/:id` - Get single equipment
- `POST /api/equipment` - Create equipment
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment

### Maintenance
- `GET /api/maintenance` - Get all requests (with optional ?status= filter)
- `GET /api/maintenance/:id` - Get single request
- `POST /api/maintenance` - Create request
- `PUT /api/maintenance/:id` - Update request
- `DELETE /api/maintenance/:id` - Delete request

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get single team
- `POST /api/teams` - Create team

### Reports
- `GET /api/reports` - Get reports data (requests by team, status, types)

## Frontend Integration

The frontend now:
- ✅ Loads dashboard stats from database
- ✅ Displays equipment from database
- ✅ Shows maintenance requests from database
- ✅ Loads teams with real data
- ✅ Calculates reports from database
- ✅ Shows calendar events from maintenance requests
- ✅ Filters user requests by logged-in user

## Data Flow Example

1. **User logs in** → Token stored → API calls authenticated
2. **Dashboard loads** → Fetches maintenance requests → Calculates stats
3. **Equipment view** → Fetches all equipment → Displays in table
4. **Maintenance view** → Fetches requests → Groups by status → Shows in Kanban
5. **Calendar view** → Fetches requests → Extracts dates → Shows on calendar
6. **User submits request** → POST to API → Saved to database → View refreshes

## Testing the Integration

1. **Seed database**: `npm run seed`
2. **Start server**: `npm start`
3. **Login as admin**: admin@gearguard.com / admin123
4. **Check dashboard**: Stats should show real numbers
5. **View equipment**: Should show 4 equipment items
6. **View maintenance**: Should show 5 requests in Kanban
7. **View teams**: Should show 3 teams with members
8. **View calendar**: Should show maintenance events on dates

## Adding More Data

You can add more data by:
1. Using the API endpoints (POST requests)
2. Modifying the seed script
3. Using MongoDB directly

## Troubleshooting

### "No data showing"
- Run `npm run seed` again
- Check MongoDB is running
- Verify `.env` has correct MONGODB_URI

### "Authentication failed"
- Check JWT_SECRET is set in `.env`
- Verify token is in localStorage
- Check browser console for errors

### "API errors"
- Check server console for errors
- Verify routes are registered in server.js
- Check CORS settings

## Next Steps

Your application is now fully database-driven! All views load real data from MongoDB. You can:
- Add more equipment via API
- Create maintenance requests
- Manage teams
- View real-time analytics
- Track maintenance schedules

Enjoy your fully functional maintenance management system! 🎉

