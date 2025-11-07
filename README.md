# E-commerce - Proyecto para Taller-web-2

Proyecto de e-commerce desarrollado con Angular en el frontend y Node.js + Express en el backend, usando SQL Server como base de datos.

## 📋 Descripción

Este es un proyecto full-stack que implementa las funcionalidades básicas de un e-commerce, incluyendo autenticación de usuarios y gestión de datos. El proyecto está dividido en dos partes principales:

- **Frontend**: Aplicación Angular con Bootstrap para la interfaz de usuario
- **Backend**: API REST con Node.js, Express y Prisma ORM

## 🛠️ Tecnologías Principales

### Backend
- **Express**: Framework web para Node.js que maneja las rutas y peticiones HTTP
- **Prisma**: ORM (Object-Relational Mapping) que facilita la comunicación con la base de datos
- **Express-validator**: Librería para validar y sanitizar datos de entrada
- **bcryptjs**: Para encriptar contraseñas de forma segura
- **TypeScript**: Para tener tipado estático y mejor experiencia de desarrollo
- **CORS**: Permite que el frontend se comunique con el backend desde diferentes puertos

### Frontend
- **Angular 19**: Framework para construir la interfaz de usuario
- **Bootstrap 5**: Framework CSS para diseño responsive
- **Bootstrap Icons**: Iconos para la interfaz
- **RxJS**: Para manejo de programación reactiva

### Base de Datos
- **SQL Server**: Base de datos relacional

## 📁 Estructura del Proyecto

### Backend
```
backend/
├── src/
│   ├── config/          # Configuración de Prisma
│   ├── controllers/     # Lógica de controladores (manejo de requests/responses)
│   ├── services/        # Lógica de negocio
│   ├── repositories/    # Acceso a datos (interacción con Prisma)
│   ├── routes/          # Definición de rutas de la API
│   ├── middlewares/     # Middlewares (autenticación, validación, etc.)
│   └── entities/        # Modelos de datos TypeScript
├── prisma/
│   └── schema.prisma    # Schema de base de datos (Prisma lo mapea automáticamente)
└── .env                 # Variables de entorno
```

### Frontend - Arquitectura Angular

El frontend sigue una arquitectura con estos patrones:

```
frontend/tienda/src/app/
├── core/                           # Módulo core (singleton, se carga una sola vez)
│   ├── model/                      # Modelos de datos compartidos
│   │   ├── user.model.ts
│   │   ├── product.model.ts
│   │   └── cart.model.ts
│   └── services/                   # Servicios de estado global (SSOT)
│       ├── auth.state.service.ts   # Estado de autenticación
│       ├── search.state.service.ts # Estado de búsqueda
│       └── api.service.ts          # Servicio HTTP base
│
├── features/                       # Módulos por funcionalidad
│   ├── auth/
│   │   ├── containers/             # Smart Components (con lógica)
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── components/             # Dumb Components (solo presentación)
│   │   │   └── auth-form/
│   │   ├── services/               # Servicios específicos del feature
│   │   │   └── auth.service.ts
│   │   └── auth.routes.ts          # Rutas del módulo
│   │
│   ├── products/
│   │   ├── product-list/           # Container component
│   │   ├── product-detail/         # Container component
│   │   ├── product.service.ts
│   │   └── products.routes.ts
│   │
│   ├── cart/
│   │   ├── cart-page/
│   │   ├── cart.service.ts
│   │   └── cart.routes.ts
│   │
│   └── users/
│       ├── user-list/
│       ├── user.service.ts
│       └── user.routes.ts
│
└── shared/                         # Componentes reutilizables
    └── components/
        ├── header/
        ├── footer/
        ├── button/
        ├── search/
        └── home/
```

### 🏗️ Patrones de Arquitectura del Frontend

**1. SSOT (Single Source of Truth)**
- El estado global se maneja con **Signals** de Angular (nueva API reactiva)
- Los servicios de estado (`auth.state.service.ts`, `search.state.service.ts`) son la única fuente de verdad
- Ejemplo: El estado de autenticación se gestiona centralmente y todos los componentes lo consumen

