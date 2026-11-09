import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarDays,
  FileCheck2,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Users,
  FileText,
  Award,
  ArrowRight,
  PlusCircle,
  Search,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldAlert,
  ChevronRight,
  Filter
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    audits,
    activeAudit,
    selectedAuditId,
    setSelectedAuditId,
    setActiveView,
    createAudit,
    currentUser
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Real KPI calculations from stored audits data
  const totalAudits = audits.length;
  const inProgressAudits = audits.filter((a) => a.status === 'en_proceso').length;
  const finishedAudits = audits.filter((a) => a.status === 'finalizada').length;
  const programmedAudits = audits.filter((a) => a.status === 'programada').length;

  const uniqueGestores = Array.from(new Set(audits.map((a) => a.momento1.gestorName))).length;

  const totalConformidades = audits.reduce(
    (acc, a) => acc + (a.momento5?.conformidades?.length || 0),
    0
  );
  const totalHallazgos = audits.reduce(
    (acc, a) => acc + (a.momento5?.hallazgos?.length || 0),
    0
  );
  const totalNoConformidades = audits.reduce(
    (acc, a) => acc + (a.momento5?.noConformidades?.length || 0),
    0
  );
  const totalOportunidades = audits.reduce(
    (acc, a) => acc + (a.momento5?.oportunidadesMejora?.length || 0),
    0
  );
  const totalInformesGenerados = audits.filter(
    (a) => a.momento6?.status === 'Aprobado' || a.momento6?.status === 'Borrador'
  ).length;
  const totalEvaluacionesAuditores = audits.reduce(
    (acc, a) => acc + (a.momento7?.evaluations?.length || 0),
    0
  );

  // Filtered audits for the table
  const filteredAudits = audits.filter((a) => {
    const matchesSearch =
      a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.momento1.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.momento1.gestorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || a.momento1.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const handleCreateQuickAudit = () => {
    const newA = createAudit({
      projectName: 'Proyecto Social Comunitario para Familias Vulnerables',
      gestorName: 'Lic. Valentina Restrepo Salazar',
      gestorLocation: 'Medellín, Antioquia',
      priority: 'media'
    });
    setActiveView('momento1');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="bg-[#0c2340] text-white rounded-2xl p-6 lg:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full mb-3 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistema Integral de Gestión y Control Interno</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Panel de Control · SOMOS AUDITA
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            Plataforma institucional de la <strong className="text-white">Corporación Social Somos Uno</strong> para evaluar el cumplimiento de funciones y responsabilidades del cargo de <strong className="text-white">Gestor(a) de Proyectos en Sectores Vulnerables</strong> mediante los siete momentos obligatorios.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCreateQuickAudit}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Programar Nueva Auditoría</span>
            </button>
            <button
              onClick={() => setActiveView('momento4')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors border border-white/20"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Abrir Lista de Chequeo Activa</span>
            </button>
            <button
              onClick={() => setActiveView('ciclo_phva')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors border border-white/20"
            >
              <TrendingUp className="w-4 h-4 text-blue-300" />
              <span>Ver Ciclo PHVA</span>
            </button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Programadas</span>
            <CalendarDays className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{totalAudits}</div>
          <span className="text-[11px] text-slate-500">{programmedAudits} por iniciar</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">En Proceso</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{inProgressAudits}</div>
          <span className="text-[11px] text-amber-600 font-medium">Revisión en curso</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Gestores</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{uniqueGestores}</div>
          <span className="text-[11px] text-slate-500">Cargos auditados</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Conformidades</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 tabular-nums">{totalConformidades}</div>
          <span className="text-[11px] text-slate-500">Requisitos cumplidos</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">No Conformidades</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-600 tabular-nums">{totalNoConformidades}</div>
          <span className="text-[11px] text-rose-600 font-medium">Con plan de acción</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Informes</span>
            <FileText className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{totalInformesGenerados}</div>
          <span className="text-[11px] text-slate-500">{totalEvaluacionesAuditores} eval. auditores</span>
        </div>
      </div>

      {/* Visual Progress of the 7 Moments for Active Audit */}
      {activeAudit && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-4">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Auditoría Seleccionada
              </span>
              <h2 className="text-base font-bold text-slate-900">
                {activeAudit.code} · {activeAudit.momento1.projectName}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Gestora: <strong className="text-slate-700">{activeAudit.momento1.gestorName}</strong> · Auditor Líder: <strong className="text-slate-700">{activeAudit.momento1.auditorLider}</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                Momento Actual: {activeAudit.currentMoment} de 7
              </span>
              <button
                onClick={() => setActiveView(`momento${activeAudit.currentMoment}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0c2340] text-white hover:bg-slate-800 transition"
              >
                <span>Continuar Momento {activeAudit.currentMoment}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 7 Moments Cards Step Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {[
              { num: 1, name: 'Programación', view: 'momento1', desc: 'Asignación, fechas y motivo' },
              { num: 2, name: 'Plan de Auditoría', view: 'momento2', desc: 'Objetivo, alcance y agenda' },
              { num: 3, name: 'Acta de Apertura', view: 'momento3', desc: 'Reunión inicial y firmas' },
              { num: 4, name: 'Lista de Chequeo', view: 'momento4', desc: 'Evaluación y evidencias' },
              { num: 5, name: 'Acta de Cierre', view: 'momento5', desc: 'Conformidades y No Conformidades' },
              { num: 6, name: 'Informe Auditoría', view: 'momento6', desc: 'Consolidado ejecutivo' },
              { num: 7, name: 'Evaluación Auditores', view: 'momento7', desc: 'Desempeño y fortalezas' },
            ].map((step) => {
              const isPast = step.num < activeAudit.currentMoment;
              const isCurrent = step.num === activeAudit.currentMoment;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveView(step.view)}
                  className={`p-3 rounded-lg border text-left transition-all relative ${
                    isCurrent
                      ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20'
                      : isPast
                      ? 'bg-emerald-50/40 border-emerald-200 hover:bg-emerald-50'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                      isCurrent
                        ? 'bg-blue-600 text-white'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      M{step.num}
                    </span>
                    {isPast ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-300" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{step.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{step.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Two Column Layout: Compliance Statistics and Audit Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Distribution of Results & Findings */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Resumen de Hallazgos y Resultados de Verificación
              </h3>
              <p className="text-xs text-slate-500">
                Resultados consolidados calculados a partir de los expedientes reales
              </p>
            </div>
            <button
              onClick={() => setActiveView('estadisticas')}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Ver análisis completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="text-xs text-emerald-800 font-medium">Conformidades Plenas</span>
              <div className="text-xl font-extrabold text-emerald-900 mt-1 tabular-nums">{totalConformidades}</div>
              <p className="text-[11px] text-emerald-700 mt-1">Cumplimiento en derechos humanos y marco lógico.</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <span className="text-xs text-amber-800 font-medium">Oportunidades de Mejora</span>
              <div className="text-xl font-extrabold text-amber-900 mt-1 tabular-nums">{totalOportunidades}</div>
              <p className="text-[11px] text-amber-700 mt-1">Digitalización y oportunidad contable.</p>
            </div>
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <span className="text-xs text-rose-800 font-medium">No Conformidades</span>
              <div className="text-xl font-extrabold text-rose-900 mt-1 tabular-nums">{totalNoConformidades}</div>
              <p className="text-[11px] text-rose-700 mt-1">NC-01 (Datos sensibles) y NC-02 (Soportes de talleres).</p>
            </div>
          </div>

          {/* Graphical Representation Bars */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Normas Legales y Constitucionales</span>
                <span className="text-slate-500 font-mono">85% cumplimiento</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div style={{ width: '85%' }} className="bg-emerald-600 h-full" />
                <div style={{ width: '15%' }} className="bg-rose-500 h-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Normas Técnicas y Procedimientos</span>
                <span className="text-slate-500 font-mono">78% cumplimiento</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div style={{ width: '78%' }} className="bg-emerald-600 h-full" />
                <div style={{ width: '22%' }} className="bg-amber-500 h-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Caracterización del Proceso Comunitario</span>
                <span className="text-slate-500 font-mono">100% documentado</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div style={{ width: '100%' }} className="bg-emerald-600 h-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Cumplimiento de Funciones del Gestor(a)</span>
                <span className="text-slate-500 font-mono">92% verificadas</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div style={{ width: '92%' }} className="bg-emerald-600 h-full" />
                <div style={{ width: '8%' }} className="bg-amber-500 h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Audit Calendar & Pending Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-emerald-600" />
              Calendario de Auditorías
            </h3>
            <span className="text-xs font-medium text-slate-500">Noviembre 2026</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-900 font-mono">AUD-2026-001</span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  En Cierre
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Proyecto Semillas de Esperanza</h4>
              <p className="text-[11px] text-slate-500">Comuna 13 (San Javier)</p>
              <div className="mt-2 text-[10px] text-slate-600 flex items-center gap-2">
                <span>Inicio: 28/Oct</span>
                <span>·</span>
                <span>Cierre: 12/Nov</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 font-mono">AUD-2026-002</span>
                <span className="text-[10px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  Programada
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Huertas Urbanas Comunitarias</h4>
              <p className="text-[11px] text-slate-500">Comuna 8 (Villa Hermosa)</p>
              <div className="mt-2 text-[10px] text-slate-600 flex items-center gap-2">
                <span>Programada: 18/Nov</span>
                <span>·</span>
                <span>Auditor: Dr. Roberto Casas</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveView('momento1')}
              className="w-full text-center py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            >
              Consultar Programación Completa
            </button>
          </div>
        </div>

      </div>

      {/* Audits Directory Table with Search & Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Expedientes de Auditoría Registrados
            </h3>
            <p className="text-xs text-slate-500">
              Seleccione una auditoría para gestionar sus siete momentos metodológicos
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por código, proyecto o gestor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 w-56 sm:w-64"
              />
            </div>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700"
            >
              <option value="all">Todas las prioridades</option>
              <option value="alta">Prioridad Alta</option>
              <option value="media">Prioridad Media</option>
              <option value="baja">Prioridad Baja</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Código</th>
                <th className="py-2.5 px-3">Proyecto Social</th>
                <th className="py-2.5 px-3">Gestor(a) Auditado(a)</th>
                <th className="py-2.5 px-3">Auditor Líder</th>
                <th className="py-2.5 px-3">Fechas</th>
                <th className="py-2.5 px-3">Prioridad</th>
                <th className="py-2.5 px-3">Momento</th>
                <th className="py-2.5 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAudits.map((a) => {
                const isSelected = a.id === selectedAuditId;
                return (
                  <tr
                    key={a.id}
                    onClick={() => setSelectedAuditId(a.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      {a.code}
                      {a.isDemo && (
                        <span className="block text-[9px] text-emerald-700 font-sans font-medium">
                          Simulación
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800 max-w-xs">
                      <div className="truncate font-semibold">{a.momento1.projectName}</div>
                      <div className="text-[11px] text-slate-500 truncate">{a.momento1.gestorLocation}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      <div className="font-medium">{a.momento1.gestorName}</div>
                      <div className="text-[10px] text-slate-400">{a.momento1.gestorCargo}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      {a.momento1.auditorLider}
                    </td>
                    <td className="py-3 px-3 text-slate-500 tabular-nums">
                      {a.momento1.startDate} a {a.momento1.endDate}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        a.momento1.priority === 'alta'
                          ? 'bg-rose-100 text-rose-800'
                          : a.momento1.priority === 'media'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {a.momento1.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium">
                      <span className="inline-flex items-center gap-1 text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        Momento {a.currentMoment}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAuditId(a.id);
                          setActiveView(`momento${a.currentMoment}`);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-[#0c2340] text-white hover:bg-slate-800 rounded-md transition"
                      >
                        Abrir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
