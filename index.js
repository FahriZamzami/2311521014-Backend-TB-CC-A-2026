const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');
const carsRoute = require('./routes/cars');

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Student Info
const STUDENT_INFO = {
    name: 'Fahri Zamzami',
    nim: '2311521014'
};

// Health Check Endpoint
app.get('/health', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query('SELECT 1');
        connection.release();
        
        res.json({
        status: 'success',
        message: 'Backend is running',
        database: 'connected',
        student: STUDENT_INFO
        });
    } catch (error) {
        res.json({
        status: 'error',
        message: 'Backend is running, but database is not connected',
        database: 'disconnected',
        student: STUDENT_INFO
        });
    }
});

// Schema Endpoint
app.get('/schema', (req, res) => {
    res.json({
        student: STUDENT_INFO,
        resource: {
        name: 'cars',
        label: 'Data Mobil',
        description: 'Aplikasi untuk mengelola data mobil'
        },
        fields: [
        {
            name: 'merk',
            label: 'Merk Mobil',
            type: 'text',
            required: true,
            showInTable: true
        },
        {
            name: 'model',
            label: 'Model',
            type: 'text',
            required: true,
            showInTable: true
        },
        {
            name: 'tahun',
            label: 'Tahun Produksi',
            type: 'number',
            required: true,
            showInTable: true
        },
        {
            name: 'harga',
            label: 'Harga (Juta Rupiah)',
            type: 'number',
            required: true,
            showInTable: true
        },
        {
            name: 'warna',
            label: 'Warna',
            type: 'text',
            required: true,
            showInTable: true
        }
        ],
        endpoints: {
        list: '/cars',
        detail: '/cars/{id}',
        create: '/cars',
        update: '/cars/{id}',
        delete: '/cars/{id}'
        }
    });
});

// Routes
app.use('/', carsRoute);

// Root endpoint (optional)
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Car Management API',
        version: '1.0.0',
        endpoints: {
        health: '/health',
        schema: '/schema',
        cars: '/cars'
        }
    });
    });

    // 404 handler
    app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
