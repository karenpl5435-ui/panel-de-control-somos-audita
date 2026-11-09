import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  NonConformity,
  Conformity,
  Finding,
  ImprovementOpportunity,
  PriorityLevel
} from '../types';
import {
  FileSignature,
  Save,
  CheckCircle,
  AlertTriangle,
  Printer,
  PlusCircle,
  Trash2,
  ArrowRight,
  ShieldAlert,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Check
} from 'lucide-react';

export const Momento5ActaCierre: React.FC = () => {
  const { activeAudit, selectedAuditId, updateAuditMomento, setActiveView, currentUser, showToast } = useApp();

  if (!activeAudit) return null;

  const [activeTab, setActiveTab] = useState<'no_conformidades' | 'conformidades' | 'hallazgos' | 'oportunidades' | 'comentarios'>('no_conformidades');
  const [isEditing, setIsEditing] = useState(false);

  const [actaCierreData, setActaCierreData] = useState({
    meetingDate: activeAudit.momento5.meetingDate || activeAudit.momento1.endDate,
    meetingTime: activeAudit.momento5.meetingTime || '02:00 PM',
    status: activeAudit.momento5.status,
    conformidades: [...activeAudit.momento5.conformidades],
    hallazgos: [...activeAudit.momento5.hallazgos],
    oportunidadesMejora: [...activeAudit.momento5.oportunidadesMejora],
    noConformidades: [...activeAudit.momento5.noConformidades],
    gestorGeneralComments: activeAudit.momento5.gestorGeneralComments,
    closingCommitments: [...activeAudit.momento5.closingCommitments]
  });

  // New NC form state
  const [showNewNCModal, setShowNewNCModal] = useState(false);
  const [newNC, setNewNC] = useState<Partial<NonConformity>>({
    code: `NC-0${actaCierreData.noConformidades.length + 1}`,
    date: new Date().toISOString().slice(0, 10),
    findingWhatWasFound: '',
    breachedNormOrRequirement: '',
    howItBreachesNorm: '',
    associatedConsequencesOrRisks: '',
    correctiveActionTreatment: '',
    objectiveEvidence: '',
    identifiedCause: '',
    riskLevel: 'medio',
    consequences: '',
    responsibleToSolve: activeAudit.momento1.gestorName,
    correctiveAction: '',
    commitmentDate: new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10),
    status: 'abierta',
    observations: '',
    gestorClarifications: ''
  });

  // Save changes
  const handleSaveActa = () => {
    updateAuditMomento(selectedAuditId, 'momento5', {
      ...activeAudit.momento5,
      ...actaCierreData
    });
    setIsEditing(false);
  };

  const handleApproveActa = () => {
    updateAuditMomento(selectedAuditId, 'momento5', {
      ...activeAudit.momento5,
      ...actaCierreData,
      status: 'Aprobada',
      approvedBy: currentUser.fullName,
      approvedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    });
    showToast('Acta de Cierre APROBADA formalmente. Se puede generar el Informe de Auditoría (Momento 6).', 'success');
  };

  const handleCreateNC = () => {
    if (!newNC.findingWhatWasFound || !newNC.breachedNormOrRequirement) {
      showToast('Por favor complete las preguntas obligatorias de la No Conformidad.', 'warning');
      return;
    }

    const created: NonConformity = {
      id: 'nc-' + Date.now(),
      code: newNC.code || `NC-0${actaCierreData.noConformidades.length + 1}`,
      date: newNC.date || new Date().toISOString().slice(0, 10),
      findingWhatWasFound: newNC.findingWhatWasFound || '',
      breachedNormOrRequirement: newNC.breachedNormOrRequirement || '',
      howItBreachesNorm: newNC.howItBreachesNorm || '',
      associatedConsequencesOrRisks: newNC.associatedConsequencesOrRisks || '',
      correctiveActionTreatment: newNC.correctiveActionTreatment || '',
      objectiveEvidence: newNC.objectiveEvidence || '',
      identifiedCause: newNC.identifiedCause || '',
      riskLevel: (newNC.riskLevel as PriorityLevel) || 'medio',
      consequences: newNC.consequences || newNC.associatedConsequencesOrRisks || '',
      responsibleToSolve: newNC.responsibleToSolve || activeAudit.momento1.gestorName,
      correctiveAction: newNC.correctiveAction || newNC.correctiveActionTreatment || '',
      commitmentDate: newNC.commitmentDate || new Date().toISOString().slice(0, 10),
      status: 'abierta',
      observations: newNC.observations || '',
      gestorClarifications: newNC.gestorClarifications || ''
    };

    const updatedNCs = [...actaCierreData.noConformidades, created];
    setActaCierreData({ ...actaCierreData, noConformidades: updatedNCs });
    updateAuditMomento(selectedAuditId, 'momento5', {
      ...activeAudit.momento5,
      ...actaCierreData,
      noConformidades: updatedNCs
    });
    setShowNewNCModal(false);
    showToast(`No Conformidad ${created.code} registrada exitosamente.`, 'success');
  };

  const handleDeleteNC = (id: string) => {
    const updated = actaCierreData.noConformidades.filter((nc) => nc.id !== id);
    setActaCierreData({ ...actaCierreData, noConformidades: updated });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Fase 3: Verificar (PHVA)</span>
            <span>·</span>
            <span>Momento Obligatorio 5</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MOMENTO 5. ACTA DE CIERRE DE LA AUDITORÍA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Socialización de resultados de la auditoría: Conformidades, Hallazgos, Oportunidades de Mejora y Fichas de No Conformidad con las cinco preguntas obligatorias.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Descargar Acta PDF</span>
          </button>
          <button
            onClick={() => setActiveView('momento6')}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
          >
            <span>Generar Informe (Momento 6)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Acta Cierre Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        {/* Formal Institutional Heading */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-center space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Corporación Social Somos Uno · Sistema SOMOS AUDITA
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#0c2340]">
            ACTA FORMAL DE CIERRE Y COMUNICACIÓN DE RESULTADOS
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-600 pt-1">
            <span>Auditoría: <strong>{activeAudit.code}</strong></span>
            <span>·</span>
            <span>Proyecto: <strong>{activeAudit.momento1.projectName}</strong></span>
            <span>·</span>
            <span>Gestor(a): <strong>{activeAudit.momento1.gestorName}</strong></span>
            <span>·</span>
            <span>Fecha Cierre: <strong>{actaCierreData.meetingDate}</strong></span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
              actaCierreData.status === 'Aprobada'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              Estado: {actaCierreData.status}
            </span>
            <span className="text-xs text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              {actaCierreData.noConformidades.length} No Conformidades
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNewNCModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-xs transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Registrar No Conformidad</span>
            </button>

            <button
              onClick={handleSaveActa}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Acta</span>
            </button>

            <button
              onClick={handleApproveActa}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Aprobar Acta de Cierre</span>
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'no_conformidades', label: `No Conformidades (${actaCierreData.noConformidades.length})`, countColor: 'bg-rose-600 text-white' },
            { id: 'conformidades', label: `A. Conformidades (${actaCierreData.conformidades.length})`, countColor: 'bg-emerald-600 text-white' },
            { id: 'hallazgos', label: `B. Hallazgos (${actaCierreData.hallazgos.length})`, countColor: 'bg-blue-600 text-white' },
            { id: 'oportunidades', label: `C. Oportunidades de Mejora (${actaCierreData.oportunidadesMejora.length})`, countColor: 'bg-amber-600 text-white' },
            { id: 'comentarios', label: 'Comentarios del Gestor y Compromisos', countColor: 'bg-slate-600 text-white' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#0c2340] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: NO CONFORMIDADES (The 5 Mandatory Questions!) */}
        {activeTab === 'no_conformidades' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 leading-relaxed">
              <strong>Estructura Metodológica Obligatoria:</strong> Cada No Conformidad responde a cabalidad las 5 preguntas fundamentales de auditoría: 
              1) Hallazgo y qué se encontró, 2) Norma o requisito incumplido, 3) Cómo se incumple, 4) Consecuencias y riesgos, y 5) Tratamiento y acción correctiva.
            </div>

            {actaCierreData.noConformidades.map((nc) => (
              <div
                key={nc.id}
                className="bg-white border-2 border-rose-200 rounded-xl p-5 shadow-xs space-y-4 relative"
              >
                {/* Header of NC card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-rose-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm bg-rose-600 text-white px-2.5 py-0.5 rounded">
                      {nc.code}
                    </span>
                    <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
                      nc.riskLevel === 'alto'
                        ? 'bg-rose-100 text-rose-800'
                        : nc.riskLevel === 'medio'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      Riesgo {nc.riskLevel}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      Fecha: {nc.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                      nc.status === 'cerrada'
                        ? 'bg-emerald-100 text-emerald-800'
                        : nc.status === 'en_tratamiento'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      Estado: {nc.status}
                    </span>
                    <button
                      onClick={() => handleDeleteNC(nc.id)}
                      className="text-rose-400 hover:text-rose-700 p-1"
                      title="Eliminar No Conformidad"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* THE 5 MANDATORY QUESTIONS DISPLAY */}
                <div className="space-y-3 text-xs">
                  {/* Pregunta 1 */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-900 block mb-0.5">
                      1. ¿Cuál fue el hallazgo y qué fue lo que se encontró?
                    </span>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {nc.findingWhatWasFound}
                    </p>
                    {nc.objectiveEvidence && (
                      <p className="mt-1.5 text-[11px] text-slate-500 font-mono">
                        Evidencia objetiva: {nc.objectiveEvidence}
                      </p>
                    )}
                  </div>

                  {/* Pregunta 2 */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-900 block mb-0.5">
                      2. ¿Qué norma o requisito se incumplió?
                    </span>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {nc.breachedNormOrRequirement}
                    </p>
                  </div>

                  {/* Pregunta 3 */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-900 block mb-0.5">
                      3. ¿Cómo se está violando esa norma?
                    </span>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {nc.howItBreachesNorm}
                    </p>
                  </div>

                  {/* Pregunta 4 */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-900 block mb-0.5">
                      4. ¿Cuáles son las posibles consecuencias o riesgos asociados?
                    </span>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {nc.associatedConsequencesOrRisks}
                    </p>
                  </div>

                  {/* Pregunta 5 */}
                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg">
                    <span className="font-bold text-emerald-950 block mb-0.5">
                      5. ¿Qué se debe hacer para solucionar la no conformidad? (Tratamiento y Acción Correctiva)
                    </span>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {nc.correctiveActionTreatment}
                    </p>
                    <div className="mt-2 pt-2 border-t border-emerald-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                      <span>Responsable de Solucionar: <strong className="text-slate-900">{nc.responsibleToSolve}</strong></span>
                      <span>Fecha de Compromiso: <strong className="text-slate-900 font-mono">{nc.commitmentDate}</strong></span>
                    </div>
                  </div>

                  {/* Clarificaciones y Comentarios del Gestor Auditado */}
                  {nc.gestorClarifications && (
                    <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg">
                      <span className="font-bold text-blue-900 block mb-0.5 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
                        Comentarios y Aclaraciones del Gestor(a) Auditado(a):
                      </span>
                      <p className="text-slate-800 italic leading-relaxed text-xs">
                        "{nc.gestorClarifications}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CONFORMIDADES */}
        {activeTab === 'conformidades' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Aspectos y actividades que cumplen cabalmente con los requisitos legales, técnicos e institucionales.
            </p>
            {actaCierreData.conformidades.map((c) => (
              <div key={c.id} className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-slate-900 text-sm">{c.requirement}</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">{c.description}</p>
                <div className="text-[11px] text-slate-500 pt-1 font-mono">
                  Evidencia: {c.evidence}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: HALLAZGOS */}
        {activeTab === 'hallazgos' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Situaciones relevantes identificadas durante el proceso de auditoría y contrastadas con evidencia objetiva.
            </p>
            {actaCierreData.hallazgos.map((h) => (
              <div key={h.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{h.description}</span>
                  <span className="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {h.area}
                  </span>
                </div>
                <p className="text-slate-600 font-mono text-[11px]">Evidencia: {h.objectiveEvidence}</p>
                <p className="text-slate-500 text-[11px]">Criterio relacionado: {h.criterion}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: OPORTUNIDADES DE MEJORA */}
        {activeTab === 'oportunidades' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Recomendaciones técnicas para fortalecer el desempeño del gestor sin constituir necesariamente incumplimiento.
            </p>
            {actaCierreData.oportunidadesMejora.map((om) => (
              <div key={om.id} className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-slate-900 text-sm">{om.opportunity}</span>
                </div>
                <p className="text-slate-800 leading-relaxed font-medium">{om.recommendation}</p>
                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-amber-200/50">
                  <span>Situación: {om.situation}</span>
                  <span>Responsable: <strong>{om.responsible}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: COMENTARIOS Y COMPROMISOS */}
        {activeTab === 'comentarios' && (
          <div className="space-y-5 text-xs">
            <div>
              <label className="block font-bold text-slate-900 mb-1">
                Comentarios Generales y Aclaraciones del Gestor(a) de Proyectos Auditado(a)
              </label>
              <textarea
                rows={4}
                value={actaCierreData.gestorGeneralComments}
                onChange={(e) => setActaCierreData({ ...actaCierreData, gestorGeneralComments: e.target.value })}
                placeholder="El gestor auditado puede registrar sus apreciaciones sobre el desarrollo de la auditoría..."
                className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-800 leading-relaxed"
              />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-2">
                Compromisos de Cierre y Cronograma de Subsanación
              </h3>
              <div className="space-y-2">
                {actaCierreData.closingCommitments.map((c) => (
                  <div key={c.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-medium text-slate-800">✅ {c.commitment}</span>
                    <span className="text-[11px] text-slate-500 font-mono shrink-0">
                      Responsable: {c.responsible} | Límite: {c.deadline}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-[11px] text-slate-500">
            Con el Acta de Cierre aprobada, se alimenta automáticamente el Informe de Auditoría (Momento 6).
          </span>
          <button
            onClick={() => setActiveView('momento6')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
          >
            <span>Generar Informe Consolidado (Momento 6)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modal for Creating New Non-Conformity */}
      {showNewNCModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Registrar Ficha de No Conformidad ({newNC.code})
                </h3>
              </div>
              <button onClick={() => setShowNewNCModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Código de No Conformidad</label>
                  <input
                    type="text"
                    value={newNC.code}
                    onChange={(e) => setNewNC({ ...newNC, code: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nivel de Riesgo</label>
                  <select
                    value={newNC.riskLevel}
                    onChange={(e) => setNewNC({ ...newNC, riskLevel: e.target.value as any })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5 capitalize"
                  >
                    <option value="alto">Alto</option>
                    <option value="medio">Medio</option>
                    <option value="bajo">Bajo</option>
                  </select>
                </div>
              </div>

              {/* 5 Mandatory Questions Inputs */}
              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  1. ¿Cuál fue el hallazgo y qué fue lo que se encontró? *
                </label>
                <textarea
                  rows={2}
                  value={newNC.findingWhatWasFound}
                  onChange={(e) => setNewNC({ ...newNC, findingWhatWasFound: e.target.value })}
                  placeholder="Describa la situación concreta observada..."
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  2. ¿Qué norma o requisito se incumplió? *
                </label>
                <input
                  type="text"
                  value={newNC.breachedNormOrRequirement}
                  onChange={(e) => setNewNC({ ...newNC, breachedNormOrRequirement: e.target.value })}
                  placeholder="Citar artículo, ley o numeral de procedimiento..."
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  3. ¿Cómo se está violando esa norma? *
                </label>
                <textarea
                  rows={2}
                  value={newNC.howItBreachesNorm}
                  onChange={(e) => setNewNC({ ...newNC, howItBreachesNorm: e.target.value })}
                  placeholder="Explique la contradicción entre lo encontrado y el requisito..."
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  4. ¿Cuáles son las posibles consecuencias o riesgos asociados? *
                </label>
                <textarea
                  rows={2}
                  value={newNC.associatedConsequencesOrRisks}
                  onChange={(e) => setNewNC({ ...newNC, associatedConsequencesOrRisks: e.target.value })}
                  placeholder="Efectos sobre beneficiarios, recursos, plazos o reputación..."
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  5. ¿Qué se debe hacer para solucionar la no conformidad? *
                </label>
                <textarea
                  rows={2}
                  value={newNC.correctiveActionTreatment}
                  onChange={(e) => setNewNC({ ...newNC, correctiveActionTreatment: e.target.value })}
                  placeholder="Propuesta de acción correctiva y tratamiento para corregir..."
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Responsable de Solucionar</label>
                  <input
                    type="text"
                    value={newNC.responsibleToSolve}
                    onChange={(e) => setNewNC({ ...newNC, responsibleToSolve: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fecha Límite Compromiso</label>
                  <input
                    type="date"
                    value={newNC.commitmentDate}
                    onChange={(e) => setNewNC({ ...newNC, commitmentDate: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Aclaraciones o Comentarios del Gestor</label>
                <textarea
                  rows={2}
                  value={newNC.gestorClarifications}
                  onChange={(e) => setNewNC({ ...newNC, gestorClarifications: e.target.value })}
                  placeholder="Respuesta formal del auditado..."
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowNewNCModal(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateNC}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Guardar No Conformidad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
