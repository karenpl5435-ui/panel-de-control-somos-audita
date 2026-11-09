import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
  Bell,
  Sparkles,
  Download,
  Menu
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  onToggleSidebarMobile?: () => void;
}

const ROLES_LIST: { role: UserRole; label: string }[] = [
  { role: 'ADMINISTRADOR', label: 'Administrador' },
  { role: 'COORDINADOR_AUDITORIA', label: 'Coordinador de Auditoría' },
  { role: 'AUDITOR_LIDER', label: 'Auditor Líder' },
  { role: 'AUDITOR_APOYO', label: 'Auditor de Apoyo' },
  { role: 'GESTOR_AUDITADO', label: 'Gestor(a) Auditado(a)' },
  { role: 'DIRECCION_ADMINISTRATIVA', label: 'Dirección Administrativa' },
];

export const Header: React.FC<HeaderProps> = ({ onToggleSidebarMobile }) => {
  const {
    config,
    currentUser,
    switchUserRole,
    logout,
    setActiveView,
    activeAudit,
    audits,
    selectedAuditId,
    setSelectedAuditId,
    exportDatabaseJSON
  } = useApp();

  const { isInstallable, install } = usePWAInstall();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Context / Links) - Zone 3 (Profile & Action) */}
      <div className="flex items-center justify-between gap-4 md:gap-8 px-4 lg:px-6 py-2.5 h-16">
        
        {/* Zone 1: Single Brand Wordmark & Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSidebarMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-hidden"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0c2340] text-white flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-[#0c2340] block leading-tight">
                {config.appName}
              </span>
              <span className="text-[11px] font-medium text-slate-500 block leading-tight truncate max-w-[180px] sm:max-w-[260px]">
                {config.corporateName}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Context Selector & Audit Quick Pick */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-600 shrink-0">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400 font-normal">Expediente:</span>
            <select
              value={selectedAuditId}
              onChange={(e) => setSelectedAuditId(e.target.value)}
              className="bg-transparent font-semibold text-slate-800 cursor-pointer focus:outline-hidden"
            >
              {audits.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code} — {a.momento1.projectName.slice(0, 36)}...
                </option>
              ))}
            </select>
          </div>

          {activeAudit?.isDemo && (
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-semibold">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              SIMULACIÓN OFICIAL
            </span>
          )}
        </div>

        {/* Zone 3: Actions & Active Profile Control */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick PWA Install Header Button if available */}
          {isInstallable && (
            <button
              onClick={install}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              Instalar App
            </button>
          )}

          {/* Quick Backup Export */}
          <button
            onClick={exportDatabaseJSON}
            title="Descargar copia de seguridad JSON"
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Respaldo</span>
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
              title="Notificaciones de auditoría"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Notificaciones</h4>
                  <span className="text-[11px] text-emerald-700 font-medium">3 activas</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-slate-800">Fecha compromiso NC-01</p>
                    <p className="text-slate-500 text-[11px]">Plazo de entrega de consentimientos: 25 de noviembre.</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-slate-800">Evaluación de Auditores</p>
                    <p className="text-slate-500 text-[11px]">Evaluación diligenciada con promedio 4.77/5.0.</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-slate-800">Plan de Auditoría Aprobado</p>
                    <p className="text-slate-500 text-[11px]">Momento 2 validado por el Coordinador de Control Interno.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#0c2340] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser.fullName.charAt(0)}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <div className="font-semibold text-slate-900 truncate max-w-[130px] leading-tight">
                  {currentUser.fullName}
                </div>
                <div className="text-[10px] text-emerald-700 font-medium leading-tight">
                  {currentUser.role.replace('_', ' ')}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser.fullName}</p>
                  <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                  <p className="text-[11px] font-medium text-emerald-700 mt-1">{currentUser.cargo}</p>
                </div>

                <div className="px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                    Cambiar Perfil (Demostración de Roles):
                  </p>
                  <div className="space-y-1">
                    {ROLES_LIST.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchUserRole(r.role);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-between ${
                          currentUser.role === r.role
                            ? 'bg-blue-50 text-blue-900 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{r.label}</span>
                        {currentUser.role === r.role && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-1 px-2">
                  <button
                    onClick={() => {
                      setActiveView('usuarios');
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-md text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Administrar Usuarios</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-md text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
