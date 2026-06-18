const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all cars
router.get('/cars', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM cars');
        connection.release();
        
        res.json({
        status: 'success',
        message: 'Data retrieved successfully',
        data: rows
        });
    } catch (error) {
        res.status(500).json({
        status: 'error',
        message: error.message
        });
    }
});

// GET car by ID
router.get('/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM cars WHERE id = ?', [id]);
        connection.release();
        
        if (rows.length === 0) {
        return res.status(404).json({
            status: 'error',
            message: 'Car not found'
        });
        }
        
        res.json({
        status: 'success',
        message: 'Data retrieved successfully',
        data: rows[0]
        });
    } catch (error) {
        res.status(500).json({
        status: 'error',
        message: error.message
        });
    }
});

// POST create car
router.post('/cars', async (req, res) => {
    try {
        const { merk, model, tahun, harga, warna } = req.body;
        
        if (!merk || !model || !tahun || !harga || !warna) {
        return res.status(400).json({
            status: 'error',
            message: 'All fields are required'
        });
        }
        
        const connection = await pool.getConnection();
        const [result] = await connection.query(
        'INSERT INTO cars (merk, model, tahun, harga, warna) VALUES (?, ?, ?, ?, ?)',
        [merk, model, tahun, harga, warna]
        );
        connection.release();
        
        res.status(201).json({
        status: 'success',
        message: 'Data created successfully',
        data: {
            id: result.insertId,
            merk,
            model,
            tahun,
            harga,
            warna
        }
        });
    } catch (error) {
        res.status(500).json({
        status: 'error',
        message: error.message
        });
    }
});

// PUT update car
router.put('/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { merk, model, tahun, harga, warna } = req.body;
        
        const connection = await pool.getConnection();
        
        // Check if car exists
        const [checkRows] = await connection.query('SELECT * FROM cars WHERE id = ?', [id]);
        if (checkRows.length === 0) {
        connection.release();
        return res.status(404).json({
            status: 'error',
            message: 'Car not found'
        });
        }
        
        // Update car
        await connection.query(
        'UPDATE cars SET merk = ?, model = ?, tahun = ?, harga = ?, warna = ? WHERE id = ?',
        [merk || checkRows[0].merk, model || checkRows[0].model, tahun || checkRows[0].tahun, 
        harga || checkRows[0].harga, warna || checkRows[0].warna, id]
        );
        connection.release();
        
        res.json({
        status: 'success',
        message: 'Data updated successfully',
        data: {
            id: parseInt(id),
            merk: merk || checkRows[0].merk,
            model: model || checkRows[0].model,
            tahun: tahun || checkRows[0].tahun,
            harga: harga || checkRows[0].harga,
            warna: warna || checkRows[0].warna
        }
        });
    } catch (error) {
        res.status(500).json({
        status: 'error',
        message: error.message
        });
    }
});

// DELETE car
router.delete('/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await pool.getConnection();
        
        // Check if car exists
        const [checkRows] = await connection.query('SELECT * FROM cars WHERE id = ?', [id]);
        if (checkRows.length === 0) {
        connection.release();
        return res.status(404).json({
            status: 'error',
            message: 'Car not found'
        });
        }
        
        // Delete car
        await connection.query('DELETE FROM cars WHERE id = ?', [id]);
        connection.release();
        
        res.json({
        status: 'success',
        message: 'Data deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
        status: 'error',
        message: error.message
        });
    }
});

module.exports = router;
