import React from 'react';
import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, PencilLine, ChefHat } from 'lucide-react';

export const MainLayout = () => {
  return (
    <Shell>
      {/* ─── Sidebar (Desktop) ─── */}
      <SidebarWrapper>
        <TopSection>
          {/* Logo y nombre */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BrandIcon to="/">OF</BrandIcon>
            <BrandText>OrderFlow</BrandText>
          </div>
        </TopSection>

        <NavGroup>
          <SidebarNavLink to="/" end>
            <Home size={20} strokeWidth={1.75} className="icon" />
            <NavText>Home</NavText>
          </SidebarNavLink>

          <SidebarNavLink to="/pos">
            <PencilLine size={20} strokeWidth={1.75} className="icon" />
            <NavText>Tomar Orden</NavText>
          </SidebarNavLink>

          <SidebarNavLink to="/kds">
            <ChefHat size={20} strokeWidth={1.75} className="icon" />
            <NavText>Ver Ordenes</NavText>
          </SidebarNavLink>
        </NavGroup>

        <SidebarFooter>
          <UserAvatar title="Usuario">U</UserAvatar>
          <UserInfo>
            <span>Usuario</span>
            <span>Admin</span>
          </UserInfo>
        </SidebarFooter>
      </SidebarWrapper>

      {/* ─── Contenido dinámico (Páginas) ─── */}
      <MainContent>
        <Outlet />
      </MainContent>

      {/* ─── BottomNav (Mobile) ─── */}
      <BottomBarWrapper>
        <BottomNavLink to="/" end>
          <Home size={22} strokeWidth={1.75} />
          <span>Home</span>
        </BottomNavLink>
        <BottomNavLink to="/pos">
          <PencilLine size={22} strokeWidth={1.75} />
          <span>Caja</span>
        </BottomNavLink>
        <BottomNavLink to="/kds">
          <ChefHat size={22} strokeWidth={1.75} />
          <span>Cocina</span>
        </BottomNavLink>
      </BottomBarWrapper>
    </Shell>
  );
};

// ─── Constantes de layout ───────────────────────────────────────────────────
const SIDEBAR_OPEN_WIDTH = '240px';
const BOTTOM_NAV_HEIGHT = '64px';

// ─── Shell ──────────────────────────────────────────────────────────────────
const Shell = styled.div`
  display: flex;             /* 1. MAGIA: Convierte el marco en una fila */
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

// ─── MainContent ────────────────────────────────────────────────────────────
const MainContent = styled.main`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-bottom: ${BOTTOM_NAV_HEIGHT};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    /* Espacio fijo para el sidebar permanently abierto */
    left: ${SIDEBAR_OPEN_WIDTH};
    padding-bottom: 0;
  }
`;

// ─── Sidebar (Desktop) ──────────────────────────────────────────────────────
const SidebarWrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;

  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px) saturate(180%);
  border-right: 1px solid rgba(255, 255, 255, 0.06);

  display: none; 
  flex-direction: column;
  
  /* Layout fijo del sidebar abierto */
  align-items: stretch;
  padding: 1.5rem 1rem;
  width: ${SIDEBAR_OPEN_WIDTH};

  @media (min-width: 769px) {
    display: flex;
  }
`;

// ─── Elementos internos del Sidebar ───
const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  width: 100%;
`;

const BrandIcon = styled(NavLink)`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent}, #DC2626);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  color: white;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.3);
  flex-shrink: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const BrandText = styled.span`
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  margin-left: 0.75rem;
  opacity: 1;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
`;

const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  padding: 0;
  flex: 1;
`;

const SidebarNavLink = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1rem;
  width: 100%;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: #94A3B8;
  transition: all 0.2s;
  flex-shrink: 0;

  .icon { flex-shrink: 0; }

  &.active {
    color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accentSoft};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 22px;
      background: ${({ theme }) => theme.colors.accent};
      border-radius: ${({ theme }) => theme.radii.round};
    }
  }

  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.05);
    color: ${({ theme }) => theme.colors.text};
  }
`;

const NavText = styled.span`
  margin-left: 0.85rem;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 1;
  width: 110px;
  overflow: hidden;
  white-space: nowrap;
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.5rem;
  width: 100%;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.round};
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.07);
  transition: border-color 0.2s;
  flex-shrink: 0;

  &:hover { border-color: rgba(255, 255, 255, 0.14); }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 1;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;

  span:first-child {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
  span:last-child {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

// ─── BottomNav (Mobile) ─────────────────────────────────────────────────────
const BottomBarWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${BOTTOM_NAV_HEIGHT};
  z-index: 100;

  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 769px) { display: none; }
`;

const BottomNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  color: #94A3B8;
  text-decoration: none;
  width: 33.33%;
  height: 100%;
  transition: color 0.2s;
  -webkit-tap-highlight-color: transparent;
  position: relative;

  span {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  &.active {
    color: ${({ theme }) => theme.colors.accent};
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 28px;
      height: 2px;
      background: ${({ theme }) => theme.colors.accent};
      border-bottom-left-radius: ${({ theme }) => theme.radii.round};
      border-bottom-right-radius: ${({ theme }) => theme.radii.round};
    }
  }
`;