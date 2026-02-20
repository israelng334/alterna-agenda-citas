# Alterna Agenda de Citas

Sistema de gestión y reserva de citas para barbería o clínica estética.

## Descripción
Permite a negocios con múltiples recursos (barberos, doctores) gestionar:
- Reservas de citas con validación de disponibilidad y duración de servicios.
- Bloqueos de horario (almuerzo, vacaciones, etc.).
- Confirmaciones y recordatorios simulados.
- Cancelaciones con política de tiempo mínimo.
- Panel administrativo y consulta de citas para clientes.

## Características
- **CRUD** de recursos, servicios, citas y bloqueos (parcial en backend).
- **Validación de disponibilidad**: evita solapamientos entre citas y bloqueos.
- **Política de cancelación**: no permite cancelar con menos de 2 horas de anticipación.
- **Edge cases**: manejo de overbooking, llegadas tarde, servicios de distinta duración, cambios de último minuto.
- **Notificaciones simuladas**: confirmación, recordatorio, cancelación.
- **Panel de administración**: gestión y monitoreo de citas, clientes y recursos.

## Tecnologías
- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose)

## Instalación

### Backend
```bash
cd backend
npm install
npm start
# Servidor en http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# App en http://localhost:5173
```

## Endpoints Principales
- `GET /api/resources` — Listar recursos
- `POST /api/appointments` — Crear cita
- `GET /api/appointments` — Consultar citas
- `POST /api/appointments/:id/cancel` — Cancelar cita
- `GET /api/bookings` — Ejemplo de endpoint

> Ver detalles y ejemplos en `frontend/API_DOCS.md`

## Reglas de Negocio (Resumen)
- No se permiten solapamientos entre citas ni con bloqueos.
- La duración del servicio determina la hora de fin.
- No se puede cancelar una cita con menos de 2 horas de anticipación.
- Overbooking prevenido por validación y transacciones.
- Edge cases: llegada tarde, no-show, servicios largos, cambios de último minuto.
- Notificaciones simuladas (confirmación, recordatorio, cancelación).

> Ver reglas completas y casos borde en `frontend/BUSINESS_RULES.md`

## Pruebas y Casos Borde
- Validación de solapamientos (unit tests recomendados).
- Casos: back-to-back permitido, solapamiento parcial/rechazado, bloqueos, no-show, llegada tarde, etc.

## Estado del Proyecto
- **Frontend**: flujo de reserva, panel admin, validaciones y reglas implementadas.
- **Backend**: modelo de citas y endpoints básicos. CRUD de recursos/servicios/bloqueos pendiente de completar.
- **Pruebas**: agregar unit tests para lógica de solapamiento y reglas críticas.

---
**Autores:** Grupo 4 — Israel de la Cruz y Jose Robles grupo 4
**Fecha:** Febrero 2026