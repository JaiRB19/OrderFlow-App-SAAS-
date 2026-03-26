import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../contexts/OrdersContext';
import { PencilLine, ChefHat, TrendingUp, Clock, AlertCircle, ChevronRight, Lock } from 'lucide-react';

// ─── Componente Home ────────────────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const activeOrdersCount = orders.filter(o => o.status !== 'delivered').length;
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  const currentHour = currentTime.getHours();
  const getGreetingTime = () => {
    if (currentHour < 12) return 'Buenos días';
    if (currentHour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  // Detalle B2B: Determinar el turno operativo
  const shiftName = currentHour < 15 ? 'Turno Matutino' : 'Turno Vespertino';

  const formattingOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = currentTime.toLocaleDateString('es-ES', formattingOptions);

  return (
    <HubContainer>
      {/* Luces ambientales para el efecto Liquid Glass */}
      <AmbientLight $top="-10%" $right="-5%" $color="rgba(249, 115, 22, 0.15)" />
      <AmbientLight $top="40%" $right="80%" $color="rgba(16, 185, 129, 0.1)" />

      <ContentWrapper>
        {/* HEADER */}
        <Greeting>
          <div className="title-row">
            <h1>{getGreetingTime()}, Usuario</h1>
            <ShiftBadge>{shiftName}</ShiftBadge>
          </div>
          <p>¿A qué área quieres ingresar hoy?</p>

          <TopMetrics>
            <span>
              <Clock size={14} />
              {dateString.charAt(0).toUpperCase() + dateString.slice(1)}
            </span>
            <span className="divider">|</span>
            <span>
              <LiveIndicator $active={pendingCount > 0} />
              {activeOrdersCount} órdenes activas ({pendingCount} pendientes)
            </span>
          </TopMetrics>
        </Greeting>

        {/* MÓDULOS PRINCIPALES (GRID BENTO) */}
        <Grid>
          {/* Tarjeta Caja / POS */}
          <ModuleCard
            onClick={() => navigate('/pos')}
            $gradient="linear-gradient(90deg, #F97316, #DC2626)"
          >
            <CardHeader>
              <CardIconWrapper $bg="rgba(249, 115, 22, 0.15)" $color="#F97316">
                <PencilLine size={28} strokeWidth={2} />
              </CardIconWrapper>
              <ActionArrow className="arrow-icon">
                <ChevronRight size={24} />
              </ActionArrow>
            </CardHeader>
            <CardText>
              <h2>Crear Orden</h2>
              <p>Interfaz rápida para toma de pedidos y cobros. Optimizada para celulares y monitores.</p>
            </CardText>
          </ModuleCard>

          {/* Tarjeta Cocina / KDS */}
          <ModuleCard
            onClick={() => navigate('/kds')}
            $gradient="linear-gradient(90deg, #10B981, #059669)"
          >
            <CardHeader>
              <CardIconWrapper $bg="rgba(16, 185, 129, 0.15)" $color="#10B981">
                <ChefHat size={28} strokeWidth={2} />
              </CardIconWrapper>
              <ActionArrow className="arrow-icon">
                <ChevronRight size={24} />
              </ActionArrow>
            </CardHeader>
            <CardText>
              <h2>Ver Ordenes</h2>
              <p>Kanban en tiempo real de órdenes por preparar. Colores vivos y fácil gestión horizontal.</p>
            </CardText>
          </ModuleCard>

          {/* WIDGET METRICAS (Estilo Premium Locked) */}
          <WidgetSection>
            <WidgetOverlay>
              <Lock size={28} color="rgba(255,255,255,0.4)" />
              <div className="widget-text">
                <h3>Resumen del Turno</h3>
                <p>Las métricas en vivo se activarán al conectar la base de datos de Firebase.</p>
              </div>
            </WidgetOverlay>

            {/* Fondo simulado de métricas para darle textura */}
            <div className="skeleton-chart" />
          </WidgetSection>
        </Grid>
      </ContentWrapper>
    </HubContainer>
  );
};

export default Home;

// ─── Animations ─────────────────────────────────────────────────────────────
const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

// ─── Layout & Ambient ───────────────────────────────────────────────────────
const HubContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 1.5rem;
  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 4rem; /* Más respiro en escritorio */
  }
`;

const AmbientLight = styled.div`
  position: absolute;
  top: ${({ $top }) => $top};
  right: ${({ $right }) => $right};
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, ${({ $color }) => $color} 0%, rgba(0,0,0,0) 60%);
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
  border-radius: 50%;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1; /* Por encima de la luz ambiental */
  max-width: 1100px; /* Un poco más ancho para monitores */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  animation: ${fadeSlideUp} 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
`;

// ─── Header Section ─────────────────────────────────────────────────────────
const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: -0.03em;
    margin: 0;
  }

  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  @media (min-width: 768px) {
    h1 { font-size: 2.8rem; }
  }
`;

const ShiftBadge = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TopMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.25rem;
  background: rgba(15, 23, 42, 0.4); /* Fondo más oscuro y contrastante */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.radii.round};
  width: fit-content;
  margin-top: 1rem;

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMuted};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .divider { color: rgba(255,255,255,0.1); }
`;

const LiveIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, $active }) => $active ? theme.colors.status?.pending?.fg || '#F59E0B' : theme.colors.textMuted};
  animation: ${({ $active }) => $active ? pulse : 'none'} 2s infinite;
`;

// ─── Modules Grid (Bento Box) ───────────────────────────────────────────────
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    /* Diseño Bento: 2 columnas para acciones, el widget abarca ambas abajo */
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ModuleCard = styled.button`
  text-align: left;
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: blur(20px); /* Desenfoque pesado para el liquid glass */
  border: ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s, border-color 0.3s;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ $gradient }) => $gradient};
    opacity: 0.8;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.05); /* Se ilumina un poco al hover */

    &::before { opacity: 1; }
    
    /* Animación de la flecha */
    .arrow-icon {
      transform: translateX(5px);
      opacity: 1;
      color: ${({ theme }) => theme.colors.text};
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const CardIconWrapper = styled.div`
  width: 64px; /* Un poco más grande para escritorio */
  height: 64px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 2px 10px rgba(255,255,255,0.05);
`;

const ActionArrow = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.5;
  transition: all 0.3s ease;
`;

const CardText = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.6rem;
    letter-spacing: -0.01em;
  }
  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
  }
`;

// ─── Resumen Widget (Estilo Bento Panel) ────────────────────────────────────
const WidgetSection = styled.div`
  position: relative;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2rem;
  min-height: 220px;
  overflow: hidden;

  @media (min-width: 1024px) {
    grid-column: span 2; /* Abarca las dos columnas debajo de las tarjetas */
  }

  /* Textura de fondo simulando una gráfica apagada */
  .skeleton-chart {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%;
    background: linear-gradient(180deg, transparent 0%, rgba(56, 189, 248, 0.03) 100%);
    border-top: 1px dashed rgba(255, 255, 255, 0.03);
  }
`;

const WidgetOverlay = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  text-align: center;

  .widget-text {
    max-width: 400px;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
  }
`;