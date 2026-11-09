import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlatformConfig } from '../types';
import {
  Palette,
  Save,
  CheckCircle,
  Eye,
  RotateCcw,
  Sparkles,
  Sliders,
  FileText,
  Layout,
  Type,
  Layers,
  History,
  Check,
  X,
  Plus,
  Trash2
} from 'lucide-react';

export const AdminEditorView: React.FC = () => {
  const { config, updateConfig, currentUser, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'diseno' | 'contenidos' | 'momentos' | 'documentos' | 'formularios' | 'versiones'>('diseno');

  // Draft state
  const [draftConfig, setDraftConfig] = useState<PlatformConfig>({ ...config });
  const [previewMode, setPreviewMode] = useState(false);

  // Dynamic custom fields demo
  const [customFields, setCustomFields] = useState([
    { id: 'f-1', name: 'Territorio de Intervención Específico', type: 'texto', moment: 'Momento 1', required: true },
    { id: 'f-2', name: 'Número de Niños Beneficiarios Directos', type: 'numero', moment: 'Momento 1', required: true },
    { id: 'f-3', name: 'Formato de Autorización Habeas Data Físico', type: 'archivo', moment: 'Momento 4', required: true },
    { id: 'f-4', name: 'Clasificación de Riesgo Territorial', type: 'seleccion', moment: 'Momento 5', required: false }
  ]);

  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('texto');
  const [newFieldMoment, setNewFieldMoment] = useState('Momento 1');
  const [newFieldRequired, setNewFieldRequired] = useState(false);

  const handlePublishChanges = () => {
    updateConfig(draftConfig);
    showToast('¡Cambios publicados con éxito en toda la plataforma!', 'success');
  };

  const handleResetDraft = () => {
    setDraftConfig({ ...config });
    showToast('Borrador restablecido a los valores actuales publicados.', 'info');
  };

  const handleAddCustomField = () => {
    if (!newFieldName.trim()) return;
    const newF = {
      id: 'f-' + Date.now(),
      name: newFieldName.trim(),
      type: newFieldType,
      moment: newFieldMoment,
      required: newFieldRequired
    };
    setCustomFields([...customFields, newF]);
    setNewFieldName('');
    showToast('Nuevo campo dinámico agregado al formulario.', 'success');
  };

  const handleDeleteCustomField = (id: string) => {
    setCustomFields(customFields.filter((f) => f.id !== id));
    showToast('Campo dinámico eliminado.', 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner and Actions */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Administración Central · Requisito Principal</span>
            <span>·</span>
            <span>Edición Sin Código</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            ADMINISTRADOR Y EDITOR DE SOMOS AUDITA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personalice contenidos, títulos, colores institucionales, los siete momentos, plantillas de documentos y formularios sin necesidad de programar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
              previewMode
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{previewMode ? 'Cerrar Vista Previa' : 'Vista Previa'}</span>
          </button>

          <button
            onClick={handleResetDraft}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Descartar Borrador</span>
          </button>

          <button
            onClick={handlePublishChanges}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Publicar Cambios</span>
          </button>
        </div>
      </div>

      {/* Preview Alert Banner if Active */}
      {previewMode && (
        <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-xl text-xs text-amber-900 flex items-center justify-between">
          <div>
            <strong>MODO VISTA PREVIA ACTIVO:</strong> Está visualizando cómo se verán los cambios antes de publicarlos oficialmente a todos los usuarios de la corporación.
          </div>
          <button
            onClick={handlePublishChanges}
            className="px-3 py-1 bg-emerald-700 text-white font-bold rounded hover:bg-emerald-800 shrink-0 text-xs"
          >
            Aprobar y Publicar
          </button>
        </div>
      )}

      {/* Editor Main Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        
        {/* Editor Tabs Navigation */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'diseno', label: 'C. Diseño y Colores', icon: Palette },
            { id: 'contenidos', label: 'A. Textos y Contenidos', icon: Type },
            { id: 'momentos', label: 'B. Los Siete Momentos', icon: Layers },
            { id: 'documentos', label: 'E. Plantillas de Documentos', icon: FileText },
            { id: 'formularios', label: 'F. Editor de Formularios', icon: Sliders },
            { id: 'versiones', label: 'G. Control de Versiones', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#0c2340] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB C: DISEÑO Y COLORES */}
        {activeTab === 'diseno' && (
          <div className="space-y-6 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
              Personalice la apariencia visual de la plataforma según los lineamientos corporativos: azul oscuro como color principal, blanco de fondo, verde complementario y gris para elementos secundarios.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-900 mb-1">Nombre de la Plataforma</label>
                <input
                  type="text"
                  value={draftConfig.appName}
                  onChange={(e) => setDraftConfig({ ...draftConfig, appName: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Nombre de la Empresa</label>
                <input
                  type="text"
                  value={draftConfig.corporateName}
                  onChange={(e) => setDraftConfig({ ...draftConfig, corporateName: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-bold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-900 mb-1">Eslogan Institucional</label>
                <input
                  type="text"
                  value={draftConfig.slogan}
                  onChange={(e) => setDraftConfig({ ...draftConfig, slogan: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Color Principal (Azul Corporativo)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={draftConfig.primaryColor}
                    onChange={(e) => setDraftConfig({ ...draftConfig, primaryColor: e.target.value })}
                    className="w-10 h-10 rounded border border-slate-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={draftConfig.primaryColor}
                    onChange={(e) => setDraftConfig({ ...draftConfig, primaryColor: e.target.value })}
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 font-mono text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Color Complementario (Verde Acento)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={draftConfig.accentColor}
                    onChange={(e) => setDraftConfig({ ...draftConfig, accentColor: e.target.value })}
                    className="w-10 h-10 rounded border border-slate-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={draftConfig.accentColor}
                    onChange={(e) => setDraftConfig({ ...draftConfig, accentColor: e.target.value })}
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 font-mono text-slate-800"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-900 mb-1">Pie de Página Territorial</label>
                <input
                  type="text"
                  value={draftConfig.cityYear}
                  onChange={(e) => setDraftConfig({ ...draftConfig, cityYear: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB A: TEXTOS Y CONTENIDOS */}
        {activeTab === 'contenidos' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-900 mb-1">Mensaje de Bienvenida en el Dashboard</label>
              <textarea
                rows={2}
                value={draftConfig.welcomeMessage}
                onChange={(e) => setDraftConfig({ ...draftConfig, welcomeMessage: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-3 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-900 mb-1">Pie de Página Oficial de Documentos</label>
              <input
                type="text"
                value={draftConfig.documentHeaders.footerText}
                onChange={(e) =>
                  setDraftConfig({
                    ...draftConfig,
                    documentHeaders: { ...draftConfig.documentHeaders, footerText: e.target.value }
                  })
                }
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          </div>
        )}

        {/* TAB B: LOS SIETE MOMENTOS */}
        {activeTab === 'momentos' && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 leading-relaxed">
              <strong>Control de Plantillas de Auditoría:</strong> Las modificaciones realizadas a las plantillas de los siete momentos se aplican automáticamente a las nuevas auditorías sin alterar los registros históricos ni las auditorías finalizadas.
            </div>

            <div className="space-y-3">
              {[
                { num: 1, name: 'Momento 1. Programación de la auditoría', desc: 'Asignación de gestor, fechas, motivo, auditor líder y nivel de riesgo con justificación.' },
                { num: 2, name: 'Momento 2. Plan de auditoría', desc: 'Objetivo general sugerido, objetivos específicos, alcance, normas aplicables y agenda.' },
                { num: 3, name: 'Momento 3. Acta de apertura', desc: 'Formalización de la reunión inicial, registro de asistentes, compromisos y firmas electrónicas.' },
                { num: 4, name: 'Momento 4. Lista de chequeo', desc: 'Cuatro componentes: normas legales, técnicas, caracterización e informes + manual de funciones.' },
                { num: 5, name: 'Momento 5. Acta de cierre', desc: 'Conformidades, hallazgos, oportunidades de mejora y No Conformidades (5 preguntas obligatorias).' },
                { num: 6, name: 'Momento 6. Informe de auditoría', desc: 'Informe consolidado institucional con portada, metodología, resultados, conclusiones y anexos.' },
                { num: 7, name: 'Momento 7. Evaluación de los auditores', desc: 'Evaluación del equipo auditor en escala de 1 a 5 con 13 criterios éticos y técnicos.' },
              ].map((m) => (
                <div key={m.num} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">{m.name}</span>
                    <span className="text-[11px] text-slate-500">{m.desc}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Activo Oficial
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB E: PLANTILLAS DE DOCUMENTOS */}
        {activeTab === 'documentos' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-900 mb-1">Encabezado para Acta de Apertura</label>
              <input
                type="text"
                value={draftConfig.documentHeaders.actaAperturaTitle}
                onChange={(e) =>
                  setDraftConfig({
                    ...draftConfig,
                    documentHeaders: { ...draftConfig.documentHeaders, actaAperturaTitle: e.target.value }
                  })
                }
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-900 mb-1">Encabezado para Acta de Cierre</label>
              <input
                type="text"
                value={draftConfig.documentHeaders.actaCierreTitle}
                onChange={(e) =>
                  setDraftConfig({
                    ...draftConfig,
                    documentHeaders: { ...draftConfig.documentHeaders, actaCierreTitle: e.target.value }
                  })
                }
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-900 mb-1">Encabezado para Informe de Auditoría</label>
              <input
                type="text"
                value={draftConfig.documentHeaders.informeTitle}
                onChange={(e) =>
                  setDraftConfig({
                    ...draftConfig,
                    documentHeaders: { ...draftConfig.documentHeaders, informeTitle: e.target.value }
                  })
                }
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          </div>
        )}

        {/* TAB F: EDITOR DE FORMULARIOS Y CAMPOS DINÁMICOS */}
        {activeTab === 'formularios' && (
          <div className="space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900">Campos y Preguntas Dinámicas en Formularios</h3>
                <p className="text-slate-500">Agregue o configure campos adicionales para los momentos de auditoría.</p>
              </div>
            </div>

            {/* Existing dynamic fields list */}
            <div className="space-y-2">
              {customFields.map((field) => (
                <div key={field.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">{field.name}</span>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>Módulo: <strong>{field.moment}</strong></span>
                      <span>·</span>
                      <span>Tipo: <strong>{field.type}</strong></span>
                      <span>·</span>
                      <span className={field.required ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                        {field.required ? 'Obligatorio' : 'Opcional'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteCustomField(field.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Eliminar campo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Field Box */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3">
              <span className="font-bold text-emerald-950 block">Agregar Nuevo Campo al Formulario</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Nombre del campo..."
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  className="sm:col-span-2 border border-slate-300 rounded px-3 py-1.5 bg-white text-xs"
                />
                <select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value)}
                  className="border border-slate-300 rounded px-2.5 py-1.5 bg-white text-xs"
                >
                  <option value="texto">Texto</option>
                  <option value="numero">Número</option>
                  <option value="fecha">Fecha</option>
                  <option value="seleccion">Lista Desplegable</option>
                  <option value="archivo">Archivo Adjunto</option>
                  <option value="observaciones">Observaciones</option>
                </select>
                <select
                  value={newFieldMoment}
                  onChange={(e) => setNewFieldMoment(e.target.value)}
                  className="border border-slate-300 rounded px-2.5 py-1.5 bg-white text-xs"
                >
                  <option value="Momento 1">Momento 1 (Programación)</option>
                  <option value="Momento 2">Momento 2 (Plan)</option>
                  <option value="Momento 3">Momento 3 (Acta Apertura)</option>
                  <option value="Momento 4">Momento 4 (Lista Chequeo)</option>
                  <option value="Momento 5">Momento 5 (Acta Cierre)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={newFieldRequired}
                    onChange={(e) => setNewFieldRequired(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Marcar como campo obligatorio</span>
                </label>
                <button
                  onClick={handleAddCustomField}
                  className="px-3 py-1.5 bg-emerald-700 text-white rounded text-xs font-bold hover:bg-emerald-800 shadow-xs"
                >
                  + Agregar Campo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB G: CONTROL DE VERSIONES Y RESTAURACIÓN */}
        {activeTab === 'versiones' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100">
              Historial de Versiones de la Configuración Institucional
            </h3>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Versión 2.0 (Actual en Producción)</span>
                  <span className="text-[11px] text-slate-500">
                    Publicada por: {currentUser.fullName} · {new Date().toISOString().slice(0, 10)}
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Activa
                </span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-700 block">Versión 1.0 (Línea Base Inicial)</span>
                  <span className="text-[11px] text-slate-400">
                    Configuración original de SOMOS AUDITA · Febrero 2026
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleResetDraft();
                    showToast('Versión 1.0 restaurada en borrador.', 'info');
                  }}
                  className="text-xs text-blue-700 hover:underline font-semibold"
                >
                  Restaurar como Borrador
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-[11px] text-slate-500">
            Los cambios se guardan localmente y se propagan inmediatamente a toda la sesión.
          </span>
          <button
            onClick={handlePublishChanges}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            Guardar y Publicar Modificaciones
          </button>
        </div>
      </div>
    </div>
  );
};
