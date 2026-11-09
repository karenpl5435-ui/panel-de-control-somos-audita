import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Printer,
  Search,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Download
} from 'lucide-react';

interface ManualChapter {
  id: string;
  number: number;
  title: string;
  content: string[];
}

const CHAPTERS: ManualChapter[] = [
  {
    id: 'ch-1',
    number: 1,
    title: 'Cómo ingresar e iniciar sesión en SOMOS AUDITA',
    content: [
      'Acceda a la dirección web institucional desde cualquier navegador web moderno (Chrome, Edge, Safari, Firefox) en computador, tableta o celular.',
      'En la pantalla de inicio de sesión, ingrese su nombre de usuario asignado y contraseña.',
      'Si olvida su clave, utilice la opción "¿Olvidó su contraseña?" para solicitar asistencia al administrador.',
      'Para fines de demostración, la plataforma cuenta con un Selector Rápido de Roles en la barra superior que le permite alternar entre Administrador, Coordinador, Auditor Líder, Auditor de Apoyo, Gestor Auditado y Dirección Administrativa.'
    ]
  },
  {
    id: 'ch-2',
    number: 2,
    title: 'Cómo crear y programar una auditoría (Momento 1)',
    content: [
      'Diríjase a la opción "2. Programación de auditoría" en el menú lateral izquierdo o pulse el botón "+ Programar Nueva Auditoría" desde el Dashboard.',
      'El sistema asignará automáticamente un código consecutivo único (ej. AUD-2026-001).',
      'Diligencie el nombre del proyecto social, el nombre del Gestor(a) de Proyectos responsable, cargo, dependencia y ubicación territorial.',
      'Defina las fechas de programación, inicio y finalización prevista.',
      'Seleccione el motivo de la auditoría (Programada, Seguimiento, Especial o Por situación identificada) y asigne el Auditor Líder y los Auditores de Apoyo.',
      'Establezca el nivel de prioridad o riesgo (Alta, Media, Baja) justificando las razones objetivas (número de familias, fondos administrados).',
      'Haga clic en "Guardar Programación" y posteriormente en "Aprobar Programación" para que quede registrada en el calendario institucional.'
    ]
  },
  {
    id: 'ch-3',
    number: 3,
    title: 'Cómo elaborar y aprobar el Plan de Auditoría (Momento 2)',
    content: [
      'Ingrese a "3. Plan de auditoría". Los datos del proyecto se trasladarán automáticamente desde el Momento 1.',
      'Revise o ajuste el Objetivo General sugerido y agregue objetivos específicos para la revisión territorial.',
      'Delimite el alcance, los criterios de auditoría (manual de funciones, normas legales y técnicas) y la metodología de muestreo.',
      'Organice el cronograma de actividades de auditoría con fechas, horas, responsables y recursos.',
      'Especifique los documentos que se le solicitarán con anticipación al gestor auditado.',
      'Puede guardar borradores intermedios con "Guardar Borrador". Una vez concertado, pulse "Enviar a Revisión" y finalmente "Aprobar Plan".'
    ]
  },
  {
    id: 'ch-4',
    number: 4,
    title: 'Cómo elaborar el Acta de Apertura y registrar firmas (Momento 3)',
    content: [
      'Acceda al módulo "4. Acta de apertura". Los objetivos, alcance y criterios se autocompletarán desde el Plan.',
      'Defina la fecha, hora y modalidad de la reunión de apertura (Presencial, Virtual o Mixta).',
      'Verifique la lista de asistentes (Auditor Líder, Auditor de Apoyo, Gestor Auditado y Supervisor).',
      'Cada participante puede pulsar el botón "Firmar Electrónicamente" para registrar formalmente su asistencia y aceptación.',
      'Confirme la entrega de documentos solicitados y registre los compromisos iniciales acordados.',
      'Haga clic en "Aprobar y Formalizar Acta". El documento puede imprimirse o descargarse en PDF.'
    ]
  },
  {
    id: 'ch-5',
    number: 5,
    title: 'Cómo diligenciar la Lista de Chequeo y adjuntar evidencias (Momento 4)',
    content: [
      'Ingrese a "5. Lista de chequeo". La lista se encuentra dividida en 4 componentes obligatorios más el Manual de Funciones: A) Normas Legales, B) Normas Técnicas, C) Caracterización del Proceso, D) Informes y E) Funciones del Gestor.',
      'Para cada pregunta, seleccione una de las cuatro opciones: "Cumple", "No Cumple", "Cumple Parcialmente" o "No Aplica".',
      'Diligencie en el campo correspondiente la descripción de lo encontrado y la evidencia objetiva examinada.',
      'Para adjuntar evidencias, pulse "+ Adjuntar Evidencia" en el ítem correspondiente, ingrese el nombre del archivo (ej. Acta_Comunitaria_08Ago.pdf, Consentimientos_Foliados.pdf) y confirme.',
      'Si requiere evaluar un criterio adicional, utilice el botón "+ Agregar Pregunta".',
      'Al terminar la revisión de todos los criterios, pulse "Finalizar Lista" para que los incumplimientos se trasladen al Momento 5.'
    ]
  },
  {
    id: 'ch-6',
    number: 6,
    title: 'Cómo registrar No Conformidades (5 Preguntas) y el Acta de Cierre (Momento 5)',
    content: [
      'Acceda a "6. Acta de cierre". El sistema consolida las conformidades, los hallazgos y las oportunidades de mejora.',
      'Para cada incumplimiento detectado, pulse "+ Registrar No Conformidad".',
      'Diligencie obligatoriamente las CINCO PREGUNTAS: 1) ¿Cuál fue el hallazgo y qué fue lo que se encontró? 2) ¿Qué norma o requisito se incumplió? 3) ¿Cómo se está violando esa norma? 4) ¿Cuáles son las posibles consecuencias o riesgos asociados? y 5) ¿Qué se debe hacer para solucionar la no conformidad (Tratamiento y acción correctiva)?',
      'Asigne el responsable de subsanar, la fecha límite de compromiso y el nivel de riesgo.',
      'El Gestor(a) de Proyectos auditado(a) cuenta con un espacio para ingresar sus comentarios y aclaraciones formales.',
      'Una vez socializados los resultados, pulse "Aprobar Acta de Cierre" y descargue el PDF si lo requiere.'
    ]
  },
  {
    id: 'ch-7',
    number: 7,
    title: 'Cómo generar y aprobar el Informe de Auditoría (Momento 6)',
    content: [
      'Ingrese a "7. Informe de auditoría". El sistema compilará de forma automática todos los datos desde el Momento 1 hasta el Momento 5.',
      'El informe incluye: Portada institucional con el logotipo de Somos Uno, Resumen ejecutivo, Objetivos y alcance, Normatividad, Metodología, Resultados de la lista de chequeo con porcentaje de cumplimiento, Fichas de No Conformidad completas, Análisis de riesgos, Conclusiones y Recomendaciones con plazos.',
      'Haga clic en "Editar Borrador" si desea enriquecer el análisis cualitativo.',
      'Guarde los cambios y pulse "Aprobar Informe" para archivarlo oficialmente.',
      'Utilice "Descargar / Imprimir PDF" para obtener el documento institucional formateado para firma de la dirección.'
    ]
  },
  {
    id: 'ch-8',
    number: 8,
    title: 'Cómo evaluar el desempeño de los auditores (Momento 7)',
    content: [
      'Acceda a "8. Evaluación de auditores" al concluir el proceso.',
      'Seleccione al auditor líder o al auditor de apoyo que será evaluado.',
      'Califique cada uno de los 13 criterios de desempeño en la escala de 1 a 5 (1: Deficiente, 2: Insuficiente, 3: Aceptable, 4: Bueno, 5: Excelente).',
      'El sistema calculará automáticamente el promedio general ponderado.',
      'Redacte las fortalezas observadas, los aspectos por mejorar y las recomendaciones de capacitación.',
      'Guarde la evaluación. Con este paso se cierra formalmente el expediente de la auditoría.'
    ]
  },
  {
    id: 'ch-9',
    number: 9,
    title: 'Cómo utilizar el Manual de Funciones y la Normatividad Legal',
    content: [
      'En "9. Manual de funciones", consulte la descripción completa del cargo de Gestor(a) de Proyectos, sus 14 funciones específicas, perfil profesional y responsabilidades.',
      'Desde este módulo puede agregar nuevas funciones o editar las existentes con autorización.',
      'En "10. Normatividad legal", consulte la matriz colombiana aplicable (Constitución, Ley 1581 de Habeas Data, Decreto 092 de ESAL, ISO 19011) con enlaces directos a los textos oficiales.'
    ]
  },
  {
    id: 'ch-10',
    number: 10,
    title: 'Cómo administrar usuarios, roles y el Editor de la Plataforma',
    content: [
      'El Administrador puede acceder a "14. Editor de plataforma" para cambiar colores institucionales, editar textos, títulos, eslogan y encabezados de documentos en vivo.',
      'En "15. Gestión de usuarios", cree nuevos colaboradores, active o desactive cuentas y asigne cualquiera de los 6 perfiles disponibles.',
      'En "16. Configuración", realice copias de seguridad descargando la base de datos completa en archivo JSON o restaure un respaldo previo.',
      'Consulte en "17. Historial de cambios" la bitácora auditable de todas las operaciones realizadas en la plataforma con fecha, hora y usuario responsable.'
    ]
  },
  {
    id: 'ch-11',
    number: 11,
    title: 'Cómo instalar y desinstalar SOMOS AUDITA (PWA)',
    content: [
      'En "18. Instalar SOMOS AUDITA", encontrará el botón directo y las instrucciones para instalar la plataforma como Progressive Web App (PWA) en Windows, Mac, Android o iOS.',
      'La aplicación instalada funciona en ventana independiente, crea un acceso directo en su escritorio y permite operar sin conexión a internet.',
      'En "19. Desinstalar SOMOS AUDITA", consulte las instrucciones paso a paso para desinstalar la app de su dispositivo.',
      'IMPORTANTE: La desinstalación de la app en su equipo no borra la información almacenada en el servidor ni los expedientes históricos de auditoría, los cuales permanecen protegidos bajo las políticas de retención documental.'
    ]
  }
];

