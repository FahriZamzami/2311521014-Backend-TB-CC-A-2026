-- Database Setup for Car Management System
-- Run this script to set up the database and tables

-- Create database
CREATE DATABASE IF NOT EXISTS db_2311521014;

-- Use the database
USE db_2311521014;

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    merk VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    tahun INT NOT NULL,
    harga DECIMAL(10, 2) NOT NULL,
    warna VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO cars (merk, model, tahun, harga, warna) VALUES
('Toyota', 'Avanza', 2023, 200, 'Putih'),
('Honda', 'Civic', 2022, 350, 'Hitam'),
('Daihatsu', 'Xenia', 2023, 180, 'Silver');
