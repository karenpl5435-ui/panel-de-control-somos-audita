import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileSpreadsheet,
  Save,
  CheckCircle,
  Send,
  Printer,
  History,
  Plus,
  Trash2,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const Momento2Plan: React.FC = () => {
  const { activeAudit, selectedAuditId, updateAuditMomento, setActiveView, currentUser, showToast } = useApp();

  if (!activeAudit) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [planData, setPlanData] = useState({
    generalObjective: activeAudit.momento2.generalObjective,
    specificObjectives: [...activeAudit.momento2.specificObjectives],
    scope: activeAudit.momento2.scope,
    criteria: [...activeAudit.momento2.criteria],
    legalNorms: [...activeAudit.momento2.legalNorms],
    technicalNorms: [...activeAudit.momento2.technicalNorms],
    methodology: activeAudit.momento2.methodology,
    activities: [...activeAudit.momento2.activities],
    responsibles: activeAudit.momento2.responsibles,
    schedule: activeAudit.momento2.schedule,
    necessaryResources: activeAudit.momento2.necessaryResources,
    requiredDocuments: [...activeAudit.momento2.requiredDocuments],
    executionDate: activeAudit.momento2.executionDate,
    status: activeAudit.momento2.status,
    version: activeAudit.momento2.version
  });

  const [newObj, setNewObj] = useState('');
  const [newDoc, setNewDoc] = useState('');

  const handleSaveDraft = () => {
    updateAuditMomento(selectedAuditId, 'momento2', {
      ...activeAudit.momento2,
      ...planData,
      status: 'Borrador'
    });
    setIsEditing(false);
  };

  const handleSendToReview = () => {
    updateAuditMomento(selectedAuditId, 'momento2', {
      ...activeAudit.momento2,
      ...planData,
      status: 'En revisión'
    });
    showToast('Plan de auditoría enviado para revisión del Coordinador.', 'info');
  };

  const handleApprovePlan = () => {
    updateAuditMomento(selectedAuditId, 'momento2', {
      ...activeAudit.momento2,
      ...planData,
      status: 'Aprobado',
      approvedBy: currentUser.fullName,
      approvedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    });
    showToast('Plan de auditoría APROBADO formalmente. Los datos se trasladan al Momento 3.', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const addSpecificObjective = () => {
    if (!newObj.trim()) return;
    setPlanData({
      ...planData,
      specificObjectives: [...planData.specificObjectives, newObj.trim()]
    });
    setNewObj('');
  };

  const removeSpecificObjective = (index: number) => {
    setPlanData({
      ...planData,
      specificObjectives: planData.specificObjectives.filter((_, i) => i !== index)
    });
  };

  const addRequiredDoc = () => {
    if (!newDoc.trim()) return;
    setPlanData({
      ...planData,
      requiredDocuments: [...planData.requiredDocuments, newDoc.trim()]
    });
    setNewDoc('');
  };

  const removeRequiredDoc = (index: number) => {
    setPlanData({
      ...planData,
      requiredDocuments: planData.requiredDocuments.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Fase 1: Planear (PHVA)</span>
            <span>·</span>
            <span>Momento Obligatorio 2</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MOMENTO 2. PLAN DE AUDITORÍA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Definición técnica de objetivos, alcance, criterios, normas aplicables, metodología, agenda y documentación requerida al Gestor(a).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Descargar PDF / Imprimir</span>
          </button>
          <button
            onClick={() => setActiveView('momento3')}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
          >
            <span>Ir a Momento 3</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2.5 py-1 rounded">
              {activeAudit.code}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
              planData.status === 'Aprobado'
                ? 'bg-emerald-100 text-emerald-800'
                : planData.status === 'En revisión'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-slate-100 text-slate-700'
            }`}>
              Plan {planData.status} · Versión {planData.version}.0
            </span>
            {activeAudit.momento2.approvedBy && (
              <span className="text-[11px] text-slate-500 hidden md:inline">
                Aprobado por: {activeAudit.momento2.approvedBy}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
              >
                Editar Plan
              </button>
            ) : (
              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Borrador</span>
              </button>
            )}

            <button
              onClick={handleSendToReview}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar a Revisión</span>
            </button>

            <button
              onClick={handleApprovePlan}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition shadow-xs"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Aprobar Plan</span>
            </button>
          </div>
        </div>

        {/* Plan Body Sections */}
        <div className="space-y-5 text-xs">
          {/* Objetivo General */}
          <div>
            <label className="block font-bold text-slate-900 mb-1">
              Objetivo General de la Auditoría *
            </label>
            <textarea
              rows={3}
              disabled={!isEditing}
              value={planData.generalObjective}
              onChange={(e) => setPlanData({ ...planData, generalObjective: e.target.value })}
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500/20 leading-relaxed font-medium"
            />
          </div>

          {/* Objetivos Específicos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-900">
                Objetivos Específicos
              </label>
              {isEditing && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="Nuevo objetivo específico..."
                    value={newObj}
                    onChange={(e) => setNewObj(e.target.value)}
                    className="border border-slate-300 px-2 py-1 rounded text-xs w-64"
                  />
                  <button
                    onClick={addSpecificObjective}
                    className="px-2 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-xs font-semibold"
                  >
                    Agregar
                  </button>
                </div>
              )}
            </div>
            <ul className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {planData.specificObjectives.map((obj, i) => (
                <li key={i} className="flex items-start justify-between gap-2 text-slate-700">
                  <span className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold shrink-0">{i + 1}.</span>
                    <span>{obj}</span>
                  </span>
                  {isEditing && (
                    <button
                      onClick={() => removeSpecificObjective(i)}
                      className="text-rose-500 hover:text-rose-700 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Alcance */}
          <div>
            <label className="block font-bold text-slate-900 mb-1">
              Alcance de la Auditoría
            </label>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={planData.scope}
              onChange={(e) => setPlanData({ ...planData, scope: e.target.value })}
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Criterios y Normas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-900 mb-1">
                Normas Legales Aplicables (Colombia)
              </label>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                {planData.legalNorms.map((n, i) => (
                  <div key={i} className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-900 mb-1">
                Normas Técnicas y Criterios Internos
              </label>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                {planData.technicalNorms.map((n, i) => (
                  <div key={i} className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metodología */}
          <div>
            <label className="block font-bold text-slate-900 mb-1">
              Metodología de Auditoría
            </label>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={planData.methodology}
              onChange={(e) => setPlanData({ ...planData, methodology: e.target.value })}
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          {/* Agenda de Actividades */}
          <div>
            <label className="block font-bold text-slate-900 mb-2">
              Cronograma y Agenda de Actividades de Auditoría
            </label>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                  <tr>
                    <th className="py-2 px-3">Actividad Programada</th>
                    <th className="py-2 px-3">Fecha y Hora</th>
                    <th className="py-2 px-3">Responsable</th>
                    <th className="py-2 px-3">Recursos / Lugar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {planData.activities.map((act) => (
                    <tr key={act.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{act.name}</td>
                      <td className="py-2.5 px-3 text-slate-600 tabular-nums">{act.date}</td>
                      <td className="py-2.5 px-3 text-slate-700">{act.responsible}</td>
                      <td className="py-2.5 px-3 text-slate-500">{act.resources}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Documentos Requeridos al Gestor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-900">
                Documentos Requeridos al Gestor(a) Auditado(a)
              </label>
              {isEditing && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="Nuevo documento requerido..."
                    value={newDoc}
                    onChange={(e) => setNewDoc(e.target.value)}
                    className="border border-slate-300 px-2 py-1 rounded text-xs w-64"
                  />
                  <button
                    onClick={addRequiredDoc}
                    className="px-2 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-xs font-semibold"
                  >
                    Agregar
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {planData.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-white rounded border border-slate-200">
                  <span className="text-slate-700 font-medium">📄 {doc}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeRequiredDoc(idx)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-[11px] text-slate-500">
            Al aprobar el plan, los criterios y agenda se sincronizan con el Acta de Apertura (Momento 3).
          </span>
          <button
            onClick={() => setActiveView('momento3')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
          >
            <span>Generar Acta de Apertura (Momento 3)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
