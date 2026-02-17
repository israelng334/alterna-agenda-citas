# Appointment Scheduling System

## Overview

This project is a full-stack appointment scheduling system designed for a barbershop or aesthetic clinic. It manages resources (barbers/doctors), services with different durations, appointment booking, availability validation, time blocks (lunch/vacation), and cancellation policies.

The system enforces strict backend business rules to prevent overbooking and ensure consistent scheduling behavior.

---

## Tech Stack

### Frontend
- React
- TypeScript

### Backend
- Node.js
- Express
- TypeScript

### Database
- Firebase Firestore (Admin SDK)

### Testing
- Jest (ts-jest)

---

## System Architecture


### Architectural Principles

- Controllers are thin and only handle HTTP concerns.
- Business rules are implemented in Service classes.
- Firestore access is abstracted in Repository classes.
- Core validation logic (e.g., overlap detection) is implemented as pure, testable functions.
- Frontend never enforces critical business rules.

---

## Domain Model

### Resource

Represents a barber or doctor.

- id: string
- name: string
- active: boolean

---

### Service

Represents a bookable service.

- id: string
- name: string
- durationMinutes: number
- price: number

---

### Appointment

- id: string
- resourceId: string
- serviceId: string
- clientName: string
- startTime: Date
- endTime: Date
- status: Scheduled | Confirmed | Cancelled | NoShow
- createdAt: Date

---

### Block

Represents unavailable time (lunch, vacation, etc.).

- id: string
- resourceId: string
- startTime: Date
- endTime: Date
- reason: Lunch | Vacation | Personal

---

## Firestore Collections

- resources
- services
- appointments
- blocks

Each entity is stored in its own collection.

---

## Business Rules

### 1. No Overlapping Appointments

Two appointments overlap if:


Back-to-back appointments are allowed:

- 10:00–10:30
- 10:30–11:00

---

### 2. Appointments Cannot Overlap Blocks

An appointment cannot overlap:

- Another appointment
- A block (Lunch, Vacation, etc.)

---

### 3. Service Duration Determines End Time

When creating an appointment:


---

### 4. Cancellation Policy

Appointments cannot be cancelled if less than 2 hours remain before the start time.

---

### 5. Overbooking Prevention

Appointment creation must run inside a Firestore transaction to prevent race conditions when multiple users attempt to book the same time slot.

---

## API Endpoints

### Resources

- GET /resources
- POST /resources
- PUT /resources/:id
- DELETE /resources/:id

### Services

- GET /services
- POST /services

### Appointments

- POST /appointments
- PUT /appointments/:id/cancel
- GET /appointments?resourceId=...&date=...

### Blocks

- POST /blocks
- GET /blocks?resourceId=...&date=...

### Availability

- GET /availability?resourceId=...&date=...

Returns available time slots for a given resource and date.

---

## Availability Algorithm

1. Define working hours (e.g., 09:00–18:00).
2. Divide the day into time slots (e.g., 15 or 30 minutes).
3. Retrieve:
   - Existing appointments
   - Blocks
4. Remove all time ranges that conflict.
5. Ensure the full service duration fits in the available slot.
6. Return remaining valid time slots.

---

## Edge Cases

- Appointment starts exactly when another ends (allowed).
- Appointment fully inside another (rejected).
- Appointment partially overlaps another (rejected).
- Long service crossing lunch block (rejected).
- Concurrent booking requests (handled via transaction).
- Resource inactive (cannot book).
- Timezone consistency enforced using UTC.

---

## Testing Strategy

Unit tests must validate:

- Overlap detection logic.
- Back-to-back appointments allowed.
- Block overlap rejection.
- Cancellation rule enforcement.
- Valid appointment creation.

Tests focus on business logic, not database behavior.

---

## Expected Behavior

The system must:

- Prevent double booking.
- Handle concurrent booking attempts safely.
- Enforce all business rules at API level.
- Maintain consistent availability.
- Keep business logic testable and separated from infrastructure.

---
