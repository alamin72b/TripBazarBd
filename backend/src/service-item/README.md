## Trip Bazar Core Service Catalog

### 1. Executive Summary

The Core Service Catalog module establishes the foundational data layer for the Trip Bazar platform, enabling the creation, retrieval, updating, and deletion of travel services (Flights, Buses, Trains, Hotels). This implementation modernizes the backend architecture by integrating NestJS with Prisma 7, utilizing a pure-JavaScript driver adapter pattern for enhanced connection pooling, future-proofed edge compatibility, and optimal performance on the Node.js/Bun runtime.

### 2. Architectural Design & ADR (Architecture Decision Record)

**ADR 001: Adoption of Prisma 7 Driver Adapters over Native Engine**

* **Context:** The platform requires a highly stable, performant connection to a MySQL/MariaDB database. Recent updates to the Prisma ORM (v7.5.0) deprecated the internal Rust-based query engine for standard Node.js deployments in favor of driver adapters.
* **Decision:** We will strictly utilize `@prisma/adapter-mariadb` combined with a `mysql2/promise` connection pool, overriding the default Prisma schema generator to `provider = "prisma-client"`.
* **Status:** Accepted and Implemented.
* **Consequences:**
* *Positive:* Removes heavy C++ binary dependencies, drastically reducing Docker image sizes and preventing `http_parser` runtime crashes on modern Node/Bun versions.
* *Positive:* Grants granular control over database connection pooling at the application layer.
* *Negative:* Requires explicit URL string manipulation (parsing `mysql://` to `mariadb://`) at service instantiation.



### 3. Data Contracts

The primary entity is the `ServiceItem`.

**`ServiceItem` Schema (Data Transfer Object)**

* `id` (UUID, Primary Key)
* `title` (String, Required)
* `category` (Enum: `FLIGHT` | `BUS` | `TRAIN` | `HOTEL`)
* `description` (Text, Required)
* `price` (Decimal, length 10, precision 2) - *Note: Serialized as a String in JSON responses to prevent floating-point precision loss.*
* `coverImageUrl` (String, Required)
* `whatsappNumber` (String, Required)
* `isActive` (Boolean, Default: `true`)
* `createdAt` / `updatedAt` (ISO 8601 DateTime strings)

### 4. Deployment Standard Operating Procedures (SOP)

**Pre-Deployment Requirements:**

1. Ensure `.env` contains a valid `DATABASE_URL` formatted for MySQL (e.g., `mysql://user:pass@host:port/tripbazar`).
2. Ensure `prisma.config.ts` is present in the project root to satisfy v7 configuration requirements.

**Build & Initialization Steps:**

1. **Install Dependencies:** Run `bun install` to ensure `@prisma/adapter-mariadb` and `mysql2` are present.
2. **Generate Client:** Execute `bunx prisma generate` to build the pure-JS client based on `schema.prisma`.
3. **Database Migration:** Execute standard Prisma migration commands to sync the `ServiceItem` table state.
4. **Application Boot:** Execute `bun run start:prod` (or `start:dev` for local) to initialize the NestJS application context and establish the connection pool.
