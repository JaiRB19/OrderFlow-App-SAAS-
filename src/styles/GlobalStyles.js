import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Importar Inter desde Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    /* Raíz del cálculo de rem: 1rem = 16px */
    font-size: 16px;
    height: 100%;
  }

  body {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-optical-sizing: auto;
    /* Renderizado de fuentes óptimo */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow: hidden; /* El scroll ocurre SOLO dentro de los contenedores designados */
  }

  /* El div raíz de React también debe ocupar el 100% del viewport */
  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  ul, ol { list-style: none; }
  a { text-decoration: none; color: inherit; }
  img, svg { display: block; max-width: 100%; }

  /* Reset de botones: completamente neutral, listos para estilizar */
  button {
    border: none;
    background: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent; /* Elimina el flash azul en móviles */
  }

  /* Reset de inputs/textarea */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: none;
    border: none;
    outline: none;
  }

  /* Scrollbar global ultra minimalista (glassmorphism-friendly) */
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.round};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.borderHover};
  }

  /* Selección de texto con el color acento de la marca */
  ::selection {
    background-color: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.text};
  }
`;
