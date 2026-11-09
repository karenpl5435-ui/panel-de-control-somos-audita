import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PriorityLevel, AuditReason } from '../types';
import {
  CalendarDays,
  Save,
  CheckCircle,
  Trash2,
  UserCheck,
  Search,
  PlusCircle,
  FileText,
  AlertCircle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const Momento1Programacion: React.FC = () => {
  const {
    activeAudit,
    selectedAuditId,
    updateAuditMomento,
    deleteAudit,
    createAudit,
    setActiveView,
    currentUser,
    users,
    showToast
  } = useApp();

  const [formData, setFormData] = useState({
    projectName: activeAudit?.momento1.projectName || '',
    projectCode: activeAudit?.momento1.projectCode || '',
    gestorName: activeAudit?.momento1.gestorName || '',
    gestorCargo: activeAudit?.momento1.gestorCargo || '',
    gestorArea: activeAudit?.momento1.gestorArea || '',
    gestorLocation: activeAudit?.momento1.gestorLocation || '',
    dateProgrammed: activeAudit?.momento1.dateProgrammed || '',
    startDate: activeAudit?.momento1.startDate || '',
    endDate: activeAudit?.momento1.endDate || '',
    reason: activeAudit?.momento1.reason || ('programada' as AuditReason),
    auditorLider: activeAudit?.momento1.auditorLider || '',
    auditoresApoyoText: activeAudit?.momento1.auditoresApoyo?.join(', ') || '',
    priority: activeAudit?.momento1.priority || ('media' as PriorityLevel),
    priorityJustification: activeAudit?.momento1.priorityJustification || '',
    programmingStatus: activeAudit?.momento1.programmingStatus || 'Programada'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Sync if selected audit changes
  React.useEffect(() => {
    if (activeAudit) {
      setFormData({
        projectName: activeAudit.momento1.projectName,
        projectCode: activeAudit.momento1.projectCode,
        gestorName: activeAudit.momento1.gestorName,
        gestorCargo: activeAudit.momento1.gestorCargo,
        gestorArea: activeAudit.momento1.gestorArea,
        gestorLocation: activeAudit.momento1.gestorLocation,
        dateProgrammed: activeAudit.momento1.dateProgrammed,
        startDate: activeAudit.momento1.startDate,
        endDate: activeAudit.momento1.endDate,
        reason: activeAudit.momento1.reason,
        auditorLider: activeAudit.momento1.auditorLider,
        auditoresApoyoText: activeAudit.momento1.auditoresApoyo?.join(', ') || '',
        priority: activeAudit.momento1.priority,
        priorityJustification: activeAudit.momento1.priorityJustification,
        programmingStatus: activeAudit.momento1.programmingStatus
      });
      setIsEditing(false);
    }
  }, [activeAudit?.id]);

  if (!activeAudit) return null;

  const handleSave = () => {
    const updatedMomento1 = {
      ...activeAudit.momento1,
      ...formData,
      auditoresApoyo: formData.auditoresApoyoText
        ? formData.auditoresApoyoText.split(',').map((s) => s.trim())
        : []
    };
    updateAuditMomento(selectedAuditId, 'momento1', updatedMomento1);
    setIsEditing(false);
  };

  const handleApproveProgramming = () => {
    const approvedMomento1 = {
      ...activeAudit.momento1,
      ...formData,
      auditoresApoyo: formData.auditoresApoyoText
        ? formData.auditoresApoyoText.split(',').map((s) => s.trim())
        : [],
      programmingStatus: 'Aprobada' as const,
      approvedBy: currentUser.fullName,
      approvedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    updateAuditMomento(selectedAuditId, 'momento1', approvedMomento1);
    showToast('Programación aprobada formalmente. Ahora puede estructurar el Momento 2: Plan de Auditoría.', 'success');
  };

  const handleNewAudit = () => {
    createAudit({
      projectName: 'Nuevo Proyecto de Intervención Social',
      gestorName: 'Lic. Valentina Restrepo Salazar',
      gestorLocation: 'Medellín, Antioquia'
    });
  };

  const handleDelete = () => {
    deleteAudit(selectedAuditId);
    setShowConfirmDelete(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Momento Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Fase 1: Planear (PHVA)</span>
            <span>·</span>
            <span>Obligatorio</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MOMENTO 1. PROGRAMACIÓN DE LA AUDITORÍA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Definición formal del proyecto social a auditar, designación del equipo auditor, establecimiento de cronograma y justificación de riesgos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleNewAudit}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nueva Programación</span>
          </button>
          <button
            onClick={() => setActiveView('momento2')}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
          >
            <span>Ir a Momento 2</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2.5 py-1 rounded">
              {activeAudit.code}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
              formData.programmingStatus === 'Aprobada'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              Estado: {formData.programmingStatus}
            </span>
            {activeAudit.momento1.approvedBy && (
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Aprobado por: {activeAudit.momento1.approvedBy}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
              >
                Editar Programación
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Cambios</span>
              </button>
            )}

            <button
              onClick={handleApproveProgramming}
              disabled={formData.programmingStatus === 'Aprobada'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-lg transition"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Aprobar Programación</span>
            </button>

            <button
              onClick={() => setShowConfirmDelete(true)}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
              title="Eliminar con autorización"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showConfirmDelete && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
              <AlertCircle className="w-4 h-4" />
              ¿Confirma la eliminación de esta programación de auditoría?
            </div>
            <p className="text-xs text-rose-700">
              Esta acción eliminará el expediente {activeAudit.code}. Solo se permite con autorización administrativa.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded hover:bg-rose-700"
              >
                Sí, Confirmar Eliminación
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-medium rounded hover:bg-slate-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Código Automático de Auditoría
            </label>
            <input
              type="text"
              readOnly
              value={activeAudit.code}
              className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 font-mono text-slate-700 font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Código del Proyecto Social
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.projectCode}
              onChange={(e) => setFormData({ ...formData, projectCode: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">
              Nombre del Proyecto Social *
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              placeholder="Ej. Proyecto Semillas de Esperanza..."
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nombre del Gestor(a) Auditado(a) *
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.gestorName}
              onChange={(e) => setFormData({ ...formData, gestorName: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Cargo del Titular
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.gestorCargo}
              onChange={(e) => setFormData({ ...formData, gestorCargo: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Área o Dependencia
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.gestorArea}
              onChange={(e) => setFormData({ ...formData, gestorArea: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Ubicación Territorial del Proyecto (Comunidad / Sector)
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.gestorLocation}
              onChange={(e) => setFormData({ ...formData, gestorLocation: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Fecha de Programación
            </label>
            <input
              type="date"
              disabled={!isEditing}
              value={formData.dateProgrammed}
              onChange={(e) => setFormData({ ...formData, dateProgrammed: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Fecha Prevista Inicio
              </label>
              <input
                type="date"
                disabled={!isEditing}
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Fecha Finalización
              </label>
              <input
                type="date"
                disabled={!isEditing}
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Motivo de la Auditoría
            </label>
            <select
              disabled={!isEditing}
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value as AuditReason })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 capitalize"
            >
              <option value="programada">Programada periódica</option>
              <option value="seguimiento">Seguimiento a planes anteriores</option>
              <option value="especial">Especial por requerimiento de dirección</option>
              <option value="situacion_identificada">Por situación o alerta identificada</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Auditor Líder Asignado
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.auditorLider}
              onChange={(e) => setFormData({ ...formData, auditorLider: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">
              Auditores de Apoyo (separados por coma)
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.auditoresApoyoText}
              onChange={(e) => setFormData({ ...formData, auditoresApoyoText: e.target.value })}
              placeholder="Dra. Mariana Gómez Vélez, Lic. Jorge Ramos..."
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nivel de Prioridad / Riesgo
            </label>
            <select
              disabled={!isEditing}
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as PriorityLevel })}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 capitalize"
            >
              <option value="alta">Alta (Población vulnerable prioritaria)</option>
              <option value="media">Media (Proyectos regulares en ejecución)</option>
              <option value="baja">Baja (Revisión ordinaria de cierre)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">
              Justificación de la Prioridad / Nivel de Riesgo
            </label>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={formData.priorityJustification}
              onChange={(e) => setFormData({ ...formData, priorityJustification: e.target.value })}
              placeholder="Describa por qué se clasifica en este nivel de riesgo (número de beneficiarios, recursos, alertas)..."
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <p className="text-[11px] text-slate-500">
            Los datos guardados alimentan automáticamente el calendario y se trasladan al Momento 2.
          </p>

          <div className="flex items-center gap-2">
            {isEditing && (
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Programación</span>
              </button>
            )}
            <button
              onClick={() => setActiveView('momento2')}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
            >
              <span>Elaborar Plan (Momento 2)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
