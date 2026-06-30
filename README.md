Here is a complete frontend with mongodb backend implementation of placing a key within the request headers to ensure if the user clicks the order button twice they are not double charged for their order by mistake. It is a way to failsafe the customer experience and protect the vendor from over charging causing a possible bad customer service experience.

# Modern MEAN Stack: Angular Evolution & Idempotency Demo

A full-stack project built to analyze, document, and test the major architectural shifts between **Angular 12** and **Angular 18+**, paired with a robust Node.js/MongoDB idempotent transactional pipeline.

## 🔄 Angular Renaissance: What This Project Documents

This repository serves as a direct reference for migrating legacy Angular concepts to modern development standards:

| Feature | Legacy Angular (v12) Approach | Modern Angular (v18+) Approach | Implementation Location |
| :--- | :--- | :--- | :--- |
| **Workspace Architecture** | Heavy, boilerplate-driven `@NgModule` structures | Light, self-contained `standalone: true` components | `src/app/order.component.ts` |
| **Network Interception** | Multi-file dependency-injected Interceptor classes | Lighter, single-file Functional Arrow Functions | `src/app/idempotency.interceptor.ts` |
| **Reactivity Tier** | Zone.js tree-scanning / Mandatory RxJS streams | Fine-grained DOM updates using Angular Signals | `src/app/order.component.ts` |
| **Dependency Injection** | Verbose, locked constructor function blocks | Clean, flexible `inject()` runtime initialization | `src/app/order.component.ts` |
| **Template Logic** | Structural attributes (`*ngIf`, `*ngFor`) via `CommonModule` | Built-in native block syntax (`@if`, `@for`) | `src/app/order.component.ts` (inline) |

---

## 🛠️ Full-Stack Capabilities

- **Frontend Core:** Pure functional network pipeline intercepting outbound `POST`/`PUT` traffic to append a runtime cryptographically secure string (`crypto.randomUUID()`).
- **Backend API (Node.js & Express):** Standardized ES Modules execution (`import`/`export`), parsing layer validations, and centralized global exception hooks.
- **Database Layer (MongoDB & Mongoose):** Schema data constraints matching database-enforced unique constraints to safely stop simultaneous double-click race conditions.

---

## 🚀 Local Installation & Execution

### 1. Database Requirement
Ensure a local instance of MongoDB is installed and running on default port `27017`.

### 2. Backend Server Execution
1. Navigate to the folder: `cd backend`
2. Install dependencies: `npm install`
3. Launch the server: `npm start` (Runs on http://localhost:3000)

### 3. Frontend Compilation
1. Navigate to the folder: `cd frontend`
2. Install dependencies: `npm install`
3. Launch the browser app: `npm start` (Runs on http://localhost:4200)

---

## 🧪 The Verification Lifecycle Suite

This workspace contains automated testing layouts built across isolated functional boundaries:

- **Isolated Unit Testing (Frontend):** Exercises mock boundary checks on HTTP transport logic using `HttpTestingController`.
  ```bash
  cd frontend && npm test
  ```
- **Isolated Unit Testing (Backend):** Tests mock Express router logic via Node's native lightweight testing runner engine.
  ```bash
  cd backend && node order.controller.spec.js
  ```
- **Integration Boundary Tests (Database):** Hits an active sandbox database (`integration_test_db`) to verify actual record index collisions.
  ```bash
  cd backend && node order.integration.spec.js
  ```
