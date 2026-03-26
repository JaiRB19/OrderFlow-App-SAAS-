import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    Home,
    CreditCard,
    NewspaperIcon,
    SettingsIcon,
    CalendarDays,
    DollarSign,
    Menu,
    Gauge,
    Headset,
    PiggyBank, // Importamos PiggyBank para Metas
    Crown, // Importamos la corona para el plan Premium
    List, // Para Movimientos
    Sparkles // Para decorar el botón
} from "lucide-react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GeneralStyle.css";

// Componentes SideBar
import DashboardView from "../better/DashboardView";
import CardsInter from "../better/CardInter";
import NovedadesView from "../better/NovedadesView";
import OpcionesHomeView from "../better/OpcionesHomeView";
import TarjetaNuevaView from "../better/TarjetaNuevaView";
import PerfilView from "../better/PerfilUsuarioView";
import CalendarioView from "../better/CalendarioView";
import HomeHeader from "../better/HomeHeader";
import SoporteView from "./Soporte";
import PresupuestosView from "../better/PresupuestosView";
import MetasAhorroView from "../better/MetasAhorroView"; // Importamos Vista Global de Metas
import SyncfyWidgetComponent from "./SyncfyWidgetComponent";
import IconPicker from "./LucideIcons";
import StatusPlan from "./StatusPlan";
import PlanVisualizer from "../better/PlanVisualizer";
import RegistrosGlobalView from "../better/RegistrosGlobalView";
import { useSubscription } from "../better/SubscriptionContext";

// Componente helper para la tarjeta del sidebar que consume el contexto
const PlanSidebarCard = ({ collapsed, selectedComponent, handleClickPlanes }) => {
    const { isPremium, isLoadingPlan } = useSubscription();

    const planName = isLoadingPlan ? "..." : (isPremium ? "Premium" : "Plan Inicial");
    const subText = isPremium ? "Suscripción Activa" : "Mejorar cuenta";
    const isActive = selectedComponent === "planvisualizer";

    return (
        <PremiumCardSidebar onClick={handleClickPlanes} $collapsed={collapsed} $active={isActive}>
            <div className="icon-box">
                <Crown size={20} color={isActive ? "#fff" : (isPremium ? "#FFD700" : "#FF9500")} />
            </div>
            {!collapsed && (
                <div className="info">
                    <span className="title">{planName}</span>
                    <span className="subtitle">{subText} <Sparkles size={10} style={{ display: isPremium ? 'none' : 'block' }} /></span>
                </div>
            )}
        </PremiumCardSidebar>
    );
};
// Removed Superset Import

