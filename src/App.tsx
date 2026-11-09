import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MomentoProgressBar } from './components/MomentoProgressBar';
import { LoginView } from './views/LoginView';

// Views
import { DashboardView } from './views/DashboardView';
import { Momento1Programacion } from './views/Momento1Programacion';
import { Momento2Plan } from './views/Momento2Plan';
import { Momento3ActaApertura } from './views/Momento3ActaApertura';
import { Momento4ListaChequeo } from './views/Momento4ListaChequeo';
import { Momento5ActaCierre } from './views/Momento5ActaCierre';
import { Momento6Informe } from './views/Momento6Informe';
import { Momento7EvaluacionAuditores } from './views/Momento7EvaluacionAuditores';
import { ManualFuncionesView } from './views/ManualFuncionesView';
import { NormatividadLegalView } from './views/NormatividadLegalView';
import { ManualUsuarioView } from './views/ManualUsuarioView';
import { InformesEstadisticasView } from './views/InformesEstadisticasView';
import { CicloPHVAView } from './views/CicloPHVAView';
import { AdminEditorView } from './views/AdminEditorView';
import { GestionUsuariosView } from './views/GestionUsuariosView';
import { ConfiguracionView } from './views/ConfiguracionView';
import { HistorialCambiosView } from './views/HistorialCambiosView';
import { InstalarSomosAuditaView } from './views/InstalarSomosAuditaView';
import { DesinstalarSomosAuditaView } from './views/DesinstalarSomosAuditaView';

import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { isLoggedIn, activeView, toasts, removeToast } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!isLoggedIn) {
    return <LoginView />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'momento1':
        return <Momento1Programacion />;
      case 'momento2':
        return <Momento2Plan />;
      case 'momento3':
        return <Momento3ActaApertura />;
      case 'momento4':
        return <Momento4ListaChequeo />;
      case 'momento5':
        return <Momento5ActaCierre />;
      case 'momento6':
        return <Momento6Informe />;
      case 'momento7':
        return <Momento7EvaluacionAuditores />;
      case 'manual_funciones':
        return <ManualFuncionesView />;
      case 'normatividad':
        return <NormatividadLegalView />;
      case 'manual_usuario':
        return <ManualUsuarioView />;
      case 'estadisticas':
        return <InformesEstadisticasView />;
      case 'ciclo_phva':
        return <CicloPHVAView />;
      case 'admin_editor':
        return <AdminEditorView />;
      case 'usuarios':
        return <GestionUsuariosView />;
      case 'configuracion':
        return <ConfiguracionView />;
      case 'historial':
        return <HistorialCambiosView />;
      case 'instalar':
        return <InstalarSomosAuditaView />;
      case 'desinstalar':
        return <DesinstalarSomosAuditaView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header onToggleSidebarMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      {/* 7 Moments Progress Bar Banner */}
      <div className="no-print">
        <MomentoProgressBar />
      </div>

      {/* Layout with Sidebar & Main Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Toast Notifications Floating in Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => {
          let bg = 'bg-[#0c2340] text-white border-slate-700';
          let Icon = Info;
          if (toast.type === 'success') {
            bg = 'bg-emerald-800 text-white border-emerald-900';
            Icon = CheckCircle2;
          } else if (toast.type === 'warning') {
            bg = 'bg-amber-800 text-white border-amber-900';
            Icon = AlertTriangle;
          } else if (toast.type === 'error') {
            bg = 'bg-rose-900 text-white border-rose-950';
            Icon = XCircle;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-2.5 p-3 rounded-xl shadow-xl border text-xs leading-relaxed animate-fade-in ${bg}`}
            >
              <Icon className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="flex-1 font-medium">{toast.text}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="opacity-70 hover:opacity-100 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
