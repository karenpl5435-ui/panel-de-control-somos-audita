import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobFunctionItem } from '../types';
import {
  BookOpen,
  Printer,
  Save,
  PlusCircle,
  Trash2,
  Edit2,
  CheckCircle,
  FileCheck,
  Upload,
  ArrowRight,
  ShieldCheck,
  History
} from 'lucide-react';

export const ManualFuncionesView: React.FC = () => {
  const { jobManual, updateJobManual, setActiveView, currentUser, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [functions, setFunctions] = useState<JobFunctionItem[]>([...jobManual.specificFunctions]);
  const [newFunction, setNewFunction] = useState<Partial<JobFunctionItem>>({
    title: '',
    description: '',
    verificationGuideline: '',
    category: 'Planeación'
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSaveManual = () => {
    updateJobManual({
      ...jobManual,
      specificFunctions: functions
    });
    setIsEditing(false);
  };

  const handleAddFunction = () => {
    if (!newFunction.title || !newFunction.description) {
      showToast('Por favor diligencie el título y la descripción.', 'warning');
      return;
    }
    const created: JobFunctionItem = {
      id: 'fn-' + Date.now(),
      number: functions.length + 1,
      title: newFunction.title,
      description: newFunction.description,
      verificationGuideline: newFunction.verificationGuideline || 'Verificar evidencias en archivo físico y digital.',
      category: newFunction.category || 'Planeación',
      status: 'Aprobada Oficial'
    };
    const updated = [...functions, created];
    setFunctions(updated);
    updateJobManual({ ...jobManual, specificFunctions: updated });
    setShowAddModal(false);
    setNewFunction({ title: '', description: '', verificationGuideline: '', category: 'Planeación' });
    showToast(`Función N° ${created.number} agregada al manual.`, 'success');
  };

  const handleDeleteFunction = (id: string) => {
    const updated = functions.filter((f) => f.id !== id);
    setFunctions(updated);
    updateJobManual({ ...jobManual, specificFunctions: updated });
    showToast('Función eliminada del manual.', 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Actions */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Gestión Documental e Institucional</span>
            <span>·</span>
            <span>Versión Oficial 2.0</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MANUAL DE FUNCIONES Y PERFIL DEL CARGO
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Definición oficial de responsabilidades, competencias laborales y criterios de auditoría para el cargo de <strong>Gestor(a) de Proyectos para Sectores Vulnerables</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Crear Función</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Descargar Manual PDF</span>
          </button>

          <button
            onClick={() => setActiveView('momento4')}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
          >
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Verificar en Lista de Chequeo</span>
          </button>
        </div>
      </div>

      {/* Main Manual Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        
        {/* Identificación del Cargo */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 pb-1 border-b border-slate-200">
            I. Identificación del Cargo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block font-semibold">Nombre del Cargo:</span>
              <strong className="text-slate-900 text-sm">{jobManual.jobTitle}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Área / Dependencia:</span>
              <strong className="text-slate-800">{jobManual.department}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Jefe Inmediato:</span>
              <strong className="text-slate-800">{jobManual.immediateSupervisor}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Nivel Jerárquico:</span>
              <strong className="text-slate-800">{jobManual.jobLevel}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Ubicación Territorial:</span>
              <strong className="text-slate-800">{jobManual.location}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Versión Aprobada:</span>
              <strong className="text-emerald-800 font-mono">{jobManual.version}</strong>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs">
            <span className="font-bold text-blue-900 block mb-1">Objetivo Principal del Cargo:</span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {jobManual.mainObjective}
            </p>
          </div>
        </section>

        {/* Funciones Generales */}
        <section className="space-y-3 text-xs">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 pb-1 border-b border-slate-200">
            II. Funciones Generales
          </h2>
          <div className="space-y-2">
            {jobManual.generalFunctions.map((fn, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-5 h-5 rounded-full bg-[#0c2340] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  {idx + 1}
                </span>
                <span className="text-slate-800 leading-relaxed font-medium">{fn}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Funciones Específicas (Las 14 funciones interactivas) */}
        <section className="space-y-3 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              III. Funciones Específicas del Cargo ({functions.length} funciones catalogadas)
            </h2>
            <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Articulado con el Momento 4 de SOMOS AUDITA
            </span>
          </div>

          <div className="space-y-3">
            {functions.map((fn) => (
              <div key={fn.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold bg-[#0c2340] text-white px-2 py-0.5 rounded text-[11px]">
                      N° {fn.number}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{fn.title}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                      {fn.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteFunction(fn.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Eliminar función"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed font-medium pl-8">
                  {fn.description}
                </p>

                <div className="ml-8 p-2 bg-emerald-50/50 border border-emerald-200 rounded text-[11px] text-emerald-900 flex items-center justify-between">
                  <span><strong>Criterio para Auditoría:</strong> {fn.verificationGuideline}</span>
                  <button
                    onClick={() => setActiveView('momento4')}
                    className="font-bold underline text-emerald-700 text-[10px] hover:text-emerald-900"
                  >
                    Verificar en Momento 4 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Perfil del Cargo */}
        <section className="space-y-3 text-xs">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 pb-1 border-b border-slate-200">
            IV. Perfil y Competencias Laborales Requeridas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 block">Formación Académica Requerida:</span>
              <p className="text-slate-700 leading-relaxed">{jobManual.profile.education}</p>

              <span className="font-bold text-slate-900 block pt-2">Experiencia Laboral Comprobable:</span>
              <p className="text-slate-700 leading-relaxed">{jobManual.profile.experience}</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 block">Habilidades Clave de Liderazgo:</span>
              <ul className="space-y-1 text-slate-700">
                <li><strong>Comunicación:</strong> {jobManual.profile.skills.communication}</li>
                <li><strong>Liderazgo:</strong> {jobManual.profile.skills.leadership}</li>
                <li><strong>Trabajo en Equipo:</strong> {jobManual.profile.skills.teamwork}</li>
                <li><strong>Planeación y Organización:</strong> {jobManual.profile.skills.planning}</li>
                <li><strong>Responsabilidad Ética:</strong> {jobManual.profile.skills.responsibility}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Responsabilidades por Área */}
        <section className="space-y-3 text-xs">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 pb-1 border-b border-slate-200">
            V. Matriz de Responsabilidades
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-[#0c2340] block mb-1">Administrativas</span>
              <p className="text-slate-600 leading-relaxed">{jobManual.responsibilities.administrative}</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-[#0c2340] block mb-1">Operativas en Campo</span>
              <p className="text-slate-600 leading-relaxed">{jobManual.responsibilities.operational}</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-[#0c2340] block mb-1">Financieras / Presupuesto</span>
              <p className="text-slate-600 leading-relaxed">{jobManual.responsibilities.financial}</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-[#0c2340] block mb-1">Documentales y Custodia</span>
              <p className="text-slate-600 leading-relaxed">{jobManual.responsibilities.documentary}</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-[#0c2340] block mb-1">Comunitarias y de Protección</span>
              <p className="text-slate-600 leading-relaxed">{jobManual.responsibilities.community}</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-[#0c2340] block mb-1">Seguimiento y Evaluación</span>
              <p className="text-slate-600 leading-relaxed">{jobManual.responsibilities.monitoringEvaluation}</p>
            </div>
          </div>
        </section>

      </div>

      {/* Modal to Add New Function */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Crear Nueva Función para el Gestor(a)
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Título de la Función *</label>
                <input
                  type="text"
                  placeholder="Ej. Coordinar mesas técnicas interinstitucionales..."
                  value={newFunction.title}
                  onChange={(e) => setNewFunction({ ...newFunction, title: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Categoría</label>
                <select
                  value={newFunction.category}
                  onChange={(e) => setNewFunction({ ...newFunction, category: e.target.value as any })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                >
                  <option value="Planeación">Planeación</option>
                  <option value="Ejecución">Ejecución</option>
                  <option value="Seguimiento">Seguimiento</option>
                  <option value="Documentación">Documentación</option>
                  <option value="Comunidad">Comunidad</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Descripción Detallada *</label>
                <textarea
                  rows={3}
                  placeholder="Describa el alcance exacto de la responsabilidad..."
                  value={newFunction.description}
                  onChange={(e) => setNewFunction({ ...newFunction, description: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Criterio de Verificación para Auditoría</label>
                <input
                  type="text"
                  placeholder="Ej. Revisar actas mensuales y firmas de asistencia..."
                  value={newFunction.verificationGuideline}
                  onChange={(e) => setNewFunction({ ...newFunction, verificationGuideline: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddFunction}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700"
              >
                Guardar Función
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
