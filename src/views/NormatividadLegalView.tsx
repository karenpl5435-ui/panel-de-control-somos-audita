import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LegalNormItem } from '../types';
import {
  Scale,
  PlusCircle,
  ExternalLink,
  Search,
  Filter,
  Trash2,
  Edit2,
  BookOpen,
  ShieldCheck,
  Save,
  CheckCircle2
} from 'lucide-react';

export const NormatividadLegalView: React.FC = () => {
  const { legalNorms, addLegalNorm, updateLegalNorm, deleteLegalNorm, currentUser, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'legal' | 'tecnica'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNorm, setNewNorm] = useState({
    name: '',
    numberAndYear: '',
    description: '',
    relatedArticles: '',
    applicabilitySomosUno: '',
    consultUrl: '',
    validityStatus: 'Vigente' as const,
    type: 'legal' as 'legal' | 'tecnica'
  });

  const filteredNorms = legalNorms.filter((n) => {
    const matchesSearch =
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.numberAndYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.applicabilitySomosUno.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || n.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddSubmit = () => {
    if (!newNorm.name || !newNorm.description) {
      showToast('Por favor ingrese el nombre y la descripción de la norma.', 'warning');
      return;
    }
    addLegalNorm({
      ...newNorm,
      consultUrl: newNorm.consultUrl || 'https://www.funcionpublica.gov.co'
    });
    setShowAddModal(false);
    setNewNorm({
      name: '',
      numberAndYear: '',
      description: '',
      relatedArticles: '',
      applicabilitySomosUno: '',
      consultUrl: '',
      validityStatus: 'Vigente',
      type: 'legal'
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Marco Jurídico y Normativo en Colombia</span>
            <span>·</span>
            <span>{legalNorms.length} Referencias</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            BIBLIOTECA DE NORMATIVIDAD LEGAL Y TÉCNICA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Matriz normativa colombiana aplicable a la Corporación Social Somos Uno y criterios de verificación para la auditoría de proyectos sociales en sectores vulnerables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Agregar Norma</span>
          </button>
        </div>
      </div>

      {/* Note about private entity application */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed flex items-start gap-3">
        <Scale className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Criterio de Aplicabilidad Jurídica para Somos Uno:</strong>
          La Corporación Social Somos Uno es una entidad privada sin ánimo de lucro (ESAL). Por tanto, no todas las normas estatales aplican automáticamente: el auditor debe verificar la naturaleza de la corporación, el convenio o contrato suscrito (ej. Decreto 092 de 2017), la fuente de los recursos y la población atendida (ej. especial protección Ley 1581 y Código de Infancia).
        </div>
      </div>

      {/* Search and Filter Strip */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, ley, artículo o aplicabilidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 font-medium"
          >
            <option value="all">Todas las normas y técnicas</option>
            <option value="legal">Solo Obligaciones Legales</option>
            <option value="tecnica">Solo Referencias Técnicas / Internas</option>
          </select>
        </div>
      </div>

      {/* Norms Cards Grid */}
      <div className="space-y-4">
        {filteredNorms.map((norm) => (
          <div
            key={norm.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 hover:border-slate-300 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  norm.type === 'legal'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-emerald-100 text-emerald-900'
                }`}>
                  {norm.type === 'legal' ? 'Obligación Legal' : 'Referencia Técnica'}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{norm.name}</h3>
                <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {norm.numberAndYear}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {norm.validityStatus}
                </span>
                <button
                  onClick={() => deleteLegalNorm(norm.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Eliminar norma"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {norm.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <strong className="text-slate-900 block mb-0.5">Artículos o Disposiciones Relacionadas:</strong>
                <p className="text-slate-600">{norm.relatedArticles}</p>
              </div>
              <div>
                <strong className="text-emerald-950 block mb-0.5">Aplicabilidad en Somos Uno y Auditoría:</strong>
                <p className="text-emerald-900">{norm.applicabilitySomosUno}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px]">
              <span className="text-slate-400">
                Fuente oficial para contrastar en Momento 4 (Lista de Chequeo)
              </span>
              {norm.consultUrl && (
                <a
                  href={norm.consultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline"
                >
                  <span>Consultar texto oficial</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Norm Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Registrar Nueva Norma en la Biblioteca
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tipo de Norma</label>
                <select
                  value={newNorm.type}
                  onChange={(e) => setNewNorm({ ...newNorm, type: e.target.value as any })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                >
                  <option value="legal">Obligación Legal (Ley, Decreto, Resolución)</option>
                  <option value="tecnica">Referencia Técnica (ISO, Guía, Procedimiento Interno)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre de la Norma *</label>
                <input
                  type="text"
                  placeholder="Ej. Ley 1098 de Código de Infancia..."
                  value={newNorm.name}
                  onChange={(e) => setNewNorm({ ...newNorm, name: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Número y Año</label>
                <input
                  type="text"
                  placeholder="Ej. Ley 1098 de 2006..."
                  value={newNorm.numberAndYear}
                  onChange={(e) => setNewNorm({ ...newNorm, numberAndYear: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Descripción del Objeto *</label>
                <textarea
                  rows={2}
                  placeholder="De qué trata la norma y qué regula..."
                  value={newNorm.description}
                  onChange={(e) => setNewNorm({ ...newNorm, description: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Artículos Relacionados</label>
                <input
                  type="text"
                  placeholder="Ej. Art. 17, 20, 27..."
                  value={newNorm.relatedArticles}
                  onChange={(e) => setNewNorm({ ...newNorm, relatedArticles: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Aplicabilidad en Somos Uno</label>
                <textarea
                  rows={2}
                  placeholder="Por qué y cómo aplica a los proyectos sociales de la corporación..."
                  value={newNorm.applicabilitySomosUno}
                  onChange={(e) => setNewNorm({ ...newNorm, applicabilitySomosUno: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2"
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
                onClick={handleAddSubmit}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700"
              >
                Guardar Norma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
