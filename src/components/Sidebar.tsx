import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  CalendarDays,
  FileSpreadsheet,
  FileCheck,
  ClipboardList,
  FileSignature,
  FileText,
  Award,
  BookOpen,
  Scale,
  HelpCircle,
  BarChart3,
  RotateCw,
  Palette,
  Users,
  Settings,
  History,
  Download,
  Trash2,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface MenuItem {
  id: string;
  number?: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const { activeView, setActiveView } = useApp();

  const MENU_GROUPS: MenuGroup[] = [
    {
      title: 'INICIO',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'PROCESO DE AUDITORÍA',
      items: [
        { id: 'momento1', number: 2, label: 'Programación de auditoría', icon: CalendarDays },
        { id: 'momento2', number: 3, label: 'Plan de auditoría', icon: FileSpreadsheet },
        { id: 'momento3', number: 4, label: 'Acta de apertura', icon: FileCheck },
        { id: 'momento4', number: 5, label: 'Lista de chequeo', icon: ClipboardList },
        { id: 'momento5', number: 6, label: 'Acta de cierre', icon: FileSignature },
        { id: 'momento6', number: 7, label: 'Informe de auditoría', icon: FileText },
        { id: 'momento7', number: 8, label: 'Evaluación de auditores', icon: Award }
      ]
    },
    {
      title: 'GESTIÓN DOCUMENTAL',
      items: [
        { id: 'manual_funciones', number: 9, label: 'Manual de funciones', icon: BookOpen },
        { id: 'normatividad', number: 10, label: 'Normatividad legal', icon: Scale },
        { id: 'manual_usuario', number: 11, label: 'Manual de usuario', icon: HelpCircle }
      ]
    },
    {
      title: 'CONTROL Y SEGUIMIENTO',
      items: [
        { id: 'estadisticas', number: 12, label: 'Informes y estadísticas', icon: BarChart3 },
        { id: 'ciclo_phva', number: 13, label: 'Ciclo PHVA', icon: RotateCw }
      ]
    },
    {
      title: 'ADMINISTRACIÓN',
      items: [
        { id: 'admin_editor', number: 14, label: 'Editor de plataforma', icon: Palette },
        { id: 'usuarios', number: 15, label: 'Gestión de usuarios', icon: Users },
        { id: 'configuracion', number: 16, label: 'Configuración', icon: Settings },
        { id: 'historial', number: 17, label: 'Historial de cambios', icon: History }
      ]
    },
    {
      title: 'APLICACIÓN',
      items: [
        { id: 'instalar', number: 18, label: 'Instalar SOMOS AUDITA', icon: Download },
        { id: 'desinstalar', number: 19, label: 'Desinstalar SOMOS AUDITA', icon: Trash2 }
      ]
    }
  ];

  const handleSelectView = (viewId: string) => {
    setActiveView(viewId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-50 md:z-30 h-screen md:h-[calc(100vh-4rem)] w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Mobile Header with close button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-[#0c2340] text-white">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-wide">SOMOS AUDITA</span>
          </div>
          <button onClick={onCloseMobile} className="p-1 rounded text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
          {MENU_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1">
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.title}
              </h3>
              <div className="space-y-0.5 pt-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectView(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                        isActive
                          ? 'bg-[#0c2340] text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      />
                      <span className="truncate flex-1">
                        {item.number ? `${item.number}. ${item.label}` : item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Slogan and Corporate Footer in Sidebar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/80">
          <p className="text-[10px] text-slate-500 text-center italic leading-tight">
            "Auditoría, transparencia y mejoramiento para la transformación social"
          </p>
          <p className="text-[9px] text-slate-400 text-center mt-1">
            Corporación Social Somos Uno · 2026
          </p>
        </div>
      </aside>
    </>
  );
};
