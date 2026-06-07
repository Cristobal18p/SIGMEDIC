<h1 align="center">SIGMEDIC - Sistema de Gestión de Citas Médicas</h1>

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white" alt="Radix UI" />
</div>

<br />

## Descripción del Proyecto

**SIGMEDIC** es una aplicación web full-stack desarrollada para gestionar las citas y operaciones de una clínica médica. El objetivo del proyecto es digitalizar el proceso de reserva de citas y centralizar la información de los pacientes, médicos y personal administrativo en una sola plataforma.

## Funcionalidades Principales

El sistema maneja distintos tipos de usuarios, cada uno con accesos y funciones específicas:

- **Pacientes:** 
  - Solicitud de citas médicas por especialidad.
  - Consulta del estado de su cita mediante un número de seguimiento.
- **Recepcionistas:** 
  - Administración de las citas solicitadas (aprobar, asignar horario y médico, o cancelar).
  - Registro manual de nuevos pacientes.
- **Médicos:** 
  - Visualización de su agenda de citas asignadas.
  - Registro de diagnósticos, tratamientos y notas en el historial del paciente.
- **Gerentes / Administradores:** 
  - Visualización de métricas y estadísticas (citas por estado, rendimiento por médico).
  - Configuración de la disponibilidad y horarios de los médicos.
  - Exportación de reportes en formato PDF.

## Seguridad y Arquitectura

Este proyecto fue concebido pensando en la escalabilidad y en los más altos estándares de seguridad web modernos:

- **Sesiones Stateless (HttpOnly Cookies):** Implementación de JWT inyectado directamente en cookies de seguridad gestionadas por el navegador, mitigando al 100% las vulnerabilidades de robo de tokens por XSS.
- **Criptografía:** Hasheo asimétrico de contraseñas mediante **Bcrypt** con generación de *salts* dinámicos.
- **Defensa Anti-Bots:** Integración de un Firewall (`express-rate-limit`) con prevención de ataques de Fuerza Bruta en el login y prevención de DDoS en la API general.
- **Validación Estricta:** Uso de **Zod** para la inferencia de tipos y validación de esquemas de datos entrantes, rechazando peticiones malformadas antes de que alcancen los controladores.
- **Tipado Fuerte:** Frontend desarrollado completamente en **TypeScript**, garantizando contratos de datos predecibles.

## Estructura del Proyecto

El repositorio está dividido bajo un modelo Cliente-Servidor claramente demarcado:

```text
SIGMEDIC/
├── Backend/                 # Node.js + Express (API RESTful)
│   ├── src/
│   │   ├── config/          # Pool de conexiones PostgreSQL
│   │   ├── controllers/     # Lógica de negocio por entidad
│   │   ├── middlewares/     # Seguridad, Roles y Zod Validation
│   │   ├── models/          # Consultas SQL nativas
│   │   ├── routes/          # Enrutamiento de endpoints
│   │   └── schemas/         # Esquemas de validación (Zod)
│   └── .env.example         # Variables de entorno
│
├── Frontend/                # React 18 + Vite
│   ├── src/
│   │   ├── components/      # UI y Vistas separadas por Rol
│   │   ├── services/        # Abstracción de red (Fetch API + Credentials)
│   │   ├── types/           # Interfaces TypeScript globales
│   │   └── utils/           # Utilidades (Generación de PDFs, formateo)
│   └── tsconfig.json        # Configuración estricta de compilador
│
└── Database/
    └── schema.sql           # DDL y DML para recreación de BD
```

## Instalación y Configuración Local

### Prerrequisitos
- **Node.js** v18+
- **PostgreSQL** v14+

### 1. Despliegue de la Base de Datos
```bash
# Entrar a la consola de Postgres
psql -U postgres
CREATE DATABASE clinica_db;
CREATE USER admin_clinica WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE clinica_db TO admin_clinica;
\q

# Importar las tablas base
psql -U admin_clinica -d clinica_db -f Database/schema.sql
```

### 2. Configurar Variables de Entorno
```bash
cd Backend
cp .env.example .env
# Edita tu archivo .env con las credenciales de la BD y tu JWT_SECRET
cd ..
```

### 3. Instalación Rápida y Ejecución (Recomendado)
El proyecto cuenta con scripts en la raíz para instalar y levantar todo simultáneamente.

```bash
# Instalar dependencias de Backend y Frontend al mismo tiempo
npm run install:all

# Construir Frontend y levantar Backend (Modo Producción)
npm start
# La aplicación web completa estará disponible en http://localhost:3000
```

### 4. Modo Desarrollo (Levantamiento Separado)
Si deseas modificar el código y ver los cambios en tiempo real, levanta ambos servidores en terminales separadas:

**Terminal 1 (Backend):**
```bash
npm run dev:backend
# API escuchando en http://localhost:3000
```

**Terminal 2 (Frontend):**
```bash
npm run dev:frontend
# Cliente Vite disponible en http://localhost:5173
```

## Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Sube la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia & Autor

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

Desarrollado por **Cristobal Prado**  
GitHub: [@Cristobal18p](https://github.com/Cristobal18p)