function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState("dashboard");
    const userToken = localStorage.getItem('auth_token');
    useEffect(() => {
        // 1. Si la URL es /planvisualizer, forzamos la vista
        if (location.pathname === '/planvisualizer') {
            setSelectedComponent('planvisualizer');
        }
        // 2. Si hay estado en la navegación (ej: viene de HomeCard)
        else if (location.state && location.state.view) {
            setSelectedComponent(location.state.view);
        }
    }, [location]);

    // Menú principal (excluímos "Planes" aquí para tratarlo especial en Desktop)
    const menuItems = [
        { icon: <Home />, label: "Home", component: "dashboard" },
        { icon: <CreditCard />, label: "Tarjetas", component: "cards" },
        { icon: <DollarSign />, label: "Presupuestos", component: "presupuestos" },
        { icon: <PiggyBank />, label: "Metas", component: "metas" }, // Agregamos Metas Globales
        { icon: <List />, label: "Movimientos", component: "registros" }, // Nueva vista global
        { icon: <NewspaperIcon />, label: "Novedades", component: "novedades" },
        { icon: <CalendarDays />, label: "Calendario", component: "calendario" },
        { icon: <SettingsIcon />, label: "Configuración", component: "opciones" },
        // Removed Superset Item
    ];

    const handleMenuClick = (component) => {
        // Si estamos en la ruta /planvisualizer y clickeamos otra cosa, volvemos a /home
        if (location.pathname === '/planvisualizer' && component !== 'planvisualizer') {
            // Navegar a home y pasar el componente por estado
            navigate('/home', { state: { view: component } });
        } else {
            if (component) setSelectedComponent(component);
        }
    };

    const handleAddClick = () => setSelectedComponent("soporte");
    const changeComponent = (component) => setSelectedComponent(component);

    // Función específica para planes
    const handleClickPlanes = () => setSelectedComponent("planvisualizer");
    const handleLogoClick = () => navigate("/home");

    return (
        <AppContainer>
            {/* ELIMINADO: MobileTopBarContainer (Barra FINPER)
               Ahora la app es full screen en móvil.
            */}

            {/* Sidebar (Desktop Only) */}
            <SidebarContainer $collapsed={collapsed}>
                <SidebarHeader>
                    {!collapsed && (
                        <LogoContainer>
                            <LogoText onClick={handleLogoClick}>LIFE SYNC</LogoText>
                            <div className="logo-accent" />
                        </LogoContainer>
                    )}
                    <MenuButton onClick={() => setCollapsed(!collapsed)}>
                        <Menu size={20} />
                    </MenuButton>
                </SidebarHeader>

                <CreateButtonDesktop onClick={handleAddClick}>
                    <Headset size={18} />
                    {!collapsed && "Soporte"}
                </CreateButtonDesktop>

                <NavList>
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to="#" // Usamos hash para evitar recargas si no hay rutas reales configuradas
                            onClick={() => handleMenuClick(item.component)}
                            $active={selectedComponent === item.component}
                        >
                            {React.cloneElement(item.icon, {
                                color: selectedComponent === item.component ? "#D9632A" : "#666",
                                size: 20
                            })}
                            {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </NavList>

                {/* NUEVO DISEÑO: Tarjeta de Planes en el Sidebar (Desktop) */}
                <PlanSidebarCard collapsed={collapsed} selectedComponent={selectedComponent} handleClickPlanes={handleClickPlanes} />

            </SidebarContainer>

            {/* Main Content Area */}
            <ContentContainer $collapsed={collapsed}>
                <HeaderWrapper>
                    <HomeHeader changeComponent={changeComponent} />
                </HeaderWrapper>
                <MainContentArea>
                    {selectedComponent === "dashboard" && <DashboardView changeComponent={changeComponent} />}
                    {selectedComponent === "cards" && <CardsInter changeComponent={changeComponent} />}
                    {selectedComponent === "novedades" && <NovedadesView />}
                    {selectedComponent === "opciones" && <OpcionesHomeView changeComponent={changeComponent} />}
                    {selectedComponent === "ingresoGasto" && <TarjetaNuevaView />}
                    {selectedComponent === "perfil" && <PerfilView changeComponent={changeComponent} />}
                    {selectedComponent === "calendario" && <CalendarioView />}
                    {selectedComponent === "syncfy" && <SyncfyWidgetComponent />}
                    {selectedComponent === "soporte" && <SoporteView />}
                    {selectedComponent === "piker" && <IconPicker />}
                    {selectedComponent === "presupuestos" && <PresupuestosView />}
                    {selectedComponent === "metas" && <MetasAhorroView />} {/* Renderizamos Metas */}
                    {selectedComponent === "registros" && <RegistrosGlobalView />} {/* Renderizamos Movimientos Globales */}
                    {selectedComponent === "statusplan" && <StatusPlan />}
                    {selectedComponent === "planvisualizer" && <PlanVisualizer />}
                    {/* Removed Superset Component */}
                </MainContentArea>
            </ContentContainer>

            {/* Floating Action Button (Mobile Only) */}
            <CreateButtonFAB onClick={handleAddClick}>
                <Headset size={24} color="white" />
            </CreateButtonFAB>

            {/* Mobile Bottom Navigation Bar */}
            <MobileBottomNavBar>
                {/* 1. Renderizamos los items normales */}
                {menuItems.slice(0, 4).map((item, index) => ( // Mostramos solo los primeros 4 para que quepa el Premium
                    <MobileNavLink
                        key={index}
                        to="#"
                        onClick={() => handleMenuClick(item.component)}
                        $active={selectedComponent === item.component}
                    >
                        {React.cloneElement(item.icon, {
                            color: selectedComponent === item.component ? "#D9632A" : "#888",
                            size: 22
                        })}
                        {/* Opcional: ocultar etiquetas en pantallas muy pequeñas */}
                    </MobileNavLink>
                ))}

                {/* 2. AGREGAMOS EL BOTÓN PREMIUM EN EL MENÚ MÓVIL */}
                <MobileNavLink
                    onClick={handleClickPlanes}
                    $active={selectedComponent === "planvisualizer"}
                    style={{ color: '#FF9500' }} // Color dorado/naranja distintivo
                >
                    <Crown size={24} fill={selectedComponent === "planvisualizer" ? "#FF9500" : "none"} />
                </MobileNavLink>

                {/* 3. Configuración al final */}
                <MobileNavLink
                    onClick={() => handleMenuClick("opciones")}
                    $active={selectedComponent === "opciones"}
                >
                    <SettingsIcon size={22} color={selectedComponent === "opciones" ? "#D9632A" : "#888"} />
                </MobileNavLink>

            </MobileBottomNavBar>
        </AppContainer>
    );
}

export default HomePage;

// --- STYLED COMPONENTS ---

const AppContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: var(--bg-primary);
    transition: background 0.3s ease;
`;

const SidebarContainer = styled.div`
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: var(--bg-sidebar); 
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-right: 1px solid var(--border-subtle);
    transition: width 0.3s ease, background 0.3s ease;
    width: ${(props) => (props.$collapsed ? "80px" : "240px")};
    display: flex;
    flex-direction: column;
    z-index: 1000;
    padding-bottom: 20px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const SidebarHeader = styled.div`
    padding: 25px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
`;

