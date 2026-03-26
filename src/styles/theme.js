export const theme = {
  colors: {
    // Fondos en capas: crea profundidad sin complejidad
    background: '#0A0F1E',  // Casi negro-azulado, como un studio de diseño nocturno
    surface: '#111827',     // Slate profundo para surfaces secundarias (columnas KDS)
    overlay: 'rgba(17, 24, 39, 0.8)', // Para glassmorphism en cards y sidebar

    // Texto
    text: '#F1F5F9',        // Blanco frío, sin llegar a blanco puro (menos fatiga)
    textMuted: '#64748B',   // Slate 500 — subtítulos, timestamps, placeholders
    textSubtle: '#94A3B8',  // Slate 400 — labels de formulario

    // Borde ultra sutil (clave del estilo premium)
    border: 'rgba(255, 255, 255, 0.07)',
    borderHover: 'rgba(255, 255, 255, 0.12)',

    // Acento principal de la app (para elementos activos, focuses, brand)
    accent: '#F97316',       // Naranja vivo (energía de restaurante, alerta)
    accentSoft: 'rgba(249, 115, 22, 0.12)', // Fondo translúcido para estados activos

    // Colores semánticos KDS — Pastel y elegantes, no chillones
    status: {
      pending: {
        fg: '#FF6B6B',                       // Rojo cálido (no sangre, no peligro)
        bg: 'rgba(255, 107, 107, 0.1)',      // Fondo translúcido de columna
        border: 'rgba(255, 107, 107, 0.35)', // Borde del tope de columna
      },
      preparing: {
        fg: '#FFB347',                       // Ámbar cálido (activo, en proceso)
        bg: 'rgba(255, 179, 71, 0.1)',
        border: 'rgba(255, 179, 71, 0.35)',
      },
      ready: {
        fg: '#4ECDC4',                       // Menta/Teal (éxito, calma, listo)
        bg: 'rgba(78, 205, 196, 0.1)',
        border: 'rgba(78, 205, 196, 0.35)',
      },
    },
  },

  // Glassmorphism reutilizable como mixin
  glass: {
    background: 'rgba(17, 24, 39, 0.75)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },

  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.3)',
    md: '0 4px 16px rgba(0,0,0,0.4)',
    lg: '0 8px 32px rgba(0,0,0,0.5)',
    card: '0 4px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
    focus: '0 0 0 3px', // Se usa con color: `${theme.shadows.focus} ${theme.colors.accentSoft}`
  },

  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '20px',
    round: '9999px',
  },

  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    fontMono: '"JetBrains Mono", "Fira Code", monospace',
  },

  // Sidebar tiene su propio ancho bien definido para cálculos de layout
  sidebar: {
    width: '72px',
  },
};
