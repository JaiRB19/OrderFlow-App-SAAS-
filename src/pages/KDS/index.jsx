import React from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { useOrders } from '../../contexts/OrdersContext';
import { Clock, MapPin, Package, Check, ChevronRight, Truck } from 'lucide-react';

// ─── Configuración de acciones por estado ───
const ACTION_CONFIG = {
  pending: {
    label: 'Iniciar Preparación',
    next: 'preparing',
    icon: <ChevronRight size={15} />,
  },
  preparing: {
    label: 'Marcar como Listo',
    next: 'ready',
    icon: <Check size={15} />,
  },
  ready: {
    label: 'Entregar al Cliente',
    next: 'delivered',
    icon: <Package size={15} />,
  },
};

const MODALITY_ICONS = {
  'Comer aquí': null,
  'Para llevar': <Package size={12} />,
  'Domicilio': <Truck size={12} />,
};

const ComandaCard = ({ order, statusKey, onAction, statusTheme }) => {
  const config = ACTION_CONFIG[statusKey];
  const time = new Date(order.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <CardWrapper>
      {/* ── Encabezado ── */}
      <CardTop>
        <div>
          <TicketNum>#{order.id.slice(-4)}</TicketNum>
          <CustomerName>{order.customerName}</CustomerName>
        </div>
        <TimeStamp>
          <Clock size={12} />
          {time}
        </TimeStamp>
      </CardTop>

      {/* ── Tags de modalidad + domicilio ── */}
      <TagRow>
        <Tag
          $color={statusTheme.fg}
          $bg={statusTheme.bg}
          $border={statusTheme.border}
        >
          {MODALITY_ICONS[order.modality]}
          {order.modality}
        </Tag>
        {order.deliveryRef && (
          <Tag $color="#FF6B6B" $border="rgba(255,107,107,0.3)">
            <MapPin size={12} />
            {order.deliveryRef}
          </Tag>
        )}
      </TagRow>

      {/* ── Detalle del pedido ── */}
      <OrderText>{order.orderDetails}</OrderText>

      {/* ── Botón de acción mutable ── */}
      <ActionBtn
        $bg={statusTheme.bg}
        $color={statusTheme.fg}
        $borderColor={statusTheme.border}
        onClick={() => onAction(order.id, config.next)}
      >
        {config.label}
        {config.icon}
      </ActionBtn>
    </CardWrapper>
  );
};

// ─── Columnas ───
const COLUMNS = [
  { key: 'pending', label: 'Pendientes', statusKey: 'pending' },
  { key: 'preparing', label: 'Preparando', statusKey: 'preparing' },
  { key: 'ready', label: 'Listos', statusKey: 'ready' },
];

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 2rem;
  text-align: center;
  opacity: 0.5;
`;

const KDS = () => {
  const { orders, updateOrderStatus } = useOrders();
  const theme = useTheme();

  return (
    <Board>
      {COLUMNS.map(({ key, label, statusKey }) => {
        const st = theme.colors.status[statusKey];
        const colOrders = orders.filter((o) => o.status === key);

        return (
          <Column key={key} $bgColor={st.bg} $borderColor={st.border}>
            <ColHeader $borderColor={st.border}>
              <ColTitle $color={st.fg}>{label}</ColTitle>
              <CountBadge theme={theme} $color={st.fg} $bg={st.bg} $border={st.border}>
                {colOrders.length}
              </CountBadge>
            </ColHeader>

            <CardsList>
              {colOrders.length === 0 ? (
                <EmptyState>Sin órdenes</EmptyState>
              ) : (
                colOrders.map((order) => (
                  <ComandaCard
                    key={order.id}
                    order={order}
                    statusKey={statusKey}
                    onAction={updateOrderStatus}
                    statusTheme={st}
                  />
                ))
              )}
            </CardsList>
          </Column>
        );
      })}
    </Board>
  );
};

export default KDS;


// ─── Animación de entrada para nuevas tarjetas ───
const cardEnter = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

// ─── Layout del tablero ───
const Board = styled.div`
  display: flex;
  height: 100%;
  padding: 1.5rem;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: stretch;

  /* En mobile, las columnas se apilan verticalmente con scroll vertical */
  @media (max-width: 767px) {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    height: auto;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background: ${({ $bgColor }) => $bgColor};

  @media (max-width: 767px) {
    min-width: unset;
    max-width: unset;
    flex: unset;
  }
`;

const ColHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ $borderColor }) => $borderColor};
`;

const ColTitle = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* Punto de color como indicador */
  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    box-shadow: 0 0 6px ${({ $color }) => $color};
  }
`;

const CountBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  padding: 0.15rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.round};
`;

const CardsList = styled.div`
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

// ─── ComandaCard ───
const CardWrapper = styled.div`
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.backdropFilter};
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  animation: ${cardEnter} 0.3s ease forwards;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TicketNum = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`;

const CustomerName = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 2px;
  display: block;
`;

const TimeStamp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-variant-numeric: tabular-nums;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.55rem;
  border-radius: ${({ theme }) => theme.radii.round};
  font-size: 0.7rem;
  font-weight: 600;
  border: 1px solid ${({ $border, theme }) => $border || theme.colors.border};
  color: ${({ $color, theme }) => $color || theme.colors.textMuted};
  background: ${({ $bg }) => $bg || 'transparent'};
`;

const OrderText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.65;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.75rem;
  white-space: pre-wrap;
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.85rem;
`;

const ActionBtn = styled.button`
  width: 100%;
  padding: 0.65rem 1rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  transition: opacity 0.15s, transform 0.1s;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};

  &:hover { opacity: 0.85; }
  &:active { transform: scale(0.98); }
`;