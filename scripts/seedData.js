require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const User = require('../models/User');
const Equipment = require('../models/Equipment');
const MaintenanceRequest = require('../models/MaintenanceRequest');
const Team = require('../models/Team');

connectDB();

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Equipment.deleteMany({});
        await MaintenanceRequest.deleteMany({});
        await Team.deleteMany({});

        // Create Users
        const users = await User.insertMany([
            {
                username: 'admin',
                email: 'admin@gearguard.com',
                password: 'admin123',
                role: 'admin'
            },
            {
                username: 'johnsmith',
                email: 'john@example.com',
                password: 'user123',
                role: 'user'
            },
            {
                username: 'robertgarcia',
                email: 'robert@example.com',
                password: 'tech123',
                role: 'technician'
            },
            {
                username: 'jamesmartinez',
                email: 'james@example.com',
                password: 'tech123',
                role: 'technician'
            },
            {
                username: 'thomasanderson',
                email: 'thomas@example.com',
                password: 'tech123',
                role: 'technician'
            },
            {
                username: 'williamtaylor',
                email: 'william@example.com',
                password: 'tech123',
                role: 'technician'
            },
            {
                username: 'christopherlee',
                email: 'christopher@example.com',
                password: 'tech123',
                role: 'technician'
            },
            {
                username: 'danielharris',
                email: 'daniel@example.com',
                password: 'tech123',
                role: 'technician'
            },
            {
                username: 'matthewclark',
                email: 'matthew@example.com',
                password: 'tech123',
                role: 'technician'
            },
            {
                username: 'andrewlewis',
                email: 'andrew@example.com',
                password: 'tech123',
                role: 'technician'
            }
        ]);

        // Create Equipment
        const equipment = await Equipment.insertMany([
            {
                name: 'CNC Milling Machine',
                category: 'Machinery',
                serialNumber: 'CNC-2024-001',
                department: 'Production',
                assignedTo: 'John Smith',
                location: 'Building A, Floor 2',
                team: 'Mechanics',
                maintenanceCount: 3
            },
            {
                name: 'Industrial Robot Arm',
                category: 'Robotics',
                serialNumber: 'ROB-2023-045',
                department: 'Assembly',
                assignedTo: 'Sarah Johnson',
                location: 'Building B, Floor 1',
                team: 'Electricians',
                maintenanceCount: 1
            },
            {
                name: 'Server Rack Unit',
                category: 'IT Equipment',
                serialNumber: 'SRV-2024-012',
                department: 'IT',
                assignedTo: 'Mike Wilson',
                location: 'Data Center, Room 101',
                team: 'IT Support',
                maintenanceCount: 0
            },
            {
                name: 'Hydraulic Press',
                category: 'Production',
                serialNumber: 'HYD-2021-089',
                department: 'Production',
                assignedTo: 'Emily Davis',
                location: 'Building A, Floor 1',
                team: 'Mechanics',
                maintenanceCount: 2
            }
        ]);

        // Create Teams
        const teams = await Team.insertMany([
            {
                name: 'Mechanics',
                members: [
                    { userId: users[2]._id, name: 'Robert Garcia', role: 'Lead Technician', avatar: 'RG' },
                    { userId: users[3]._id, name: 'James Martinez', role: 'Senior Mechanic', avatar: 'JM' },
                    { userId: users[4]._id, name: 'Thomas Anderson', role: 'Mechanic', avatar: 'TA' }
                ]
            },
            {
                name: 'Electricians',
                members: [
                    { userId: users[5]._id, name: 'William Taylor', role: 'Lead Electrician', avatar: 'WT' },
                    { userId: users[6]._id, name: 'Christopher Lee', role: 'Electrician', avatar: 'CL' }
                ]
            },
            {
                name: 'IT Support',
                members: [
                    { userId: users[7]._id, name: 'Daniel Harris', role: 'IT Lead', avatar: 'DH' },
                    { userId: users[8]._id, name: 'Matthew Clark', role: 'System Admin', avatar: 'MC' },
                    { userId: users[9]._id, name: 'Andrew Lewis', role: 'IT Technician', avatar: 'AL' }
                ]
            }
        ]);

        // Create Maintenance Requests
        const today = new Date();
        const requests = await MaintenanceRequest.insertMany([
            {
                requestId: '#MR-001',
                title: 'Unusual vibration during operation',
                equipment: 'CNC Milling Machine',
                equipmentId: equipment[0]._id,
                priority: 'high',
                status: 'new',
                description: 'Machine shows unusual vibration during operation',
                submittedBy: users[1]._id,
                assignedTo: users[2]._id,
                submittedDate: new Date(today.getFullYear(), today.getMonth(), 3)
            },
            {
                requestId: '#MR-002',
                title: 'Filter replacement',
                equipment: 'HVAC System',
                priority: 'medium',
                status: 'new',
                description: 'HVAC filter needs replacement',
                submittedBy: users[1]._id,
                assignedTo: users[6]._id,
                submittedDate: new Date(today.getFullYear(), today.getMonth(), 5)
            },
            {
                requestId: '#MR-003',
                title: 'Quarterly preventive maintenance',
                equipment: 'Industrial Robot Arm',
                equipmentId: equipment[1]._id,
                priority: 'medium',
                status: 'in-progress',
                description: 'Quarterly preventive maintenance scheduled',
                submittedBy: users[0]._id,
                assignedTo: users[5]._id,
                submittedDate: new Date(today.getFullYear(), today.getMonth(), 8),
                startDate: new Date(today.getFullYear(), today.getMonth(), 8),
                timeElapsed: '4h'
            },
            {
                requestId: '#MR-004',
                title: 'Motor replacement needed',
                equipment: 'CNC Milling Machine',
                equipmentId: equipment[0]._id,
                priority: 'critical',
                status: 'in-progress',
                description: 'Motor needs replacement',
                submittedBy: users[0]._id,
                assignedTo: users[4]._id,
                submittedDate: new Date(today.getFullYear(), today.getMonth(), 12),
                startDate: new Date(today.getFullYear(), today.getMonth(), 12),
                timeElapsed: '8h'
            },
            {
                requestId: '#MR-005',
                title: 'Oil leak repair',
                equipment: 'Hydraulic Press',
                equipmentId: equipment[3]._id,
                priority: 'high',
                status: 'repaired',
                description: 'Oil leak detected and repaired',
                submittedBy: users[1]._id,
                assignedTo: users[3]._id,
                submittedDate: new Date(today.getFullYear(), today.getMonth(), 15),
                startDate: new Date(today.getFullYear(), today.getMonth(), 15),
                completedDate: new Date(today.getFullYear(), today.getMonth(), 15),
                timeElapsed: '6h'
            }
        ]);

        console.log('✅ Demo data seeded successfully!');
        console.log(`- ${users.length} users created`);
        console.log(`- ${equipment.length} equipment items created`);
        console.log(`- ${teams.length} teams created`);
        console.log(`- ${requests.length} maintenance requests created`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();

