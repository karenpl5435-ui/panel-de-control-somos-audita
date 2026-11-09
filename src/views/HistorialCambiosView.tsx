import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  History,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  User,
  ShieldCheck
} from 'lucide-react';

export const HistorialCambiosView: React.FC = () => {
  const { auditLogs, exportToCSV } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter((log) => {
    const s = searchTerm.toLowerCase();
    return (
      log.action.toLowerCase().includes(s) ||
      log.module.toLowerCase().includes(s) ||
      log.userName.toLowerCase().includes(s) ||
      log.details.toLowerCase().includes(s)
    );
  });

  const handleExportLogs = () => {
    const rows = filteredLogs.map((l) => ({
      'Fecha y Hora': l.timestamp,
      'Usuario': l.userName,
      'Rol': l.userRole,
      'Módulo': l.module,
      'Acción Realizada': l.action,
      'Detalles': l.details
    }));
    exportToCSV(rows, `HISTORIAL_AUDITORIA_SOMOS_AUDITA_${new Date().toISOString().slice(0, 10)}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Trazabilidad y Control Interno</span>
            <span>·</span>
            <span>Bitácora Auditable</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            HISTORIAL DE CAMBIOS Y TRAZABILIDAD
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Registro cronológico inmutable de todas las operaciones, aprobaciones, modificaciones y accesos de los usuarios en el sistema.
          </p>
        </div>

        <button
          onClick={handleExportLogs}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Historial (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por acción, usuario, módulo o detalle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <span className="text-xs text-slate-500 font-mono">
          Registros encontrados: <strong>{filteredLogs.length}</strong>
        </span>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
              <tr>
                <th className="py-2.5 px-3">Fecha y Hora</th>
                <th className="py-2.5 px-3">Usuario Responsable</th>
                <th className="py-2.5 px-3">Módulo / Momento</th>
                <th className="py-2.5 px-3">Acción</th>
                <th className="py-2.5 px-3">Detalles de la Operación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap tabular-nums">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{log.userName}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{log.userRole.replace('_', ' ')}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">
                      {log.module}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">{log.action}</td>
                  <td className="py-3 px-3 text-slate-600 max-w-sm leading-relaxed">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
