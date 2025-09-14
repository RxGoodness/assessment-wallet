# Technical Documentation: Wallet System

## Stack & Architecture
- **NestJS**: Modular, scalable Node.js framework for building robust APIs.
- **Prisma ORM**: Type-safe database access and migrations.
- **PostgreSQL**: Reliable, ACID-compliant relational database.
- **JWT Authentication**: Secure, stateless user sessions.
- **TypeScript**: Type safety and maintainability.

## Modular Structure
- **User Module**: Handles user entity, registration, and management.
- **Auth Module**: Manages authentication, JWT issuance, and guards.
- **Wallet Module**: Manages wallet accounts, credit/debit operations, transactional safety.

## Security & Robustness
- **Guards**: JWT guard protects wallet endpoints; DTO validation prevents invalid input.
- **Transactional Operations**: Prisma `$transaction` ensures atomic credit/debit, preventing race conditions and deadlocks.
- **Stable Balance**: All balance updates are performed in transactions, ensuring consistency.
- **Password Hashing**: User passwords are hashed with bcrypt before storage.
- **Error Handling**: All critical operations throw explicit errors for invalid states (e.g., insufficient balance).

## Best Practices
- **DTOs**: All input is validated using DTOs and `class-validator`.
- **Separation of Concerns**: Each module contains its own controller, service, DTOs, and entity.
- **Environment Variables**: Secrets and DB credentials are managed via `.env`.
- **Extensibility**: Modular design allows for easy addition of features (e.g., transaction history, multi-currency).

## Financial Exploitation Prevention
- **Race Condition Protection**: All wallet operations use database transactions.
- **Deadlock Avoidance**: Single wallet row updates per transaction.
- **Stable Balance**: Prevents negative balances and double-spending.

## Deployment & Testing
- **Postman Collection**: Provided for API testing.
- **Hosted API**: Backend can be deployed to platforms like Render, Heroku, or AWS.

---
For further details, see code comments and module documentation.
