// backend/server.js - Clean Version
const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);
const PORT = 3000; // ← Only declare PORT once!

// Middleware
app.use(cors());
app.use(express.json());

// Basic route to test server
app.get('/', (req, res) => {
    res.json({ 
        message: 'Emergency Response System API is running!',
        timestamp: new Date().toISOString(),
        status: 'active',
        port: PORT
    });
});

// Emergency location endpoint
app.post('/api/emergency/location', (req, res) => {
    console.log('🚨 Emergency alert received:', req.body);
    
    const { emergency_type, latitude, longitude, phone_number, description } = req.body;
    
    // Basic validation
    if (!latitude || !longitude) {
        return res.status(400).json({ 
            error: 'Location coordinates required',
            received: req.body 
        });
    }
    
    const emergency_id = `emr_${Date.now()}`;
    
    // Log emergency details to console
    console.log(`📍 EMERGENCY DETAILS:
    🆔 ID: ${emergency_id}
    🚨 Type: ${emergency_type?.toUpperCase()}
    📍 Location: ${latitude}, ${longitude}
    📞 Phone: ${phone_number}
    📝 Description: ${description}
    ⏰ Time: ${new Date().toLocaleString()}
    `);
    
    // Send success response back to mobile app
    res.json({
        success: true,
        message: 'Emergency alert received and logged successfully!',
        emergency_id: emergency_id,
        emergency_type: emergency_type || 'general',
        location: { 
            latitude: parseFloat(latitude), 
            longitude: parseFloat(longitude) 
        },
        timestamp: new Date().toISOString(),
        status: 'alert_received'
    });
});

// Test endpoint to view logged emergencies
app.get('/api/emergencies', (req, res) => {
    res.json({
        message: 'Emergency logging system active',
        server_status: 'running',
        port: PORT,
        endpoints: {
            submit_emergency: 'POST /api/emergency/location',
            view_status: 'GET /api/emergencies',
            server_info: 'GET /'
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log('🚨 =======================================');
    console.log('   EMERGENCY RESPONSE SERVER STARTED');
    console.log('🚨 =======================================');
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`📱 Mobile Interface: http://localhost:8080`);
    console.log(`🔗 API Test: http://localhost:${PORT}/api/emergencies`);
    console.log('✅ Ready to receive emergency alerts!');
    console.log('📝 Emergency logs will appear below...');
    console.log('=======================================');
    console.log('Press Ctrl+C to stop the server\n');
});
