# Wastewater Sentinel Frontend

Frontend profesional para una plataforma de vigilancia epidemiológica temprana mediante análisis de aguas residuales.

## Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- Recharts
- Lucide React

## Instalación

```bash
npm install
```

## Variables de entorno

Copiar `.env.example` a `.env` y ajustar si el backend usa otra URL:

```env
VITE_API_URL=http://localhost:8000/api
```

## Ejecutar localmente

```bash
npm run dev
```

Abrir `http://localhost:5173`.

## Build

```bash
npm run build
```

## Páginas principales

- Dashboard: resumen, riesgo, serie temporal y alertas tempranas.
- Mediciones: tabla con filtros por ubicación, ciudad, país y fechas.
- Dataset: subida CSV, carga demo y resumen del dataset.
- Simulaciones: modelos 1D, 2D, no homogéneo, bifurcación, fase y Lyapunov.
- Marco teórico: explicación académica para la defensa.
- Acerca: objetivo, stack, funcionalidades e integrantes.

## Conexión con backend

El cliente Axios usa `VITE_API_URL` y consume endpoints bajo `/api`, incluyendo mediciones, datasets, analytics y simulaciones.

## Deploy en Vercel

Configurar `VITE_API_URL` como variable de entorno del proyecto y ejecutar el build estándar de Vite.
