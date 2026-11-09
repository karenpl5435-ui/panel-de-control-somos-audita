import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck,
  Save,
  CheckCircle,
  Printer,
  PenTool,
  Clock,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Plus
} from 'lucide-react';

export const Momento3ActaApertura: React.FC = () => {
  const { activeAudit, selectedAuditId, updateAuditMomento, setActiveView, currentUser, showToast } = useApp();

  if (!activeAudit) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [actaData, setActaData] = useState({
    meetingDate: activeAudit.momento3.meetingDate || activeAudit.momento1.startDate,
    meetingTime: activeAudit.momento3.meetingTime || '09:00 AM',
    modality: activeAudit.momento3.modality || 'Presencial',
    participants: [...activeAudit.momento3.participants],
    confirmedObjective: activeAudit.momento3.confirmedObjective || activeAudit.momento2.generalObjective,
    confirmedScope: activeAudit.momento3.confirmedScope || activeAudit.momento2.scope,
    confirmedCriteria: activeAudit.momento3.confirmedCriteria || activeAudit.momento2.criteria.join(', '),
    confirmedMethodology: activeAudit.momento3.confirmedMethodology || activeAudit.momento2.methodology,
    interviewSchedule: activeAudit.momento3.interviewSchedule || 'Según agenda concertada en el Plan de Auditoría.',
    requestedDocumentsList: [...activeAudit.momento3.requestedDocumentsList],
    observations: activeAudit.momento3.observations || '',
    initialCommitments: [...activeAudit.momento3.initialCommitments],
    status: activeAudit.momento3.status
  });

  const [newParticipant, setNewParticipant] = useState({ name: '', cargo: '', roleInAudit: 'Asistente' });
  const [newCommitment, setNewCommitment] = useState({ commitment: '', responsible: '', deadline: '' });

  const handleSave = () => {
    updateAuditMomento(selectedAuditId, 'momento3', {
      ...activeAudit.momento3,
      ...actaData
    });
    setIsEditing(false);
  };

  const handleApprove = () => {
    updateAuditMomento(selectedAuditId, 'momento3', {
      ...activeAudit.momento3,
      ...actaData,
      status: 'Aprobada',
      approvedBy: currentUser.fullName,
      approvedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    });
    showToast('Acta de Apertura APROBADA y formalizada en el expediente.', 'success');
  };

  const handleSignElectronic = (participantId: string) => {
    const updatedParts = actaData.participants.map((p) => {
      if (p.id === participantId) {
        return {
          ...p,
          signed: true,
          signedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
        };
      }
      return p;
    });
    setActaData({ ...actaData, participants: updatedParts });
    updateAuditMomento(selectedAuditId, 'momento3', {
      ...activeAudit.momento3,
      ...actaData,
      participants: updatedParts
    });
    showToast('Aceptación / firma electrónica registrada exitosamente.', 'success');
  };

  const addParticipant = () => {
    if (!newParticipant.name) return;
    const newP = {
      id: 'p-' + Date.now(),
      name: newParticipant.name,
      cargo: newParticipant.cargo,
      roleInAudit: newParticipant.roleInAudit,
      signed: false
    };
    setActaData({
      ...actaData,
      participants: [...actaData.participants, newP]
    });
    setNewParticipant({ name: '', cargo: '', roleInAudit: 'Asistente' });
  };

  const addCommitment = () => {
    if (!newCommitment.commitment) return;
    const newC = {
      id: 'c-' + Date.now(),
      commitment: newCommitment.commitment,
      responsible: newCommitment.responsible,
      deadline: newCommitment.deadline
    };
    setActaData({
      ...actaData,
      initialCommitments: [...actaData.initialCommitments, newC]
    });
    setNewCommitment({ commitment: '', responsible: '', deadline: '' });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Fase 2: Hacer (PHVA)</span>
            <span>·</span>
            <span>Momento Obligatorio 3</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MOMENTO 3. ACTA DE APERTURA DE LA AUDITORÍA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Formalización del inicio de la auditoría, registro de asistentes, confirmación de metodología y compromisos iniciales con firmas electrónicas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Exportar Acta a PDF</span>
          </button>
          <button
            onClick={() => setActiveView('momento4')}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
          >
            <span>Ir a Lista de Chequeo (Momento 4)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Acta Content Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        {/* Institutional Formal Header */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-center space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Corporación Social Somos Uno · Sistema SOMOS AUDITA
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#0c2340]">
            ACTA FORMAL DE APERTURA DE AUDITORÍA INTERNA
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-600 pt-1">
            <span>Expediente: <strong>{activeAudit.code}</strong></span>
            <span>·</span>
            <span>Fecha Reunión: <strong>{actaData.meetingDate}</strong></span>
            <span>·</span>
            <span>Hora: <strong>{actaData.meetingTime}</strong></span>
            <span>·</span>
            <span>Modalidad: <strong>{actaData.modality}</strong></span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
            actaData.status === 'Aprobada'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800'
          }`}>
            Estado del Acta: {actaData.status}
          </span>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
              >
                Editar Acta
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Acta</span>
              </button>
            )}

            <button
              onClick={handleApprove}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Aprobar y Formalizar Acta</span>
            </button>
          </div>
        </div>

        {/* General Data Pre-Filled */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50/70 p-4 rounded-lg border border-slate-200">
          <div>
            <span className="text-slate-400 block font-semibold">Proyecto Social:</span>
            <span className="font-bold text-slate-900">{activeAudit.momento1.projectName}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Gestor(a) de Proyectos Auditado(a):</span>
            <span className="font-bold text-slate-900">{activeAudit.momento1.gestorName} ({activeAudit.momento1.gestorCargo})</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Auditor Líder Responsable:</span>
            <span className="font-bold text-slate-900">{activeAudit.momento1.auditorLider}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Ubicación Territorial:</span>
            <span className="font-bold text-slate-900">{activeAudit.momento1.gestorLocation}</span>
          </div>
        </div>

        {/* Participants & Signatures */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Participantes y Registro de Aceptación / Firma Electrónica
            </h3>
            {isEditing && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nombre..."
                  value={newParticipant.name}
                  onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                  className="border border-slate-300 px-2 py-1 text-xs rounded"
                />
                <input
                  type="text"
                  placeholder="Cargo..."
                  value={newParticipant.cargo}
                  onChange={(e) => setNewParticipant({ ...newParticipant, cargo: e.target.value })}
                  className="border border-slate-300 px-2 py-1 text-xs rounded"
                />
                <button
                  onClick={addParticipant}
                  className="px-2 py-1 bg-emerald-600 text-white text-xs font-bold rounded"
                >
                  Añadir
                </button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Nombre Asistente</th>
                  <th className="py-2.5 px-3">Cargo Institucional</th>
                  <th className="py-2.5 px-3">Rol en la Auditoría</th>
                  <th className="py-2.5 px-3 text-right">Firma / Aceptación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {actaData.participants.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{p.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{p.cargo}</td>
                    <td className="py-2.5 px-3 text-slate-700">{p.roleInAudit}</td>
                    <td className="py-2.5 px-3 text-right">
                      {p.signed ? (
                        <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Firmado {p.signedAt?.slice(0, 10)}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSignElectronic(p.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded transition shadow-xs"
                        >
                          <PenTool className="w-3 h-3" />
                          <span>Firmar Electrónicamente</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirmed Objective, Scope and Methodology */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-900 mb-1">
              Objetivo Confirmado en la Apertura
            </label>
            <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium leading-relaxed">
              {actaData.confirmedObjective}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-900 mb-1">
                Alcance y Territorio de Revisión
              </label>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed">
                {actaData.confirmedScope}
              </p>
            </div>
            <div>
              <label className="block font-bold text-slate-900 mb-1">
                Criterios y Metodología Acordada
              </label>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed">
                {actaData.confirmedMethodology}
              </p>
            </div>
          </div>

          {/* Requested Documents & Status */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
              Relación de Documentos Solicitados y Plazo de Entrega
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {actaData.requestedDocumentsList.map((doc) => (
                <div key={doc.id} className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800 block">{doc.docName}</span>
                    <span className="text-[11px] text-slate-500">Plazo: {doc.deadline}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doc.status === 'Entregado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Initial Commitments */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Compromisos Iniciales Acordados
              </h3>
              {isEditing && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="Compromiso..."
                    value={newCommitment.commitment}
                    onChange={(e) => setNewCommitment({ ...newCommitment, commitment: e.target.value })}
                    className="border border-slate-300 px-2 py-1 text-xs rounded"
                  />
                  <input
                    type="text"
                    placeholder="Responsable..."
                    value={newCommitment.responsible}
                    onChange={(e) => setNewCommitment({ ...newCommitment, responsible: e.target.value })}
                    className="border border-slate-300 px-2 py-1 text-xs rounded"
                  />
                  <button onClick={addCommitment} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs">
                    Agregar
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {actaData.initialCommitments.map((com) => (
                <div key={com.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-slate-800 font-medium">
                    📌 {com.commitment}
                  </div>
                  <div className="text-slate-500 text-[11px] shrink-0 font-mono">
                    Responsable: {com.responsible} | Límite: {com.deadline}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observations */}
          <div>
            <label className="block font-bold text-slate-900 mb-1">
              Observaciones o Inquietudes de los Participantes
            </label>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={actaData.observations}
              onChange={(e) => setActaData({ ...actaData, observations: e.target.value })}
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-800"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-[11px] text-slate-500">
            Con el acta firmada, el equipo procede formalmente a la aplicación del Momento 4.
          </span>
          <button
            onClick={() => setActiveView('momento4')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
          >
            <span>Diligenciar Lista de Chequeo (Momento 4)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
