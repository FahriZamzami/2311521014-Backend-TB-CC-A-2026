# Backend Car Management System
## Cloud Computing 2026 - Tugas Besar

Backend REST API untuk Aplikasi Manajemen Data Mobil

### Informasi Mahasiswa
- **NIM**: 2311521014
- **Tema**: Mobil (Car Management System)

### Prerequisites
- Node.js (v14 atau lebih baru)
- npm atau yarn
- MariaDB Server
- Git

### Setup Database

1. **Login ke MariaDB menggunakan root:**
   ```bash
   mysql -u root -p
   ```
   Password: `KomputasiAwan2026!`

2. **Jalankan SQL script untuk membuat database dan tabel:**
   ```bash
   mysql -u root -p < database.sql
   ```

3. **Atau buat secara manual di MySQL client:**
   ```sql
   CREATE DATABASE db_2311521014;
   USE db_2311521014;
   CREATE TABLE cars (
     id INT AUTO_INCREMENT PRIMARY KEY,
     merk VARCHAR(100) NOT NULL,
     model VARCHAR(100) NOT NULL,
     tahun INT NOT NULL,
     harga DECIMAL(10, 2) NOT NULL,
     warna VARCHAR(50) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

### Setup Backend

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Konfigurasi .env file (sudah tersedia):**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=KomputasiAwan2026!
   DB_NAME=db_2311521014
   DB_PORT=3306
   SERVER_PORT=3000
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   atau
   ```bash
   npm start
   ```

Server akan berjalan di `http://localhost:3000`

### API Endpoints

#### 1. Health Check
```
GET /health
```
Mengecek status backend dan koneksi database.

**Response (Connected):**
```json
{
  "status": "success",
  "message": "Backend is running",
  "database": "connected",
  "student": {
    "name": "Muhammad Nouval Habibie",
    "nim": "2311523001"
  }
}
```

#### 2. Schema
```
GET /schema
```
Mendapatkan struktur data dan endpoint yang tersedia.

#### 3. Lihat Semua Mobil
```
GET /cars
```

**Response:**
```json
{
  "status": "success",
  "message": "Data retrieved successfully",
  "data": [
    {
      "id": 1,
      "merk": "Toyota",
      "model": "Avanza",
      "tahun": 2023,
      "harga": 200,
      "warna": "Putih"
    }
  ]
}
```

#### 4. Lihat Detail Mobil
```
GET /cars/:id
```

**Response:**
```json
{
  "status": "success",
  "message": "Data retrieved successfully",
  "data": {
    "id": 1,
    "merk": "Toyota",
    "model": "Avanza",
    "tahun": 2023,
    "harga": 200,
    "warna": "Putih"
  }
}
```

#### 5. Tambah Mobil
```
POST /cars
Content-Type: application/json

{
  "merk": "Honda",
  "model": "CR-V",
  "tahun": 2024,
  "harga": 450,
  "warna": "Merah"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Data created successfully",
  "data": {
    "id": 4,
    "merk": "Honda",
    "model": "CR-V",
    "tahun": 2024,
    "harga": 450,
    "warna": "Merah"
  }
}
```

#### 6. Update Mobil
```
PUT /cars/:id
Content-Type: application/json

{
  "merk": "Honda",
  "model": "CR-V",
  "tahun": 2024,
  "harga": 450,
  "warna": "Biru"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Data updated successfully",
  "data": {
    "id": 4,
    "merk": "Honda",
    "model": "CR-V",
    "tahun": 2024,
    "harga": 450,
    "warna": "Biru"
  }
}
```

#### 7. Hapus Mobil
```
DELETE /cars/:id
```

**Response:**
```json
{
  "status": "success",
  "message": "Data deleted successfully"
}
```

### File Structure
```
backend/
├── index.js              # Main server file
├── db.js                 # Database connection
├── package.json          # Project dependencies
├── .env                  # Environment variables
├── database.sql          # Database schema
├── README.md             # Dokumentasi
└── routes/
    └── cars.js           # Car CRUD routes
```

### Testing dengan Postman/Curl

#### Test Health Check:
```bash
curl http://localhost:3000/health
```

#### Test GET All Cars:
```bash
curl http://localhost:3000/cars
```

#### Test POST (Create):
```bash
curl -X POST http://localhost:3000/cars \
  -H "Content-Type: application/json" \
  -d '{"merk":"BMW","model":"X5","tahun":2024,"harga":800,"warna":"Putih"}'
```

#### Test PUT (Update):
```bash
curl -X PUT http://localhost:3000/cars/1 \
  -H "Content-Type: application/json" \
  -d '{"merk":"Toyota","model":"Fortuner","tahun":2023,"harga":450,"warna":"Abu-abu"}'
```

#### Test DELETE:
```bash
curl -X DELETE http://localhost:3000/cars/1
```

### Troubleshooting

**Error: Cannot find module 'mysql2'**
```bash
npm install mysql2
```

**Error: Cannot connect to database**
- Pastikan MariaDB server sudah running
- Periksa username, password, dan database name di .env
- Pastikan database sudah dibuat

**Error: CORS issue**
- Backend sudah memiliki CORS middleware
- Pastikan frontend mengakses dari URL yang sesuai

### Deployment ke GCP

Gunakan nama service: `be-2311521014`

Layanan yang bisa digunakan:
- Compute Engine (e2-small atau e2-standard-2)
- App Engine
- Cloud Run

Lihat dokumentasi GCP untuk instruksi deployment lebih detail.