const MenuButton = styled.button`
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    cursor: pointer;
    padding: 8px;
    border-radius: 12px;
    transition: all 0.2s;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: var(--bg-secondary);
        border-color: var(--accent-color);
        color: var(--accent-color);
    }
`;

const CreateButtonDesktop = styled.button`
    background: #1C1C1E; /* Mantenemos negro/oscuro por diseño */
    color: white;
    padding: 12px;
    width: ${props => props.$collapsed ? '50px' : '85%'};
    border: none;
    border-radius: 16px;
    font-weight: 600;
    cursor: pointer;
    margin: 0 auto 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        background: #000;
    }
`;

const NavList = styled.div`
    flex: 1; /* Ocupa el espacio disponible */
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    width: 90%;
    margin: 0 auto;
    text-decoration: none;
    color: ${props => props.$active ? 'var(--accent-color)' : 'var(--text-secondary)'};
    border-radius: 12px;
    transition: 0.2s;
    font-weight: ${props => props.$active ? '600' : '500'};
    background: ${props => props.$active ? 'rgba(217, 99, 42, 0.08)' : 'transparent'};

    &:hover {
        background: var(--bg-secondary);
        color: var(--accent-color);
    }
`;

/* --- NUEVA TARJETA PREMIUM EN SIDEBAR --- */
const PremiumCardSidebar = styled.div`
    width: ${props => props.$collapsed ? '50px' : '85%'};
    margin: 0 auto;
    background: ${props => props.$active ? 'linear-gradient(135deg, #FF9500 0%, #FF5E3A 100%)' : 'var(--bg-card)'};
    border: 1px solid ${props => props.$active ? 'transparent' : 'var(--border-color)'};
    padding: ${props => props.$collapsed ? '12px' : '15px'};
    border-radius: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
    gap: 12px;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: ${props => props.$active ? '0 8px 20px rgba(255, 149, 0, 0.25)' : '0 4px 10px rgba(0,0,0,0.03)'};

    .icon-box {
        background: ${props => props.$active ? 'rgba(255,255,255,0.2)' : 'rgba(217, 99, 42, 0.1)'};
        padding: 8px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .info {
        display: flex;
        flex-direction: column;
    }

    .title {
        font-weight: 700;
        font-size: 14px;
        color: ${props => props.$active ? 'white' : 'var(--text-primary)'};
    }

    .subtitle {
        font-size: 11px;
        color: ${props => props.$active ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary)'};
        display: flex;
        align-items: center;
        gap: 4px;
    }

    &:hover {
        transform: translateY(-3px);
        border-color: #FF9500;
    }
`;

const LogoContainer = styled.div`
    position: relative;
    .logo-accent {
        height: 3px;
        width: 25px;
        background: var(--accent-color);
        border-radius: 10px;
        margin-top: 2px;
    }
`;

const LogoText = styled.h2`
    color: var(--accent-color);
    font-size: 24px;
    cursor: pointer;
    font-weight: 800;
    margin: 0;
    letter-spacing: -0.5px;
`;

// Main Content Container
const ContentContainer = styled.div`
    position: absolute;
    left: ${(props) => (props.$collapsed ? "80px" : "240px")};
    top: 0;
    right: 0;
    bottom: 0;
    padding: 30px; /* Padding Desktop */
    background: var(--bg-primary);
    transition: left 0.3s, background 0.3s;
    display: flex;
    flex-direction: column;
    overflow-y: auto; 

    /* --- ESTILO FULL SCREEN MÓVIL --- */
    @media (max-width: 768px) {
        left: 0;
        top: 0;
        bottom: 70px;
        padding: 20px 15px 0 15px;
        padding-top: env(safe-area-inset-top, 20px);
    }
`;

const HeaderWrapper = styled.div`
    width: 100%;
    flex-shrink: 0;
`;

const MainContentArea = styled.div`
    flex: 1 1 auto;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 20px;
`;

// Floating Action Button (FAB)
const CreateButtonFAB = styled.button`
    display: none;
    background: #1C1C1E;
    color: white;
    width: 55px;
    height: 55px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 25px rgba(0,0,0, 0.2);
    position: fixed;
    bottom: 85px;
    right: 20px;
    z-index: 1001;
    transition: transform 0.2s;

    &:active { transform: scale(0.95); }

    @media (max-width: 768px) {
        display: flex;
    }
`;

// Mobile Bottom Navigation Bar
const MobileBottomNavBar = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: white; /* Blanco sólido para limpieza */
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -5px 20px rgba(0,0,0,0.02);
  z-index: 1000;
  padding: 0 15px;
  justify-content: space-around; /* Espaciado uniforme */
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 15px;
  text-decoration: none;
  transition: all 0.2s;
  
  /* Indicador activo sutil */
  background: ${props => props.$active ? 'rgba(217, 99, 42, 0.08)' : 'transparent'};

  &:active {
    transform: scale(0.9);
  }
`;