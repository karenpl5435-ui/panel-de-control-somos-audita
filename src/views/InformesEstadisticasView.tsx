import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  Download,
  Printer,
  Filter,
  CheckCircle,
  AlertTriangle,
  FileText,
  Calendar,
  Users,
  ShieldAlert,
  Lightbulb,
  Award,
  Search
} from 'lucide-react';

export const InformesEstadisticasView: React.FC = () => {
  const { audits, exportToCSV } = useApp();

  const [selectedPeriod, setSelectedPeriod] = useState('2026');
  const [selectedGestor, setSelectedGestor] = useState('all');

  // Filtered dataset
  const filteredAudits = audits.filter((a) => {
    const matchesGestor = selectedGestor === 'all' || a.momento1.gestorName === selectedGestor;
    return matchesGestor;
  });

  // Aggregated calculations
  const totalAuditorias = filteredAudits.length;
  const totalConformidades = filteredAudits.reduce((acc, a) => acc + (a.momento5?.conformidades?.length || 0), 0);
  const totalHallazgos = filteredAudits.reduce((acc, a) => acc + (a.momento5?.hallazgos?.length || 0), 0);
  const totalNoConformidades = filteredAudits.reduce((acc, a) => acc + (a.momento5?.noConformidades?.length || 0), 0);
  const totalOportunidades = filteredAudits.reduce((acc, a) => acc + (a.momento5?.oportunidadesMejora?.length || 0), 0);

  // Non-conformities status breakdown
  const allNCs = filteredAudits.flatMap((a) =>
    (a.momento5?.noConformidades || []).map((nc) => ({
      ...nc,
      auditCode: a.code,
      projectName: a.momento1.projectName,
      gestorName: a.momento1.gestorName
    }))
  );

  const ncAbiertas = allNCs.filter((nc) => nc.status === 'abierta').length;
  const ncEnTratamiento = allNCs.filter((nc) => nc.status === 'en_tratamiento').length;
  const ncCerradas = allNCs.filter((nc) => nc.status === 'cerrada').length;

  // Export to Excel / CSV
  const handleExportStats = () => {
    const rows = allNCs.map((nc) => ({
      'Código NC': nc.code,
      'Auditoría': nc.auditCode,
      'Proyecto': nc.projectName,
      'Gestor Responsable': nc.gestorName,
      'Fecha': nc.date,
      'Nivel de Riesgo': nc.riskLevel,
      'Estado': nc.status,
      'Hallazgo': nc.findingWhatWasFound,
      'Norma Incumplida': nc.breachedNormOrRequirement,
      'Acción Correctiva': nc.correctiveActionTreatment,
      'Fecha Compromiso': nc.commitmentDate
    }));
    exportToCSV(rows, `ESTADISTICAS_AUDITORIA_SOMOS_AUDITA_${new Date().toISOString().slice(0, 10)}`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Control, Seguimiento y Analítica de Gestión</span>
            <span>·</span>
            <span>Datos en Tiempo Real</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            CENTRO DE INFORMES, ESTADÍSTICAS Y ACCIONES CORRECTIVAS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Consolidación métrica del cumplimiento de los proyectos comunitarios, seguimiento a No Conformidades y evaluación del equipo auditor.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Informe</span>
          </button>
          <button
            onClick={handleExportStats}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Matriz a Excel (CSV)</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700">Filtros de Análisis:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-800"
          >
            <option value="2026">Año 2026 (Periodo Vigente)</option>
            <option value="todos">Histórico General</option>
          </select>

          <select
            value={selectedGestor}
            onChange={(e) => setSelectedGestor(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-800"
          >
            <option value="all">Todos los Gestores de Proyectos</option>
            <option value="Lic. Valentina Restrepo Salazar">Lic. Valentina Restrepo Salazar</option>
          </select>
        </div>

        <span className="text-xs text-slate-500 font-mono">
          Expedientes analizados: <strong>{totalAuditorias}</strong>
        </span>
      </div>

      {/* Stat Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase text-slate-500">Conformidades</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 tabular-nums">{totalConformidades}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Requisitos superados con éxito</p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase text-slate-500">No Conformidades</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600 tabular-nums">{totalNoConformidades}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Con planes de acción en curso</p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase text-slate-500">Oportunidades</span>
            <Lightbulb className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-700 tabular-nums">{totalOportunidades}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Mejoras de optimización</p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase text-slate-500">Promedio Auditores</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900 tabular-nums">4.65 <span className="text-xs font-normal text-slate-400">/ 5.0</span></div>
          <p className="text-[11px] text-slate-500 mt-0.5">Desempeño del equipo auditor</p>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* State of Corrective Actions Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Estado de Acciones Correctivas (No Conformidades)</span>
            <span className="text-xs font-mono font-semibold text-slate-500">Total: {allNCs.length}</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-rose-700">Abiertas (En Plazo de Subsanación)</span>
                <span className="font-mono text-slate-700">{ncAbiertas} ({Math.round((ncAbiertas / Math.max(1, allNCs.length)) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${(ncAbiertas / Math.max(1, allNCs.length)) * 100}%` }} className="bg-rose-500 h-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-blue-700">En Tratamiento / Verificación Parcial</span>
                <span className="font-mono text-slate-700">{ncEnTratamiento} ({Math.round((ncEnTratamiento / Math.max(1, allNCs.length)) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${(ncEnTratamiento / Math.max(1, allNCs.length)) * 100}%` }} className="bg-blue-500 h-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-emerald-700">Cerradas / Efectividad Comprobada</span>
                <span className="font-mono text-slate-700">{ncCerradas} ({Math.round((ncCerradas / Math.max(1, allNCs.length)) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${(ncCerradas / Math.max(1, allNCs.length)) * 100}%` }} className="bg-emerald-600 h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Component Compliance Chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            Índice de Madurez por Componente de Auditoría
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-800">A. Cumplimiento Legal (Ley 1581 / Habeas Data)</span>
                <span className="font-mono font-bold text-slate-700">80%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: '80%' }} className="bg-emerald-600 h-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-800">B. Normas Técnicas y Procedimientos Internos</span>
                <span className="font-mono font-bold text-slate-700">75%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: '75%' }} className="bg-emerald-600 h-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-800">C. Caracterización del Proceso Comunitario</span>
                <span className="font-mono font-bold text-slate-700">100%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: '100%' }} className="bg-emerald-600 h-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-800">D. Informes Periódicos de Gestión e Impacto</span>
                <span className="font-mono font-bold text-slate-700">90%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: '90%' }} className="bg-emerald-600 h-full" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Corrective Actions Detailed Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Matriz de No Conformidades y Plan de Tratamiento
            </h3>
            <p className="text-xs text-slate-500">
              Trazabilidad de compromisos asumidos en el Momento 5 (Acta de Cierre)
            </p>
          </div>
          <button
            onClick={handleExportStats}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Tabla</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
              <tr>
                <th className="py-2.5 px-3">Código</th>
                <th className="py-2.5 px-3">Auditoría / Proyecto</th>
                <th className="py-2.5 px-3">Requisito Incumplido</th>
                <th className="py-2.5 px-3">Acción Correctiva (Tratamiento)</th>
                <th className="py-2.5 px-3">Responsable</th>
                <th className="py-2.5 px-3">Fecha Compromiso</th>
                <th className="py-2.5 px-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allNCs.map((nc) => (
                <tr key={nc.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-rose-700">{nc.code}</td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{nc.auditCode}</span>
                    <span className="text-[11px] text-slate-500">{nc.projectName.slice(0, 32)}...</span>
                  </td>
                  <td className="py-3 px-3 text-slate-800 font-medium max-w-xs">{nc.breachedNormOrRequirement}</td>
                  <td className="py-3 px-3 text-slate-700 max-w-sm leading-relaxed">{nc.correctiveActionTreatment}</td>
                  <td className="py-3 px-3 text-slate-800 font-medium">{nc.responsibleToSolve}</td>
                  <td className="py-3 px-3 text-slate-600 font-mono tabular-nums">{nc.commitmentDate}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      nc.status === 'cerrada'
                        ? 'bg-emerald-100 text-emerald-800'
                        : nc.status === 'en_tratamiento'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {nc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
