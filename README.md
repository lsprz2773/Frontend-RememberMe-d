# RememberMed - Frontend 
Este repositorio contiene la aplicación frontend del proyecto **RememberMed**, desarrollada con Next.js y React.

##  Resumen del Proyecto
**RememberMed** es una plataforma integral diseñada para facilitar la adherencia a los tratamientos médicos. Su propósito principal es conectar a **Pacientes** y **Médicos** de forma directa:
- **Pacientes:** Reciben notificaciones de sus tomas, registran síntomas, visualizan su historial y mejoran su adherencia a los tratamientos.
- **Médicos:** Generan códigos de vinculación, gestionan los medicamentos de sus pacientes vinculados y reciben alertas si el paciente presenta síntomas graves o una adherencia muy baja.

## Enlace de Despliegue
Puedes acceder a la versión desplegada de la aplicación en el siguiente enlace:
[frontendremembermed.vercel.app](frontendremembermed.vercel.app)

## Cómo correr el proyecto localmente

Sigue estos pasos para ejecutar el proyecto en tu entorno local de desarrollo:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Moraaa4/Frontend-RememberMe-d.git
   cd Frontend-RememberMe-d
   ```

2. **Instalar las dependencias:**
   Puedes usar `npm` o `yarn`:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Copia el archivo de ejemplo para crear tus variables locales:
   ```bash
   cp .env.example .env.local
   ```
   Asegúrate de que la variable `API_BASE_URL` apunte a tu backend local.

4. **Correr el Backend:**
   Asegúrate de que el backend (Express/Prisma/PostgreSQL) esté en ejecución. Por lo general, esto se hace levantando los contenedores de Docker desde la carpeta del backend (`docker compose up -d`).

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

6. **Abrir la aplicación:**
   Visita `http://localhost:3000` en tu navegador para ver el resultado.
