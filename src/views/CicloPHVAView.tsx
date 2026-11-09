import React from 'react';
import { useApp } from '../context/AppContext';
import {
  RotateCw,
  CalendarDays,
  FileSpreadsheet,
  FileCheck,
  ClipboardList,
  FileSignature,
  FileText,
  Award,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const CicloPHVAView: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Mejoramiento Continuo · Norma ISO 19011</span>
            <span>·</span>
            <span>Enfoque Integral</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            FLUJOGRAMA Y CICLO PHVA DE LA AUDITORÍA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Articulación metodológica de los siete momentos obligatorios con las cuatro fases del ciclo PHVA: Planear, Hacer, Verificar y Actuar.
          </p>
        </div>

        <button
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition shrink-0"
        >
          <span>Ir al Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Principle Banner */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-3">
        <RotateCw className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5 animate-spin-slow" />
        <div>
          <strong className="block font-bold">Principio Rector:</strong>
          El ciclo PHVA complementa y dinamiza los siete momentos de SOMOS AUDITA, garantizando que los hallazgos identificados en comunidades vulnerables se transformen en acciones correctivas eficaces y mejoramiento sostenido.
        </div>
      </div>

      {/* 4 PHVA Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* P - PLANEAR */}
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                P
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">PLANEAR</h3>
                <span className="text-[11px] text-blue-700 font-semibold">Diseño y Programación</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
              Momentos 1 y 2
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Se crea la auditoría en el sistema, se identifica el proyecto comunitario y el gestor responsable, se asigna el equipo auditor y se definen los objetivos, el alcance, los criterios y el cronograma.
          </p>

          <div className="space-y-2 pt-1 text-xs">
            <button
              onClick={() => setActiveView('momento1')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-800 border border-slate-200 transition text-left"
            >
              <div className="flex items-center gap-2 font-semibold">
                <CalendarDays className="w-4 h-4 text-blue-600" />
                <span>Momento 1. Programación de la auditoría</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveView('momento2')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-800 border border-slate-200 transition text-left"
            >
              <div className="flex items-center gap-2 font-semibold">
                <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                <span>Momento 2. Plan de auditoría</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* H - HACER */}
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
                H
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">HACER</h3>
                <span className="text-[11px] text-emerald-700 font-semibold">Ejecución y Verificación de Campo</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">
              Momentos 3 y 4
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Se formaliza el inicio mediante acta firmada y se ejecuta la revisión integral en cuatro componentes: normas legales, técnicas, caracterización e informes, adjuntando evidencias probatorias.
          </p>

          <div className="space-y-2 pt-1 text-xs">
            <button
              onClick={() => setActiveView('momento3')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-800 border border-slate-200 transition text-left"
            >
              <div className="flex items-center gap-2 font-semibold">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Momento 3. Acta de apertura</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveView('momento4')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-800 border border-slate-200 transition text-left"
            >
              <div className="flex items-center gap-2 font-semibold">
                <ClipboardList className="w-4 h-4 text-emerald-600" />
                <span>Momento 4. Lista de chequeo</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* V - VERIFICAR */}
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-600 text-white font-black text-sm flex items-center justify-center">
                V
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">VERIFICAR</h3>
                <span className="text-[11px] text-amber-700 font-semibold">Consolidación y Cierre</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded">
              Momentos 5 y 6
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Se comunican las conformidades, hallazgos, oportunidades de mejora y No Conformidades (5 preguntas obligatorias), y se redacta el informe consolidado para la dirección.
          </p>

          <div className="space-y-2 pt-1 text-xs">
            <button
              onClick={() => setActiveView('momento5')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 text-slate-800 border border-slate-200 transition text-left"
            >
              <div className="flex items-center gap-2 font-semibold">
                <FileSignature className="w-4 h-4 text-amber-600" />
                <span>Momento 5. Acta de cierre</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveView('momento6')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 text-slate-800 border border-slate-200 transition text-left"
            >
              <div className="flex items-center gap-2 font-semibold">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Momento 6. Informe de la auditoría</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* A - ACTUAR */}
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-sm flex items-center justify-center">
                A
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">ACTUAR</h3>
                <span className="text-[11px] text-indigo-700 font-semibold">Evaluación y Aprendizaje</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded">
              Momento 7 + Seguimiento
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Se evalúa el desempeño del equipo auditor en 13 criterios éticos y técnicos, y se hace seguimiento estricto a las acciones correctivas para fortalecer los proyectos futuros.
          </p>

          <div className="space-y-2 pt-1 text-xs">
            <button
              onClick={() => setActiveView('momento7')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-800 border border-slate-200 transition text-left"
            >
              <div className="flex items-center gap-2 font-semibold">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Momento 7. Evaluación de los auditores</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveView('estadisticas')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-800 border border-slate-200 transition text-left"
            >
              <div className="flex items-center gap-2 font-semibold">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>Seguimiento a Acciones Correctivas</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

      </div>

      {/* Sequence Banner */}
      <div className="bg-[#0c2340] text-white p-5 rounded-xl text-center space-y-2">
        <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400">
          Secuencia Metodológica Oficial
        </span>
        <div className="text-xs sm:text-sm font-bold flex flex-wrap items-center justify-center gap-2 text-slate-200">
          <span>1. PROGRAMACIÓN</span>
          <span>→</span>
          <span>2. PLAN</span>
          <span>→</span>
          <span>3. ACTA APERTURA</span>
          <span>→</span>
          <span>4. LISTA CHEQUEO</span>
          <span>→</span>
          <span>5. ACTA CIERRE</span>
          <span>→</span>
          <span>6. INFORME</span>
          <span>→</span>
          <span>7. EVALUACIÓN AUDITORES</span>
        </div>
      </div>
    </div>
  );
};
