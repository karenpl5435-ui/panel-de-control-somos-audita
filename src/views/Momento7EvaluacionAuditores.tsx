import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AuditorEvaluation } from '../types';
import {
  Award,
  Save,
  CheckCircle,
  Printer,
  Star,
  PlusCircle,
  TrendingUp,
  UserCheck,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

const EVAL_CRITERIA: { key: keyof AuditorEvaluation['ratings']; label: string; desc: string }[] = [
  { key: 'conocimientoNormas', label: '1. Conocimiento de las Normas', desc: 'Dominio de ISO 19011, Ley 1581, Constitución y marco de proyectos sociales' },
  { key: 'preparacion', label: '2. Preparación Previa', desc: 'Estudio de antecedentes territoriales, marco lógico e instrumentos antes de campo' },
  { key: 'organizacion', label: '3. Organización y Método', desc: 'Estructuración metódica de listas de cotejo, agenda y manejo del tiempo' },
  { key: 'responsabilidad', label: '4. Responsabilidad', desc: 'Cumplimiento diligente y esmerado de las funciones asignadas en la auditoría' },
  { key: 'puntualidad', label: '5. Puntualidad', desc: 'Respeto riguroso de horarios en reuniones de apertura, visitas y comités' },
  { key: 'comunicacion', label: '6. Comunicación Asertiva', desc: 'Claridad al explicar el proceso, formular preguntas y escuchar al gestor auditado' },
  { key: 'imparcialidad', label: '7. Imparcialidad', desc: 'Ausencia de sesgos o conflictos de interés personales o laborales' },
  { key: 'objetividad', label: '8. Objetividad', desc: 'Conclusiones y juicios basados exclusivamente en evidencias fácticas verificables' },
  { key: 'manejoEvidencias', label: '9. Manejo de Evidencias', desc: 'Capacidad de cotejar registros, fotos autorizadas y documentos soportes' },
  { key: 'identificacionHallazgos', label: '10. Identificación de Hallazgos', desc: 'Precisión técnica al redactar conformidades y no conformidades con causa raíz' },
  { key: 'elaboracionInformes', label: '11. Elaboración de Informes', desc: 'Claridad, coherencia técnica, síntesis ejecutiva y rigor probatorio en el informe' },
  { key: 'confidencialidad', label: '12. Confidencialidad y Trato Respetuoso', desc: 'Reserva absoluta de datos de menores y trato empático con comunidades vulnerables' },
  { key: 'trabajoEquipo', label: '13. Trabajo en Equipo', desc: 'Sinergia colaborativa con auditores de apoyo, coordinación y personal de campo' }
];

export const Momento7EvaluacionAuditores: React.FC = () => {
  const { activeAudit, selectedAuditId, updateAuditMomento, setActiveView, currentUser, showToast } = useApp();

  if (!activeAudit) return null;

  const [evaluations, setEvaluations] = useState<AuditorEvaluation[]>([
    ...activeAudit.momento7.evaluations
  ]);
  const [selectedEvalIndex, setSelectedEvalIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const currentEval = evaluations[selectedEvalIndex] || evaluations[0];

  const handleRatingChange = (key: keyof AuditorEvaluation['ratings'], val: number) => {
    if (!currentEval) return;
    const updatedRatings = { ...currentEval.ratings, [key]: val };
    const values = Object.values(updatedRatings);
    const avg = Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2));

    const updated = evaluations.map((ev, i) =>
      i === selectedEvalIndex
        ? {
            ...ev,
            ratings: updatedRatings,
            averageScore: avg
          }
        : ev
    );
    setEvaluations(updated);
  };

  const handleFieldChange = (field: keyof AuditorEvaluation, value: any) => {
    const updated = evaluations.map((ev, i) =>
      i === selectedEvalIndex ? { ...ev, [field]: value } : ev
    );
    setEvaluations(updated);
  };

  const handleSaveEvaluations = () => {
    updateAuditMomento(selectedAuditId, 'momento7', {
      evaluations,
      status: 'Completada',
      completedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    });
    setIsEditing(false);
    showToast('Evaluaciones de auditores guardadas exitosamente.', 'success');
  };

  const handleAddNewAuditorEval = () => {
    const newEval: AuditorEvaluation = {
      id: 'eval-' + Date.now(),
      auditorId: 'usr-new',
      auditorName: 'Nuevo Auditor Evaluado',
      role: 'Auditor de Apoyo',
      ratings: {
        conocimientoNormas: 4,
        preparacion: 4,
        organizacion: 4,
        responsabilidad: 5,
        puntualidad: 4,
        comunicacion: 4,
        imparcialidad: 5,
        objetividad: 4,
        manejoEvidencias: 4,
        identificacionHallazgos: 4,
        elaboracionInformes: 4,
        confidencialidad: 5,
        trabajoEquipo: 4
      },
      averageScore: 4.23,
      strengths: 'Compromiso profesional y rigurosidad metodológica.',
      areasForImprovement: 'Mayor agilidad en la digitalización de evidencias.',
      observations: 'Evaluación de desempeño satisfactoria.',
      trainingRecommendations: 'Curso de profundización en muestreo de proyectos sociales.',
      evaluatedBy: currentUser.fullName,
      evaluationDate: new Date().toISOString().slice(0, 10)
    };
    const updated = [...evaluations, newEval];
    setEvaluations(updated);
    setSelectedEvalIndex(updated.length - 1);
    setIsEditing(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Fase 4: Actuar (PHVA)</span>
            <span>·</span>
            <span>Momento Obligatorio 7</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MOMENTO 7. EVALUACIÓN DE LOS AUDITORES
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Valoración objetiva del desempeño, idoneidad, imparcialidad y rigor ético del equipo auditor bajo escala de 1 a 5, identificando fortalezas y planes de capacitación.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Evaluación</span>
          </button>
          <button
            onClick={() => setActiveView('ciclo_phva')}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
          >
            <span>Ver Ciclo PHVA y Cierre</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        {/* Auditor Selector Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto">
            {evaluations.map((ev, idx) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEvalIndex(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedEvalIndex === idx
                    ? 'bg-[#0c2340] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{ev.auditorName}</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
                  {ev.averageScore} / 5.0
                </span>
              </button>
            ))}

            <button
              onClick={handleAddNewAuditorEval}
              className="px-2.5 py-1.5 text-xs text-emerald-700 font-bold hover:bg-emerald-50 rounded-lg border border-dashed border-emerald-300"
            >
              + Evaluar Otro Auditor
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
              >
                Editar Calificaciones
              </button>
            ) : (
              <button
                onClick={handleSaveEvaluations}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Evaluaciones</span>
              </button>
            )}
          </div>
        </div>

        {/* Selected Auditor Header Strip */}
        {currentEval && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Auditor en Evaluación
              </span>
              <h2 className="text-base font-black text-slate-900">{currentEval.auditorName}</h2>
              <p className="text-xs text-slate-500">
                Rol: <strong className="text-slate-700">{currentEval.role}</strong> · Evaluador: {currentEval.evaluatedBy} ({currentEval.evaluationDate})
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shrink-0">
              <Award className="w-8 h-8 text-amber-500" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Promedio General</span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  {currentEval.averageScore} <span className="text-xs font-normal text-slate-500">/ 5.0</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Scale Legend */}
        <div className="bg-blue-50/60 border border-blue-200 p-3 rounded-lg flex flex-wrap items-center justify-between gap-2 text-[11px] text-blue-900">
          <span className="font-bold">Escala de Calificación Institucional:</span>
          <span>1: Deficiente</span>
          <span>·</span>
          <span>2: Insuficiente</span>
          <span>·</span>
          <span>3: Aceptable</span>
          <span>·</span>
          <span>4: Bueno</span>
          <span>·</span>
          <span className="font-bold text-emerald-800">5: Excelente</span>
        </div>

        {/* 13 Criteria Rating List */}
        {currentEval && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Calificación por Criterios de Desempeño y Rigor Ético
            </h3>

            <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
              {EVAL_CRITERIA.map((crit) => {
                const currentScore = currentEval.ratings[crit.key] || 3;
                return (
                  <div key={crit.key} className="p-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50">
                    <div className="max-w-md">
                      <strong className="text-slate-900 block font-semibold">{crit.label}</strong>
                      <span className="text-[11px] text-slate-500">{crit.desc}</span>
                    </div>

                    {/* Radio Star / Number Buttons 1 to 5 */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          disabled={!isEditing}
                          onClick={() => handleRatingChange(crit.key, score)}
                          className={`w-8 h-8 rounded-md font-mono text-xs font-bold transition-all ${
                            currentScore === score
                              ? score >= 4
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : score === 3
                                ? 'bg-amber-500 text-white'
                                : 'bg-rose-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-80'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Qualitative Sections: Strengths, Areas for Improvement, Training */}
        {currentEval && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-900 block">Fortalezas Identificadas</label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={currentEval.strengths}
                onChange={(e) => handleFieldChange('strengths', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-900 block">Aspectos por Mejorar</label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={currentEval.areasForImprovement}
                onChange={(e) => handleFieldChange('areasForImprovement', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-900 block">Observaciones Generales</label>
              <textarea
                rows={2}
                disabled={!isEditing}
                value={currentEval.observations}
                onChange={(e) => handleFieldChange('observations', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-900 block">Recomendaciones de Capacitación</label>
              <textarea
                rows={2}
                disabled={!isEditing}
                value={currentEval.trainingRecommendations}
                onChange={(e) => handleFieldChange('trainingRecommendations', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-[11px] text-slate-500">
            Con este momento se completa el ciclo metodológico integral de la auditoría.
          </span>
          <button
            onClick={handleSaveEvaluations}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs"
          >
            Guardar Evaluación Final
          </button>
        </div>
      </div>
    </div>
  );
};
