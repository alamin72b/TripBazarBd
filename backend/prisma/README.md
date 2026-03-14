
# Enterprise Technical Specification: Data Access Layer

**Document ID:** ARCH-DAL-001  
**Status:** Active  
**Component:** Prisma ORM / MySQL Bridge  
**Owner:** Al-Amin  

---

## 1. Executive Summary

The Data Access Layer (DAL) provides a centralized, type-safe interface for the TripBazarBd application to interact with the MySQL relational database. By utilizing Prisma 7 and NestJS Global Dependency Injection, we ensure high performance, developer productivity, and architectural consistency across the entire backend services.

---

## 2. Architectural Design

### 2.1 Technology Stack

* **Database Engine:** MySQL 8.x
* **ORM:** Prisma 7.x
* **Integration:** NestJS Global Module Pattern
* **Environment:** Node.js v24 (LTS)

### 2.2 Global Service Pattern

To avoid redundant database connections (which can exhaust MySQL connection limits), we implement the Singleton Pattern via a Global NestJS Module.

| Component | Responsibility |
| :--- | :--- |
| **PrismaService** | Extends `PrismaClient`. Manages the `$connect` and `$disconnect` lifecycle hooks. |
| **PrismaModule** | Wraps the service with `@Global()`. Provides the service to all downstream Feature Modules. |
| **prisma.config.ts** | The Prisma 7 "Secure Loader." Handles runtime environment variable injection. |

---

## 3. Data Schema & Contracts

The schema is designed for the Travel Agency Domain. It utilizes Enums to enforce data integrity at the database level.

### 3.1 Entity Relationship Summary

* **AdminUser:** Secure identity storage for platform administrators.
* **ServiceItem:** The core inventory entity (Flights, Hotels, etc.).

### 3.2 Data Integrity Enums

```prisma
enum ServiceCategory {
  FLIGHT
  BUS
  TRAIN
  HOTEL
}

```

---

## 4. Implementation & Deployment

All deployment and synchronization tasks are handled via the Prisma CLI to ensure the Prisma Client and Database Schema stay in 100% sync.

### 4.1 Connection String Security

Connection strings must follow the URI standard. Special characters in the password field must be URL-encoded to prevent parser failure.

> **Warning:** Failure to encode `#` as `%23` or `@` as `%40` will result in `P1013: Invalid Port Number` errors.

### 4.2 Standard Operating Procedures (SOP)

| Task | Procedure |
| --- | --- |
| **Schema Modification** | Edit `schema.prisma` -> `npx prisma migrate dev` |
| **Type Generation** | `npx prisma generate` |
| **Data Audit** | `npx prisma studio` |

---

## 5. Security & Maintenance

* **Injection Prevention:** Prisma handles parameterization automatically, preventing SQL injection.
* **Audit Logging:** Database timestamps (`createdAt`, `updatedAt`) are enforced on all critical entities.

