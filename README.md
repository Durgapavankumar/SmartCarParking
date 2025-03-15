# Smart Car Parking System 🚗

An enterprise-grade parking management solution providing real-time availability tracking, reservation management, and automated billing.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Smart+Parking+Dashboard)
*(Preview of the live dashboard)*

## 🚀 Features
- **Real-Time Monitoring**: Live status of all parking slots (Occupied vs Available).
- **Slot Management**: Support for different slot types (Compact, Regular, Disabled).
- **Reservation System**: Book slots in advance with instant confirmation.
- **Enterprise Ready**: Built with Spring Boot for scalability and reliability.

## 🛠️ Tech Stack
- **Frontend**: React, Material UI
- **Backend**: Java 17, Spring Boot 3
- **Database**: PostgreSQL
- **DevOps**: Docker Support

## 🏃‍♂️ Getting Started

### Prerequisites
- Java 17+
- Docker (for Database)
- Node.js (for UI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Durgapavankumar/SmartCarParking.git
   cd SmartCarParking
   ```

2. **Setup Database**
   ```bash
   # Start Postgres container
   docker run --name parking-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
   ```

3. **Run Backend**
   ```bash
   cd server
   ./mvnw spring-boot:run
   ```

4. **Run Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 🧪 API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/slots` | Get all parking slots status |
| `POST` | `/api/slots/{id}/book` | Reserve a parking slot |

---
*Built by [Durga Pavan Kumar Pailla](https://github.com/Durgapavankumar)*
