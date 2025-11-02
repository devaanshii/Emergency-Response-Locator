-- Create database (run this in PostgreSQL command line first)
-- CREATE DATABASE emergency_response;

-- Connect to the database and run these commands:

-- Emergency locations table
CREATE TABLE emergency_locations (
    id SERIAL PRIMARY KEY,
    emergency_id VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    accuracy DECIMAL(8, 2),
    emergency_type VARCHAR(50),
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some test data
INSERT INTO emergency_locations (emergency_id, phone_number, latitude, longitude, emergency_type, description)
VALUES 
    ('emr_001', '+911234567890', 28.6139, 77.2090, 'medical', 'Test medical emergency'),
    ('emr_002', '+919876543210', 28.6200, 77.2100, 'fire', 'Test fire emergency');
