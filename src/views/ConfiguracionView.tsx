import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  Lock,
  Code2,
  FileCheck,
  CheckCircle,
  Database
} from 'lucide-react';

export const ConfiguracionView: React.FC = () => {
  const {
    exportDatabaseJSON,
    importDatabaseJSON,
    resetToDemoData,
    currentUser,
    audits,
    users,
    showToast
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDatabaseJSON(content);
        if (success && fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Sistema, Base de Datos y Gobernanza</span>
            <span>·</span>
            <span>Seguridad Institucional</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            CONFIGURACIÓN GENERAL, RESPALDOS Y SEGURIDAD
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Administración de copias de seguridad en formato JSON, políticas de conservación documental y protección reforzada de datos personales de menores.
          </p>
        </div>
      </div>

      {/* Section 1: Database Backups & Recovery */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Database className="w-5 h-5 text-blue-700" />
          <h2 className="text-sm font-bold text-slate-900">
            Copias de Seguridad (Backup) y Restauración de Base de Datos
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          La información de SOMOS AUDITA (usuarios, programaciones, actas, listas de chequeo, evidencias, informes y evaluaciones) se almacena permanentemente. Puede exportar un respaldo completo en cualquier momento o restaurar una copia previa.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Export JSON */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-bold text-slate-900 text-xs block">Exportar Copia de Seguridad</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Descarga un archivo JSON cifrado con {audits.length} auditorías y {users.length} usuarios.
              </p>
            </div>
            <button
              onClick={exportDatabaseJSON}
              className="flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs transition"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Backup JSON</span>
            </button>
          </div>

          {/* Import JSON */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-bold text-slate-900 text-xs block">Restaurar Copia de Seguridad</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Cargue un archivo JSON generado previamente para restablecer el sistema.
              </p>
            </div>
            <div>
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                id="upload-backup-file"
              />
              <label
                htmlFor="upload-backup-file"
                className="flex items-center justify-center gap-1.5 w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition text-center"
              >
                <Upload className="w-4 h-4" />
                <span>Restaurar Archivo JSON</span>
              </label>
            </div>
          </div>

          {/* Reset Demo */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-bold text-slate-900 text-xs block">Reiniciar Simulación Oficial</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Restablece la auditoría de demostración AUD-2026-001 (Proyecto Semillas de Esperanza).
              </p>
            </div>
            <button
              onClick={resetToDemoData}
              className="flex items-center justify-center gap-1.5 w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restablecer Demostración</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Data Protection & Child Welfare (Habeas Data Ley 1581) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900">
            Protección de Datos Personales de Beneficiarios y Sectores Vulnerables (Ley 1581 de 2012)
          </h2>
        </div>

        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-950 space-y-1">
            <strong className="block font-bold">Protección Especial y Prevalencia de Derechos (Art. 44 Constitución y Art. 7 Ley 1581):</strong>
            En los proyectos sociales dirigidos a comunidades vulnerables, los datos de niños, niñas y adolescentes tienen carácter de datos de especial protección constitucional. La plataforma SOMOS AUDITA exige que toda fotografía, ficha o listado cuente con la autorización previa, expresa e informada de sus tutores legales.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="block text-slate-900 mb-1">Control de Acceso por Roles:</strong>
              Solo los usuarios con perfil autorizado (Administrador, Coordinador, Auditor Líder) pueden visualizar evidencias y nombres completos de beneficiarios para evitar fugas de información sensible.
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="block text-slate-900 mb-1">Regla de Conservación Documental:</strong>
              Conforme a la Ley General de Archivos (Ley 594 de 2000), las auditorías y expedientes no se eliminan al desinstalar la app del dispositivo, garantizando la custodia probatoria institucional.
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Technical Architecture & Code Ownership (Requisito 13) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Code2 className="w-5 h-5 text-blue-700" />
          <h2 className="text-sm font-bold text-slate-900">
            Arquitectura Técnica, Código Fuente y Propiedad de la Plataforma
          </h2>
        </div>

        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            SOMOS AUDITA está construida con una arquitectura modular, desacoplada y 100% extensible en <strong>React 19 + TypeScript + Vite + Tailwind CSS v4</strong>. La Corporación Social Somos Uno tiene plena propiedad sobre el código fuente y su estructura de datos.
          </p>

          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[11px] space-y-1 overflow-x-auto">
            <div className="text-emerald-400 font-bold">// Estructura modular del proyecto fuente:</div>
            <div>├── src/</div>
            <div>│   ├── context/AppContext.tsx       # Estado global, persistencia LocalStorage e import/export JSON</div>
            <div>│   ├── data/initialData.ts          # Simulación oficial AUD-2026-001, 6 roles y normas colombianas</div>
            <div>│   ├── types/index.ts               # Modelos de datos TypeScript (7 momentos, NCs, usuarios)</div>
            <div>│   ├── hooks/usePWAInstall.ts       # Soporte PWA, standalone detection e instalación guiada</div>
            <div>│   ├── views/                       # Los 7 momentos y módulos de gestión independientes</div>
            <div>│   │   ├── Momento1Programacion.tsx # M1. Programación formal</div>
            <div>│   │   ├── Momento2Plan.tsx         # M2. Plan de auditoría</div>
            <div>│   │   ├── Momento3ActaApertura.tsx # M3. Acta formal con firmas electrónicas</div>
            <div>│   │   ├── Momento4ListaChequeo.tsx # M4. 4 componentes + manual de funciones</div>
            <div>│   │   ├── Momento5ActaCierre.tsx   # M5. Conformidades + NC con 5 preguntas obligatorias</div>
            <div>│   │   ├── Momento6Informe.tsx      # M6. Generador consolidado imprimible</div>
            <div>│   │   ├── Momento7EvaluacionAuditores.tsx # M7. Calificación en escala 1 a 5</div>
            <div>│   │   ├── AdminEditorView.tsx      # Requisito 12: Editor de diseño, momentos y formularios</div>
            <div>│   │   └── ...                      # Manual de funciones, normas, PWA install/uninstall</div>
            <div>├── vite.config.ts                   # Configuración VitePWA, manifest y autoUpdate</div>
            <div>└── package.json                     # Scripts de ejecución (dev, build, lint)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
