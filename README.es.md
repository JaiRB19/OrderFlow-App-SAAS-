# OrderFlow: Ecosistema de POS y KDS en Tiempo Real

> 🌎 **Idioma / Language:** [English](README.md) | **Español**

**OrderFlow** es un MVP SaaS premium de alto rendimiento diseñado para optimizar las operaciones en restaurantes de alto volumen y cocinas ocultas (ghost kitchens). Al cerrar la brecha entre el frente de caja (POS) y la cocina (KDS), OrderFlow elimina la dependencia del papel y los retrasos en la comunicación mediante un espacio de trabajo digital unificado y en tiempo real.

---

## 🚀 La Visión
Desarrollado con la escalabilidad y la eficiencia operativa en mente, OrderFlow no es solo una herramienta de punto de venta; es un ecosistema integral de gestión de cocina. Resuelve el "caos de la hora pico" proporcionando una interfaz ultra limpia, inspirada en el glassmorphism, que prioriza la velocidad, la legibilidad y la retroalimentación táctil.

### Propuestas de Valor Clave:
- **Comunicación de Latencia Cero:** Las órdenes pasan de la caja a la cocina en milisegundos.
- **Agnóstico al Hardware:** Optimizado para móviles (cobros en movimiento), tablets (estaciones POS) y pantallas horizontales grandes (Sistema de Visualización de Cocina).
- **Estética Premium:** Un sistema de diseño "Liquid Glass" que reduce la fatiga visual en entornos de cocina con poca luz y brinda una sensación de alta gama para los operadores.

---

## 🛠 Características

### 1. Lobby Unificado (Centro de Mando) 🏠
Un centro neurálgico para que los gerentes y el personal naveguen por el ecosistema.
- **Saludos Dinámicos y Turnos:** Saludos sensibles al contexto e indicadores de turno (AM/PM).
- **Métricas en Vivo:** Contadores en tiempo real que muestran órdenes activas y pendientes a través de React Context.
- **Navegación Estilo Bento:** Diseño de cuadrícula moderno para un acceso rápido a los módulos principales.

### 2. POS Inteligente (Punto de Venta) 💳
Diseñado para una entrada rápida con una sola mano en móviles y un diseño especializado de doble columna en escritorio.
- **Selección Inteligente de Modalidad:** Etiquetado rápido para 'Comer aquí', 'Para llevar' o 'Domicilio'.
- **UX Condicional:** Los campos específicos de entrega aparecen solo cuando son necesarios para reducir el desorden.
- **Totales de Alta Visibilidad:** Tipografía monoespaciada de gran tamaño para una fácil verificación de las transacciones.

### 3. Tablero de Cocina (KDS) 👨‍🍳
Un tablero Kanban en tiempo real que transforma la prioridad de las órdenes.
- **Columnas Basadas en el Estado:** Separación visual de 'Pendiente', 'Preparando' y 'Listo'.
- **Transiciones Táctiles:** Las tarjetas se deslizan suavemente entre columnas con un solo toque o clic.
- **Indicadores de Urgencia:** Marcadores semánticos brillantes para resaltar órdenes que requieren atención inmediata.

---

## 💻 Stack Tecnológico

- **Core:** [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/) (HMR y builds ultra rápidos).
- **Estilos:** [styled-components](https://styled-components.com/) (Arquitectura basada en componentes con tokens de tema dinámicos).
- **Gestión de Estado:** React Context API (Proporcionando una única fuente de verdad para POS y KDS).
- **Navegación:** [React Router 6](https://reactrouter.com/) (Transiciones SPA fluidas).
- **Iconos:** [Lucide React](https://lucide.dev/) (Iconografía limpia y consistente).
- **Backend (En Progreso):** [Firebase](https://firebase.google.com/) / Firestore para sincronización global en tiempo real.

---

## 🎨 Filosofía de Diseño: "Liquid Glass"
OrderFlow utiliza un sistema de diseño personalizado basado en **Glassmorphism**.
- **Filtros de Fondo:** Desenfoques (blurs) de 20px que crean profundidad sin ruido visual.
- **Superficies Translúcidas:** Permitiendo que las "Luces Ambientales" se filtren, creando una estética moderna y premium.
- **Paleta de Colores Semántica:** Tonos pastel suaves (Ámbar, Esmeralda, Rosa) para una identificación de estado sin fatiga.

---

## 📈 Hoja de Ruta (Roadmap)
- [ ] **Fase 3:** Integración con Firebase para sincronización real en múltiples dispositivos.
- [ ] **Fase 4:** Gestión de espacios de trabajo/inquilinos (Modelo SaaS multi-restaurante).
- [ ] **Fase 5:** Panel detallado de analíticas para tendencias de ventas y rendimiento de cocina.

---

## 🔧 Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/JaiRB19/OrderFlow-App-SAAS-.git](https://github.com/JaiRB19/OrderFlow-App-SAAS-.git)
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` con tus credenciales de Firebase (ver `firebase.js` para las claves necesarias).
4. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

*Desarrollado por Jaiel & Angeles - Ingeniería para el futuro de la hospitalidad.*
