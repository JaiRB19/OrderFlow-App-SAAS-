import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Tema, Estilos y Componentes de Layout
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { MainLayout } from './components/layout/MainLayout';
import { OrdersProvider } from './contexts/OrdersContext';

// Páginas
import POS from './pages/POS';
import KDS from './pages/KDS';
import Home from './pages/Home';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <OrdersProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pos" element={<POS />} />
              <Route path="/kds" element={<KDS />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </OrdersProvider>
    </ThemeProvider>
  );
};

export default App;
