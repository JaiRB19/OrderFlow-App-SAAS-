import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Send, ShoppingBag, Truck, Utensils, Receipt } from 'lucide-react';
import { useOrders } from '../../contexts/OrdersContext';

// ─── Lógica ────────────────────────────────────────────────────────────────
const MODALITIES = [
  { label: 'Comer aquí', icon: <Utensils size={20} strokeWidth={1.75} /> },
  { label: 'Para llevar', icon: <ShoppingBag size={20} strokeWidth={1.75} /> },
  { label: 'Domicilio', icon: <Truck size={20} strokeWidth={1.75} /> },
];

const INITIAL_FORM = {
  customerName: '',
  orderDetails: '',
  modality: 'Comer aquí',
  deliveryRef: '',
  total: '',
};

const POS = () => {
  const { addOrder } = useOrders();
  const [form, setForm] = useState(INITIAL_FORM);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setModality = (modality) => setForm((prev) => ({
    ...prev,
    modality,
    deliveryRef: modality !== 'Domicilio' ? '' : prev.deliveryRef,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.total || !form.customerName) return; // Simple validación
    addOrder({ id: Date.now().toString(), ...form, timestamp: new Date() });
    setForm((prev) => ({ ...INITIAL_FORM, modality: prev.modality }));
  };

  return (
    <PageWrapper>
      {/* SECCIÓN IZQUIERDA: Formulario Principal */}
      <CaptureSection>
        <Header>
          <h1>Captura de Orden</h1>
          <p>Llena los detalles del pedido para enviarlo a cocina</p>
        </Header>

        <form id="pos-form" onSubmit={handleSubmit}>
          <Field>
            <Label>Cliente</Label>
            <Input
              placeholder="Nombre del cliente (Ej. Juan Pérez)"
              value={form.customerName}
              onChange={set('customerName')}
              autoComplete="off"
              required
            />
          </Field>

          <Field>
            <Label>Modalidad</Label>
            <ChipsRow>
              {MODALITIES.map(({ label, icon }) => (
                <Chip
                  key={label}
                  type="button"
                  $active={form.modality === label}
                  data-active={form.modality === label}
                  onClick={() => setModality(label)}
                >
                  {icon}
                  {label}
                </Chip>
              ))}
            </ChipsRow>
          </Field>

          {form.modality === 'Domicilio' && (
            <Field>
              <Label>Referencia de Entrega</Label>
              <DeliveryInput
                placeholder="Ej. UTM, Calle 50 x 31, Esquina roja..."
                value={form.deliveryRef}
                onChange={set('deliveryRef')}
                required
              />
            </Field>
          )}

          <Field style={{ marginBottom: 0 }}>
            <Label>Detalle de la Orden</Label>
            <Textarea
              placeholder={'Ej:\n1 Medio de bistec (sin cebolla)\n1 Coca Light'}
              value={form.orderDetails}
              onChange={set('orderDetails')}
              required
            />
          </Field>
        </form>
      </CaptureSection>

      {/* SECCIÓN DERECHA: Resumen y Cobro (Fija en PC) */}
      <TicketSection>
        <div>
          <TicketHeader>
            <Receipt size={18} />
            Resumen de Ticket
          </TicketHeader>

          <TotalArea>
            <Label>Total a Cobrar ($)</Label>
            <TotalInput
              type="number"
              min="0"
              step="0.5"
              placeholder="$0.00"
              value={form.total}
              onChange={set('total')}
              required
              form="pos-form" /* Enlaza este input al form de la izquierda */
            />
          </TotalArea>
        </div>

        {/* Botón enlazado al formulario general */}
        <SubmitBtn type="submit" form="pos-form">
          <Send size={20} strokeWidth={2.5} />
          Confirmar y Enviar
        </SubmitBtn>
      </TicketSection>
    </PageWrapper>
  );
};

export default POS;

// ─── Animations ───
const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

// ─── Layout ───────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow-y: auto;

  @media (min-width: 1024px) {
    /* PC: Layout Dividido en 2 Columnas Estilo POS Nativo */
    flex-direction: row;
    padding: 2rem;
    gap: 2rem;
    overflow: hidden; /* El scroll interno vivirá en la primera columna */
  }
`;

// Columna Izquierda: Formulario y Captura
const CaptureSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    background: ${({ theme }) => theme.glass.background};
    backdrop-filter: ${({ theme }) => theme.glass.backdropFilter};
    border: ${({ theme }) => theme.glass.border};
    border-radius: ${({ theme }) => theme.radii.xl};
    padding: 2.5rem;
    overflow-y: auto;
    
    /* Scrollbar minimalista internamente */
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { 
      background: ${({ theme }) => theme.colors.border}; 
      border-radius: 4px; 
    }
  }
`;

// Columna Derecha: Resumen / Ticket
const TicketSection = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    margin-top: 0;
    width: 380px;
    height: 100%;
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radii.xl};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 2.5rem;
    justify-content: space-between;
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

// ─── UI Components ─────────────────────────────────────────────────────────
const Header = styled.div`
  margin-bottom: 0.5rem;
  h1 { font-size: 1.6rem; font-weight: 700; color: ${({ theme }) => theme.colors.text}; letter-spacing: -0.02em; }
  p { font-size: 0.95rem; color: ${({ theme }) => theme.colors.textMuted}; margin-top: 0.25rem; }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const baseInputStyles = ({ theme }) => `
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: ${theme.radii.md};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text};
  font-size: 1.05rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &::placeholder { color: ${theme.colors.textMuted}; }
  
  &:focus {
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px ${theme.colors.accentSoft};
    outline: none;
    background: rgba(255, 255, 255, 0.06);
  }
`;

const Input = styled.input`${baseInputStyles}`;

const Textarea = styled.textarea`
  ${baseInputStyles}
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
  @media (min-width: 1024px) {
    min-height: 200px; /* Más espacio en PC para escribir sin scroll constante */
  }
`;

// ─── Chips de Modalidad ───
const ChipsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

const Chip = styled.button`
  padding: 1rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: all 0.2s;

  ${({ $active, theme }) => $active && `
    background: ${theme.colors.accentSoft};
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accent};
    box-shadow: 0 0 0 1px ${theme.colors.accent};
  `}

  &:hover:not([data-active="true"]) {
    border-color: ${({ theme }) => theme.colors.borderHover};
    color: ${({ theme }) => theme.colors.text};
    background: rgba(255,255,255,0.06);
  }
`;

const DeliveryInput = styled(Input)`
  animation: ${fadeSlideIn} 0.25s ease forwards;
`;

// ─── Área de Resumen/Ticket ───
const TicketHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  margin-bottom: 1.5rem;
`;

const TotalArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TotalInput = styled.input`
  width: 100%;
  font-size: 3rem;
  font-weight: 800;
  font-family: ${({ theme }) => theme.typography.fontMono};
  text-align: right;
  color: ${({ theme }) => theme.colors.text};
  padding: 1.5rem 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 0;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.status.ready.fg};
    outline: none;
  }
  &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; }
  
  /* Esconde las flechas numéricas del navegador */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 1.35rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.status.ready.fg}, #059669);
  color: white;
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.status.ready.bg};
  transition: opacity 0.2s, transform 0.15s;

  &:hover { opacity: 0.92; }
  &:active { transform: scale(0.98); }
`;