**2. Smart vs Dumb Components**
- **Containers (Smart)**: Componentes inteligentes que manejan lógica, estado y comunicación con servicios
  - Ubicados en `features/*/containers/`
  - Ejemplo: `login`, `register`, `product-list`
  
- **Components (Dumb)**: Componentes de presentación que solo reciben datos via `@Input()` y emiten eventos via `@Output()`
  - Ubicados en `features/*/components/` y `shared/components/`
  - Ejemplo: `auth-form`, `button`, `header`

**3. Gestión de Estado con Signals**
```typescript
// Ejemplo del patrón usado en auth.state.service.ts
private _user = signal<User | null>(null);      // Estado privado
readonly user = this._user.asReadonly();        // Exposición de solo lectura
readonly isAuthenticated = computed(() => !!this._user()); // Valores derivados
```

**4. Organización Modular**
- **core/**: Servicios singleton y modelos compartidos (se cargan una vez)
- **features/**: Módulos por funcionalidad (lazy loading)
- **shared/**: Componentes reutilizables sin lógica de negocio

## 🚀 Cómo Iniciar el Proyecto

### Requisitos Previos

Asegúrate de tener instalado:
- Node.js (versión 18 o superior)
- SQL Server
- npm o yarn

### 1. Configurar el Backend

```bash
# Ir a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita el archivo .env con tu configuración de base de datos
# DATABASE_URL="sqlserver://localhost:1433;database=EcommerceBD;integratedSecurity=true;trustServerCertificate=true"
# PORT=4000

# Generar el cliente de Prisma (esto mapea automáticamente tu base de datos)
npx prisma generate

# Sincronizar el schema con la base de datos
# Prisma creará las tablas automáticamente basándose en schema.prisma
npx prisma db push

# Iniciar el servidor en modo desarrollo
npm run dev
```

El backend estará corriendo en `http://localhost:4000`

**Nota sobre Prisma**: No necesitas crear manualmente las tablas en SQL Server. Prisma se encarga de mapear y sincronizar automáticamente el schema definido en `prisma/schema.prisma` con tu base de datos cuando ejecutas `npx prisma db push`.

### 2. Configurar el Frontend

```bash
# Ir a la carpeta del frontend
cd frontend/tienda

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

El frontend estará corriendo en `http://localhost:4200`

## 📝 Scripts Disponibles

### Backend

- `npm run dev` - Inicia el servidor en modo desarrollo con hot-reload
- `npm run build` - Compila el proyecto TypeScript a JavaScript
- `npm start` - Inicia el servidor en modo producción

### Frontend

- `npm start` - Inicia la aplicación en modo desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm test` - Ejecuta los tests

## 🔑 Funcionalidades Implementadas

- ✅ Registro de usuarios
- ✅ Login/Autenticación
- ✅ Gestión de usuarios
- ✅ Validación de datos
- ✅ Encriptación de contraseñas

## 🗄️ Modelo de Datos

El proyecto actualmente maneja la siguiente entidad principal:

**User (Usuario)**
- id: Identificador único
- firstName: Nombre
- lastName: Apellido
- address: Dirección
- email: Correo electrónico (único)
- password: Contraseña (encriptada)

## 🔧 Configuración Adicional

### Variables de Entorno (Backend)

Crea o edita el archivo `.env` en la carpeta `backend/`:

```env
DATABASE_URL="sqlserver://localhost:1433;database=EcommerceBD;integratedSecurity=true;trustServerCertificate=true"
PORT=4000
```

Ajusta la cadena de conexión según tu configuración de SQL Server.

## ⚠️ Notas Importantes

- El backend usa autenticación integrada de Windows para SQL Server por defecto
- Asegúrate de que SQL Server esté corriendo antes de iniciar el backend
- El puerto 4000 debe estar disponible para el backend
- El puerto 4200 debe estar disponible para el frontend