export const ManualUsuarioView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedChapter, setExpandedChapter] = useState<string | null>('ch-1');

  const filteredChapters = CHAPTERS.filter((ch) => {
    const matchesSearch =
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.content.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const toggleChapter = (id: string) => {
    setExpandedChapter(expandedChapter === id ? null : id);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Guía de Operación y Soporte al Usuario</span>
            <span>·</span>
            <span>11 Capítulos Oficiales</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MANUAL DE USUARIO DE LA PLATAFORMA SOMOS AUDITA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Instrucciones paso a paso para la operación, diligenciamiento de los siete momentos, administración, instalación y configuración del sistema.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
        >
          <Printer className="w-4 h-4" />
          <span>Descargar Manual PDF</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar en el manual (ej. no conformidad, lista de chequeo, instalación, backup)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Collapsible Chapters Accordion */}
      <div className="space-y-3">
        {filteredChapters.map((ch) => {
          const isExpanded = expandedChapter === ch.id;
          return (
            <div
              key={ch.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggleChapter(ch.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#0c2340] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {ch.number}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {ch.title}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-700 space-y-2.5 border-t border-slate-100 bg-slate-50/40">
                  {ch.content.map((paragraph, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-700 font-bold shrink-0 mt-0.5">•</span>
                      <p className="leading-relaxed font-medium">{paragraph}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
