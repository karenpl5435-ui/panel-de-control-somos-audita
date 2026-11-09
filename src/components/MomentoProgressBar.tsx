import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const MOMENTOS_DEF = [
  { id: 1, key: 'momento1', view: 'momento1', name: '1. Programación', short: 'M1. Programación' },
  { id: 2, key: 'momento2', view: 'momento2', name: '2. Plan de Auditoría', short: 'M2. Plan' },
  { id: 3, key: 'momento3', view: 'momento3', name: '3. Acta de Apertura', short: 'M3. Apertura' },
  { id: 4, key: 'momento4', view: 'momento4', name: '4. Lista de Chequeo', short: 'M4. Chequeo' },
  { id: 5, key: 'momento5', view: 'momento5', name: '5. Acta de Cierre', short: 'M5. Cierre' },
  { id: 6, key: 'momento6', view: 'momento6', name: '6. Informe de Auditoría', short: 'M6. Informe' },
  { id: 7, key: 'momento7', view: 'momento7', name: '7. Evaluación Auditores', short: 'M7. Evaluación' },
];

export const MomentoProgressBar: React.FC = () => {
  const { activeAudit, activeView, setActiveView } = useApp();

  if (!activeAudit) return null;

  const getMomentoStatus = (id: number) => {
    switch (id) {
      case 1:
        return activeAudit.momento1.programmingStatus === 'Aprobada' ? 'completed' : 'in_progress';
      case 2:
        return activeAudit.momento2.status === 'Aprobado' ? 'completed' : activeAudit.momento2.status === 'En revisión' ? 'in_progress' : 'pending';
      case 3:
        return activeAudit.momento3.status === 'Aprobada' || activeAudit.momento3.status === 'Firmada' ? 'completed' : 'in_progress';
      case 4:
        return activeAudit.momento4.status === 'Finalizada' ? 'completed' : 'in_progress';
      case 5:
        return activeAudit.momento5.status === 'Aprobada' ? 'completed' : activeAudit.momento5.noConformidades.length > 0 ? 'attention' : 'in_progress';
      case 6:
        return activeAudit.momento6.status === 'Aprobado' ? 'completed' : 'in_progress';
      case 7:
        return activeAudit.momento7.status === 'Completada' ? 'completed' : 'pending';
      default:
        return 'pending';
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Los 7 Momentos:
          </span>
          <span className="text-xs font-mono font-medium text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
            {activeAudit.code}
          </span>
        </div>

        {/* 7 Moments Buttons Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
          {MOMENTOS_DEF.map((m) => {
            const status = getMomentoStatus(m.id);
            const isCurrentView = activeView === m.view;

            let badgeColor = 'bg-slate-100 text-slate-600 border-slate-200';
            let StatusIcon = Clock;

            if (status === 'completed') {
              badgeColor = isCurrentView 
                ? 'bg-emerald-700 text-white border-emerald-800' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100';
              StatusIcon = CheckCircle2;
            } else if (status === 'attention') {
              badgeColor = isCurrentView 
                ? 'bg-amber-600 text-white border-amber-700' 
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100';
              StatusIcon = AlertCircle;
            } else if (isCurrentView) {
              badgeColor = 'bg-slate-900 text-white border-slate-900';
            }

            return (
              <button
                key={m.id}
                onClick={() => setActiveView(m.view)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${badgeColor}`}
                title={m.name}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{m.short}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
