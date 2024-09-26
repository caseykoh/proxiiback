# Proxii World - Backend

## Project Description
This backend service is designed to support the Proxii World: Tattoo Booking Website, providing the necessary APIs for booking appointments, and managing portfolio assets.

## Technologies Used
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for Node.js, facilitating API development.
- **Docker**: Containerization platform for packaging and running the application in isolated environments.
- **Nginx**: Web server to handle requests and serve static content.
- **PostgreSQL**: Relational database for storing user and booking information.
- **Sequelize**: ORM for interacting with the PostgreSQL database using JavaScript.

## Installation Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/caseykoh/proxiiback.git
   cd proxiiback```
2. **Set up environment variables**:  
   Create a .env file in the root directory and configure the necessary environment variables.
4. **Build and run the Docker containers**:
   ```bash
   docker-compose up --build
   ```

## API Endpoints
GET /api/appointment: Retrieve all appointments.  
POST /api/appointment: Book a new appointment.

## Usage
Once the backend service is running, you can access the API at http://localhost:5000.  
Ensure that the PostgreSQL database is set up and running.

## Future Improvements
- Implement JWT authentication for secure API access.
- Add unit tests for API endpoints.

## Contact
Casey Koh - s.casey.koh@gmail.com  
GitHub: https://github.com/caseykoh
