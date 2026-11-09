import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Printer,
  Save,
  CheckCircle,
  Send,
  Download,
  ShieldCheck,
  Award,
  AlertTriangle,
  Lightbulb,
  Check,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const Momento6Informe: React.FC = () => {
  const { activeAudit, selectedAuditId, updateAuditMomento, setActiveView, currentUser, showToast } = useApp();

  if (!activeAudit) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [reportData, setReportData] = useState({
    title: activeAudit.momento6.title,
    executiveSummary: activeAudit.momento6.executiveSummary,
    methodologyConducted: activeAudit.momento6.methodologyConducted,
    riskAnalysis: activeAudit.momento6.riskAnalysis,
    generalConclusions: [...activeAudit.momento6.generalConclusions],
    recommendations: [...activeAudit.momento6.recommendations],
    status: activeAudit.momento6.status,
    version: activeAudit.momento6.version
  });

  const handleSaveReport = () => {
    updateAuditMomento(selectedAuditId, 'momento6', {
      ...activeAudit.momento6,
      ...reportData
    });
    setIsEditing(false);
    showToast('Informe de auditoría guardado con éxito.', 'success');
  };

  const handleApproveReport = () => {
    updateAuditMomento(selectedAuditId, 'momento6', {
      ...activeAudit.momento6,
      ...reportData,
      status: 'Aprobado',
      approvedBy: currentUser.fullName,
      approvedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    });
    showToast('Informe Final de Auditoría APROBADO formalmente.', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  // Checklist counts
  const checkItems = activeAudit.momento4.items;
  const cumpleCount = checkItems.filter((i) => i.result === 'cumple').length;
  const noCumpleCount = checkItems.filter((i) => i.result === 'no_cumple').length;
  const parcialCount = checkItems.filter((i) => i.result === 'cumple_parcialmente').length;
  const complianceScore = Math.round(
    ((cumpleCount + parcialCount * 0.5) / Math.max(1, checkItems.length)) * 100
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner Actions (Hidden in Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Fase 3: Verificar (PHVA)</span>
            <span>·</span>
            <span>Momento Obligatorio 6</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MOMENTO 6. INFORME DE LA AUDITORÍA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Consolidación ejecutiva y técnica de los resultados de los momentos anteriores, conclusiones institucionales, análisis de riesgos y recomendaciones.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            >
              Editar Borrador
            </button>
          ) : (
            <button
              onClick={handleSaveReport}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Borrador</span>
            </button>
          )}

          <button
            onClick={handleApproveReport}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Aprobar Informe</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span>Descargar / Imprimir PDF</span>
          </button>

          <button
            onClick={() => setActiveView('momento7')}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <span>Evaluar Auditores (Momento 7)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FORMAL INSTITUTIONAL REPORT DOCUMENT (Printable) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm space-y-8 font-sans print:border-none print:shadow-none print:p-0">
        
        {/* PORTADA INSTITUCIONAL */}
        <div className="border-b-2 border-[#0c2340] pb-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Corporación Social Somos Uno · SOMOS AUDITA</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0c2340] tracking-tight uppercase max-w-2xl mx-auto">
            INFORME FINAL CONSOLIDADO DE AUDITORÍA INTEGRAL DE GESTIÓN
          </h1>

          <p className="text-sm font-semibold text-slate-700">
            Cargo Evaluado: Gestor(a) de Proyectos para Sectores Vulnerables
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left max-w-3xl mx-auto mt-4">
            <div>
              <span className="text-slate-400 block font-semibold">Código:</span>
              <strong className="text-slate-900 font-mono text-sm">{activeAudit.code}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Proyecto:</span>
              <strong className="text-slate-900 line-clamp-1">{activeAudit.momento1.projectName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Gestor(a):</span>
              <strong className="text-slate-900">{activeAudit.momento1.gestorName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Auditor Líder:</span>
              <strong className="text-slate-900">{activeAudit.momento1.auditorLider}</strong>
            </div>
          </div>

          <p className="text-xs text-slate-500 italic pt-2">
            "Auditoría, transparencia y mejoramiento para la transformación social" · Medellín, Colombia · 2026
          </p>
        </div>

        {/* 1. RESUMEN EJECUTIVO */}
        <section className="space-y-3">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#0c2340] flex items-center gap-2 pb-1 border-b border-slate-200">
            <span>1. Resumen Ejecutivo</span>
          </h2>
          <textarea
            rows={4}
            disabled={!isEditing}
            value={reportData.executiveSummary}
            onChange={(e) => setReportData({ ...reportData, executiveSummary: e.target.value })}
            className="w-full text-xs text-slate-800 leading-relaxed p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 font-medium"
          />
        </section>

        {/* 2. OBJETIVO Y ALCANCE */}
        <section className="space-y-3 text-xs">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#0c2340] pb-1 border-b border-slate-200">
            2. Objetivo y Alcance de la Auditoría
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="block text-slate-900 mb-1">Objetivo General:</strong>
              <p className="text-slate-700 leading-relaxed">{activeAudit.momento2.generalObjective}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="block text-slate-900 mb-1">Alcance y Delimitación:</strong>
              <p className="text-slate-700 leading-relaxed">{activeAudit.momento2.scope}</p>
            </div>
          </div>
        </section>

        {/* 3. METODOLOGÍA Y CRITERIOS APLICADOS */}
        <section className="space-y-3 text-xs">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#0c2340] pb-1 border-b border-slate-200">
            3. Criterios Normativos y Metodología Aplicada
          </h2>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 leading-relaxed text-slate-700 space-y-2">
            <p>
              <strong>Criterios Legales y Técnicos:</strong> {activeAudit.momento2.legalNorms.join(', ')} · {activeAudit.momento2.technicalNorms.join(', ')} · Manual de Funciones Somos Uno.
            </p>
            <p>
              <strong>Metodología Desarrollada:</strong> {activeAudit.momento2.methodology}
            </p>
          </div>
        </section>

        {/* 4. RESULTADOS CONSOLIDADOS DE LA LISTA DE CHEQUEO */}
        <section className="space-y-3 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#0c2340]">
              4. Resultados Consolidados de la Lista de Chequeo (Momento 4)
            </h2>
            <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Índice de Cumplimiento: {complianceScore}%
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
              <span className="block text-[11px] text-emerald-800 font-semibold">Cumple</span>
              <strong className="text-lg text-emerald-900">{cumpleCount}</strong>
            </div>
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded">
              <span className="block text-[11px] text-amber-800 font-semibold">Cumple Parcial</span>
              <strong className="text-lg text-amber-900">{parcialCount}</strong>
            </div>
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded">
              <span className="block text-[11px] text-rose-800 font-semibold">No Cumple</span>
              <strong className="text-lg text-rose-900">{noCumpleCount}</strong>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
              <span className="block text-[11px] text-slate-600 font-semibold">Total Criterios</span>
              <strong className="text-lg text-slate-800">{checkItems.length}</strong>
            </div>
          </div>
        </section>

        {/* 5. CONFORMIDADES DESTACADAS */}
        <section className="space-y-3 text-xs">
          <h2 className="text-sm font-black uppercase tracking-wider text-emerald-800 pb-1 border-b border-emerald-200">
            5. Conformidades y Prácticas Positivas Identificadas
          </h2>
          <div className="space-y-2">
            {activeAudit.momento5.conformidades.map((conf) => (
              <div key={conf.id} className="p-3 bg-emerald-50/40 border border-emerald-200 rounded-lg">
                <strong className="text-emerald-900 font-bold block mb-1">✔ {conf.requirement}</strong>
                <p className="text-slate-700 leading-relaxed">{conf.description}</p>
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">Soporte: {conf.evidence}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. NO CONFORMIDADES DETALLADAS */}
        <section className="space-y-3 text-xs">
          <h2 className="text-sm font-black uppercase tracking-wider text-rose-800 pb-1 border-b border-rose-200">
            6. No Conformidades Identificadas y Fichas de Acción Correctiva
          </h2>
          <div className="space-y-3">
            {activeAudit.momento5.noConformidades.map((nc) => (
              <div key={nc.id} className="p-4 bg-rose-50/40 border border-rose-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-rose-800 bg-rose-200 px-2 py-0.5 rounded">
                    {nc.code} · Riesgo {nc.riskLevel.toUpperCase()}
                  </span>
                  <span className="text-slate-600 font-medium">Plazo compromiso: {nc.commitmentDate}</span>
                </div>
                <p className="text-slate-900 font-bold">1. Hallazgo: {nc.findingWhatWasFound}</p>
                <p className="text-slate-700">2. Norma incumplida: <strong>{nc.breachedNormOrRequirement}</strong></p>
                <p className="text-slate-700">3. Infracción: {nc.howItBreachesNorm}</p>
                <p className="text-slate-700">4. Riesgos: {nc.associatedConsequencesOrRisks}</p>
                <p className="text-emerald-900 bg-white p-2.5 rounded border border-emerald-200">
                  <strong>5. Tratamiento / Acción correctiva propuesta:</strong> {nc.correctiveActionTreatment}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. ANÁLISIS DE RIESGOS */}
        <section className="space-y-3 text-xs">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#0c2340] pb-1 border-b border-slate-200">
            7. Análisis de Riesgos y Gobernanza del Proyecto
          </h2>
          <textarea
            rows={3}
            disabled={!isEditing}
            value={reportData.riskAnalysis}
            onChange={(e) => setReportData({ ...reportData, riskAnalysis: e.target.value })}
            className="w-full text-xs text-slate-800 leading-relaxed p-3 bg-slate-50 border border-slate-200 rounded-lg"
          />
        </section>

        {/* 8. CONCLUSIONES GENERALES */}
        <section className="space-y-3 text-xs">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#0c2340] pb-1 border-b border-slate-200">
            8. Conclusiones Generales
          </h2>
          <div className="space-y-2">
            {reportData.generalConclusions.map((conc, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-[#0c2340] shrink-0">{i + 1}.</span>
                <span className="text-slate-800 leading-relaxed">{conc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 9. RECOMENDACIONES Y CRONOGRAMA */}
        <section className="space-y-3 text-xs">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#0c2340] pb-1 border-b border-slate-200">
            9. Recomendaciones y Asignación de Responsabilidades
          </h2>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Recomendación Institucional</th>
                  <th className="py-2.5 px-3">Responsable</th>
                  <th className="py-2.5 px-3">Prioridad</th>
                  <th className="py-2.5 px-3">Fecha Límite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reportData.recommendations.map((rec) => (
                  <tr key={rec.id}>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{rec.text}</td>
                    <td className="py-2.5 px-3 text-slate-700">{rec.responsible}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                        {rec.priority}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-mono">{rec.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FIRMAS INSTITUCIONALES */}
        <div className="pt-8 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
          <div className="space-y-1">
            <div className="h-16 flex items-end justify-center font-serif italic text-slate-500 pb-1">
              Carlos A. Montoya
            </div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
              {activeAudit.momento1.auditorLider}
            </div>
            <div className="text-[11px] text-slate-500">Auditor Líder Senior</div>
          </div>

          <div className="space-y-1">
            <div className="h-16 flex items-end justify-center font-serif italic text-slate-500 pb-1">
              Roberto Casas C.
            </div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
              Dr. Roberto Casas Cárdenas
            </div>
            <div className="text-[11px] text-slate-500">Coordinador de Auditoría y Control</div>
          </div>

          <div className="space-y-1">
            <div className="h-16 flex items-end justify-center font-serif italic text-slate-500 pb-1">
              Elena Morales O.
            </div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
              Dra. Elena Sofía Morales Ortiz
            </div>
            <div className="text-[11px] text-slate-500">Dirección Administrativa y Ejecutiva</div>
          </div>
        </div>

      </div>
    </div>
  );
};
