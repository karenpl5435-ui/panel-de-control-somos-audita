import {
  Audit,
  JobDescription,
  LegalNormItem,
  PlatformConfig,
  User,
  AuditLogEntry
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    username: 'admin',
    fullName: 'Ing. Andrea Beltrán Gómez',
    email: 'andrea.beltran@somosuno.org.co',
    role: 'ADMINISTRADOR',
    cargo: 'Directora de Aseguramiento de la Calidad y Sistemas',
    active: true,
    phone: '+57 312 458 9012',
    lastLogin: '2026-11-08 14:32'
  },
  {
    id: 'usr-2',
    username: 'coordinador',
    fullName: 'Dr. Roberto Casas Cárdenas',
    email: 'roberto.casas@somosuno.org.co',
    role: 'COORDINADOR_AUDITORIA',
    cargo: 'Coordinador General de Control Interno',
    active: true,
    phone: '+57 310 882 1243',
    lastLogin: '2026-11-08 13:10'
  },
  {
    id: 'usr-3',
    username: 'auditor_lider',
    fullName: 'Ing. Carlos Andrés Montoya',
    email: 'carlos.montoya@somosuno.org.co',
    role: 'AUDITOR_LIDER',
    cargo: 'Auditor Líder Senior ISO 19011',
    active: true,
    phone: '+57 315 723 6541',
    lastLogin: '2026-11-08 15:05'
  },
  {
    id: 'usr-4',
    username: 'auditor_apoyo',
    fullName: 'Dra. Mariana Gómez Vélez',
    email: 'mariana.gomez@somosuno.org.co',
    role: 'AUDITOR_APOYO',
    cargo: 'Especialista en Evaluación de Proyectos Sociales',
    active: true,
    phone: '+57 311 902 4312',
    lastLogin: '2026-11-07 18:22'
  },
  {
    id: 'usr-5',
    username: 'gestor_proyectos',
    fullName: 'Lic. Valentina Restrepo Salazar',
    email: 'valentina.restrepo@somosuno.org.co',
    role: 'GESTOR_AUDITADO',
    cargo: 'Gestora de Proyectos para Sectores Vulnerables',
    active: true,
    phone: '+57 320 651 8976',
    lastLogin: '2026-11-08 11:45'
  },
  {
    id: 'usr-6',
    username: 'direccion',
    fullName: 'Dra. Elena Sofía Morales Ortiz',
    email: 'direccion@somosuno.org.co',
    role: 'DIRECCION_ADMINISTRATIVA',
    cargo: 'Directora Ejecutiva - Corporación Social Somos Uno',
    active: true,
    phone: '+57 300 234 5678',
    lastLogin: '2026-11-08 09:30'
  }
];

export const INITIAL_CONFIG: PlatformConfig = {
  corporateName: 'Corporación Social Somos Uno',
  appName: 'SOMOS AUDITA',
  slogan: 'Auditoría, transparencia y mejoramiento para la transformación social',
  cityYear: 'Medellín, Colombia · 2026',
  primaryColor: '#0c2340',
  accentColor: '#16a34a',
  welcomeMessage: 'Sistema Integrado de Auditoría al cargo de Gestor(a) de Proyectos en Sectores Vulnerables',
  documentHeaders: {
    actaAperturaTitle: 'ACTA FORMAL DE APERTURA DE AUDITORÍA INTERNA',
    actaCierreTitle: 'ACTA FORMAL DE CIERRE Y REUNIÓN DE RESULTADOS',
    informeTitle: 'INFORME CONSOLIDADO DE AUDITORÍA INTEGRAL DE GESTIÓN',
    footerText: 'Corporación Social Somos Uno · Personería Jurídica Vigente · Medellín, Colombia'
  },
  permissions: {
    ADMINISTRADOR: {
      canCreateAudit: true,
      canApproveMoments: true,
      canEditForms: true,
      canManageUsers: true,
      canAccessAdminEditor: true,
      canViewConfidentialBeneficiaryData: true,
      canExportData: true,
      canDeleteAudit: true
    },
    COORDINADOR_AUDITORIA: {
      canCreateAudit: true,
      canApproveMoments: true,
      canEditForms: true,
      canManageUsers: false,
      canAccessAdminEditor: false,
      canViewConfidentialBeneficiaryData: true,
      canExportData: true,
      canDeleteAudit: false
    },
    AUDITOR_LIDER: {
      canCreateAudit: false,
      canApproveMoments: true,
      canEditForms: false,
      canManageUsers: false,
      canAccessAdminEditor: false,
      canViewConfidentialBeneficiaryData: true,
      canExportData: true,
      canDeleteAudit: false
    },
    AUDITOR_APOYO: {
      canCreateAudit: false,
      canApproveMoments: false,
      canEditForms: false,
      canManageUsers: false,
      canAccessAdminEditor: false,
      canViewConfidentialBeneficiaryData: true,
      canExportData: true,
      canDeleteAudit: false
    },
    GESTOR_AUDITADO: {
      canCreateAudit: false,
      canApproveMoments: false,
      canEditForms: false,
      canManageUsers: false,
      canAccessAdminEditor: false,
      canViewConfidentialBeneficiaryData: true,
      canExportData: true,
      canDeleteAudit: false
    },
    DIRECCION_ADMINISTRATIVA: {
      canCreateAudit: false,
      canApproveMoments: true,
      canEditForms: false,
      canManageUsers: false,
      canAccessAdminEditor: false,
      canViewConfidentialBeneficiaryData: true,
      canExportData: true,
      canDeleteAudit: false
    }
  }
};

export const INITIAL_LEGAL_NORMS: LegalNormItem[] = [
  {
    id: 'norm-1',
    name: 'Constitución Política de Colombia',
    numberAndYear: '1991',
    description: 'Norma de normas. Marco de dignidad humana, igualdad, prevalencia del interés general y protección reforzada a sujetos de especial protección constitucional.',
    relatedArticles: 'Art. 1 (Estado social de derecho), Art. 2 (Fines esenciales), Art. 13 (Igualdad y grupos vulnerables), Art. 15 (Habeas data), Art. 44 (Derechos fundamentales de los niños).',
    applicabilitySomosUno: 'Fundamento ético y constitucional supremo para el diseño, trato e intervención psicosocial y comunitaria de todos los programas de la Corporación.',
    consultUrl: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=4125',
    validityStatus: 'Vigente',
    type: 'legal'
  },
  {
    id: 'norm-2',
    name: 'Ley Estatutaria 1581 de Protección de Datos Personales',
    numberAndYear: 'Ley 1581 de 2012',
    description: 'Régimen general de protección de datos personales en Colombia. Regula la recolección, almacenamiento, uso y supresión de datos sensibles en bases de datos.',
    relatedArticles: 'Art. 5 (Datos sensibles), Art. 6 (Tratamiento de datos sensibles), Art. 7 (Derechos de los niños, niñas y adolescentes), Art. 9 (Autorización del titular).',
    applicabilitySomosUno: 'Obligación estricta al levantar listados de asistencia, fichas socioeconómicas, fotografías y registros de beneficiarios infantiles en sectores vulnerables.',
    consultUrl: 'https://www.sic.gov.co/sobre-la-proteccion-de-datos-personales',
    validityStatus: 'Vigente',
    type: 'legal'
  },
  {
    id: 'norm-3',
    name: 'Ley 1712 de Transparencia y Acceso a la Información Pública',
    numberAndYear: 'Ley 1712 de 2014',
    description: 'Regula el principio de máxima publicidad y transparencia en entidades que administren recursos públicos o presten servicios públicos esenciales.',
    relatedArticles: 'Art. 5 (Sujetos obligados: personas naturales o jurídicas que cumplan funciones públicas o administren recursos públicos).',
    applicabilitySomosUno: 'Aplica cuando la Corporación celebre convenios de asociación o contratos de aporte con entidades del Estado (Alcaldía, ICBF, Gobernación).',
    consultUrl: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=56882',
    validityStatus: 'Vigente',
    type: 'legal'
  },
  {
    id: 'norm-4',
    name: 'Decreto 092 de Contratación con Entidades sin Ánimo de Lucro (ESAL)',
    numberAndYear: 'Decreto 092 de 2017',
    description: 'Reglamenta la contratación del Estado con entidades privadas sin ánimo de lucro bajo el artículo 355 constitucional para programas de interés público.',
    relatedArticles: 'Art. 2 (Convenios de asociación), Art. 4 (Proceso competitivo), Art. 7 (Requisitos de idoneidad y experiencia documental).',
    applicabilitySomosUno: 'Marco regulatorio para la justificación técnica, financiera, presupuestal y de informes de gestión en convenios suscritos por la Corporación.',
    consultUrl: 'https://www.colombiacompra.gov.co/decreto-092-de-2017',
    validityStatus: 'Vigente',
    type: 'legal'
  },
  {
    id: 'norm-5',
    name: 'Ley 1474 Estatuto Anticorrupción',
    numberAndYear: 'Ley 1474 de 2011',
    description: 'Disposiciones orientadas a fortalecer los mecanismos de prevención, investigación y sanción de actos de corrupción y la efectividad del control de gestión.',
    relatedArticles: 'Art. 73 (Plan anticorrupción), Art. 83 y ss. (Supervisión e interventoría de contratos con recursos públicos).',
    applicabilitySomosUno: 'Exigencia de debida diligencia, rendición de cuentas objetiva y trazabilidad de soportes contables y operativos de los proyectos sociales.',
    consultUrl: 'https://www.secretariasenado.gov.co/senado/basedoc/ley_1474_2011.html',
    validityStatus: 'Vigente',
    type: 'legal'
  },
  {
    id: 'norm-6',
    name: 'ISO 19011:2018 Directrices para Auditorías de Sistemas de Gestión',
    numberAndYear: 'NTC-ISO 19011:2018',
    description: 'Estándar técnico internacional que orienta los principios de auditoría, la gestión del programa de auditoría y la realización de auditorías internas.',
    relatedArticles: 'Capítulo 4 (Principios: Integridad, Imparcialidad, Confidencialidad), Capítulo 6 (Realización: Apertura, Evidencia, Cierre, Informe).',
    applicabilitySomosUno: 'Referencia técnica metodológica que rige la estructura de los 7 momentos en SOMOS AUDITA y la evaluación del equipo auditor.',
    consultUrl: 'https://www.iso.org/standard/70017.html',
    validityStatus: 'Vigente',
    type: 'tecnica'
  },
  {
    id: 'norm-7',
    name: 'Manual de Funciones y Procedimientos Internos Somos Uno',
    numberAndYear: 'Versión 2.0 - 2026',
    description: 'Documento interno institucional que describe formalmente las funciones, competencias, entregables y responsabilidades del Gestor(a) de Proyectos.',
    relatedArticles: 'Numeral 3.1 (Formulación de proyectos), Numeral 4.2 (Coordinación comunitaria), Numeral 5.1 (Rendición periódica de informes).',
    applicabilitySomosUno: 'Criterio directo de auditoría para contrastar el desempeño real del titular del cargo frente a las responsabilidades asignadas.',
    consultUrl: '#/manual-funciones',
    validityStatus: 'Vigente',
    type: 'tecnica'
  }
];

export const INITIAL_JOB_DESCRIPTION: JobDescription = {
  jobTitle: 'Gestor(a) de Proyectos para Sectores Vulnerables',
  department: 'Dirección Operativa de Proyectos Comunitarios',
  immediateSupervisor: 'Coordinador(a) General de Proyectos Sociales',
  jobLevel: 'Profesional Especializado / Coordinación Territorial',
  location: 'Sede Principal Medellín con intervención en campo (Comunas y Corregimientos)',
  mainObjective: 'Planificar, coordinar, ejecutar, monitorear y evaluar de manera integral los proyectos sociales dirigidos a comunidades y sectores en condición de vulnerabilidad, asegurando la efectividad metodológica, el manejo transparente de recursos asignados, el cumplimiento estricto de los estándares de protección a la niñez y la participación comunitaria activa.',
  generalFunctions: [
    'Liderar la formulación, implementación y cierre de proyectos de impacto social comunitario bajo criterios de sostenibilidad y respeto cultural.',
    'Articular a las comunidades vulnerables, líderes comunitarios y beneficiarios con los objetivos programáticos de la Corporación Social Somos Uno.',
    'Asegurar el cumplimiento de los cronogramas, presupuestos, entregables y metas acordadas en los contratos y convenios de cooperación.',
    'Garantizar la custodia confidencial y segura de toda la información y datos personales de niños, niñas, mujeres y familias atendidas.',
    'Rendir cuentas técnica, operativa y documentalmente ante la coordinación, auditoría y dirección administrativa con evidencias verificables.'
  ],
  specificFunctions: [
    {
      id: 'fn-1',
      number: 1,
      title: 'Formular y planificar proyectos sociales',
      description: 'Elaborar diagnósticos territoriales participativos, árboles de problemas, marco lógico, cronogramas detallados y fichas técnicas para comunidades vulnerables.',
      verificationGuideline: 'Verificar documento metodológico del proyecto, cronograma en formato Gantt y plan operativo aprobado por la coordinación.',
      category: 'Planeación',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-2',
      number: 2,
      title: 'Identificar las necesidades de las comunidades vulnerables',
      description: 'Aplicar instrumentos de caracterización socioeconómica respetando la dignidad humana y los saberes territoriales de la población focalizada.',
      verificationGuideline: 'Revisar matriz de caracterización, actas de asambleas diagnósticas comunitarias y mapa de actores territoriales.',
      category: 'Planeación',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-3',
      number: 3,
      title: 'Diseñar objetivos, actividades y metas',
      description: 'Estructurar indicadores SMART (específicos, medibles, alcanzables, relevantes y con tiempo delimitado) con sus respectivas fuentes de verificación.',
      verificationGuideline: 'Comprobar matriz de indicadores y plan operativo con metas cuantitativas y cualitativas definidas.',
      category: 'Planeación',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-4',
      number: 4,
      title: 'Elaborar cronogramas de trabajo detallados',
      description: 'Calendarizar cada una de las jornadas, talleres, visitas domiciliarias y comités de seguimiento, definiendo tiempos realistas.',
      verificationGuideline: 'Constatar el cronograma consolidado y sus actualizaciones aprobadas frente a eventos sobrevinientes.',
      category: 'Planeación',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-5',
      number: 5,
      title: 'Coordinar recursos humanos, técnicos y financieros asignados',
      description: 'Administrar eficientemente los insumos de talleres, refrigerios, honorarios de facilitadores y elementos pedagógicos con presupuestos aprobados.',
      verificationGuideline: 'Cruzar relación de gastos y solicitudes de compra frente a plan de adquisiciones y autorizaciones de desembolso.',
      category: 'Ejecución',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-6',
      number: 6,
      title: 'Realizar seguimiento continuo a la ejecución de proyectos',
      description: 'Monitorear semanal y mensualmente el porcentaje de avance físico y presupuestal frente a la línea base programada.',
      verificationGuideline: 'Verificar tablero de control o informe mensual de seguimiento con semaforización de cumplimiento.',
      category: 'Seguimiento',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-7',
      number: 7,
      title: 'Coordinar actividades directas con comunidades y beneficiarios',
      description: 'Convocar y dinamizar encuentros comunitarios con enfoque inclusivo, garantizando condiciones de seguridad, accesibilidad y respeto mutuo.',
      verificationGuideline: 'Constatar actas de asistencia originales, consentimientos informados firmados y registros fotográficos autorizados.',
      category: 'Comunidad',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-8',
      number: 8,
      title: 'Elaborar informes de gestión periódicos',
      description: 'Redactar informes mensuales, trimestrales y finales de gestión con análisis de resultados, narrativa cualitativa y soportes anexos.',
      verificationGuideline: 'Revisar radicado de entrega oportuna de informes y coherencia entre datos reportados y evidencias adjuntas.',
      category: 'Documentación',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-9',
      number: 9,
      title: 'Verificar el cumplimiento de objetivos y metas pactadas',
      description: 'Evaluar el grado de alcance de los indicadores de producto, resultado e impacto frente a los beneficiarios efectivos atendidos.',
      verificationGuideline: 'Inspeccionar informe de medición de indicadores de impacto y fichas de evaluación por taller.',
      category: 'Seguimiento',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-10',
      number: 10,
      title: 'Identificar riesgos y dificultades en la implementación',
      description: 'Detectar tempranamente contingencias de orden público territorial, deserción de beneficiarios, demoras logísticas o climáticas.',
      verificationGuideline: 'Verificar matriz de riesgos del proyecto y planes de contingencia documentados ante alertas territoriales.',
      category: 'Seguimiento',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-11',
      number: 11,
      title: 'Proponer e implementar acciones de mejora continua',
      description: 'Ajustar metodologías pedagógicas y operativas con base en la retroalimentación de las familias y evaluaciones intermedias.',
      verificationGuideline: 'Constatar actas de lecciones aprendidas y registro de ajustes metodológicos implementados.',
      category: 'Seguimiento',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-12',
      number: 12,
      title: 'Mantener actualizada y foliada la documentación del proyecto',
      description: 'Custodiar el archivo técnico y físico del expediente del proyecto conforme a la tabla de retención documental institucional.',
      verificationGuideline: 'Comprobar el expediente digital en la nube institucional y el archivo físico foliado disponible para auditoría.',
      category: 'Documentación',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-13',
      number: 13,
      title: 'Presentar resultados periódicos a la dirección institucional',
      description: 'Exponer en comités directivos los hitos alcanzados, las dificultades superadas y las proyecciones comunitarias de cada fase.',
      verificationGuideline: 'Actas de comités operativos mensuales con firma de asistentes y presentaciones gerenciales radicadas.',
      category: 'Documentación',
      status: 'Aprobada Oficial'
    },
    {
      id: 'fn-14',
      number: 14,
      title: 'Garantizar el manejo responsable de la información de beneficiarios',
      description: 'Proteger con absoluta reserva los datos sensibles, historias de vida y fotografías de niños y personas en condición de vulnerabilidad (Ley 1581 de 2012).',
      verificationGuideline: 'Custodia de carpetas con acceso restringido, formatos de Habeas Data firmados por tutores legales y ausencia de exposición indebida.',
      category: 'Comunidad',
      status: 'Aprobada Oficial'
    }
  ],
  profile: {
    education: 'Profesional en Trabajo Social, Sociología, Psicología, Antropología, Administración de Empresas, Ingeniería de Productividad o afines. Preferible con especialización en Gestión de Proyectos o Gerencia Social.',
    experience: 'Mínimo tres (3) años de experiencia demostrable en formulación, gestión, ejecución y seguimiento de proyectos con comunidades vulnerables, comunidades étnicas o niñez.',
    technicalKnowledge: [
      'Metodología de Marco Lógico y Teoría del Cambio',
      'Gestión presupuestal y control financiero básico de proyectos',
      'Normativa colombiana de protección de datos (Ley 1581) y derechos de la niñez (Ley 1098)',
      'Diseño de indicadores sociales cuantitativos y cualitativos',
      'Manejo de herramientas ofimáticas avanzadas, Google Workspace y software de proyectos'
    ],
    laborCompetencies: [
      'Sensibilidad y empatía con comunidades en extrema vulnerabilidad',
      'Orientación rigurosa a resultados y cumplimiento de compromisos',
      'Habilidad de concertación, resolución pacífica de conflictos y escucha activa',
      'Transparencia ética y rendición de cuentas sistemática'
    ],
    skills: {
      communication: 'Excelente redacción técnica, oratoria comunitaria asertiva y escucha activa.',
      leadership: 'Liderazgo inspirador, motivacional y no autoritario con comunidades y facilitadores.',
      teamwork: 'Capacidad comprobada de articulación interdisciplinaria con psicólogos, nutricionistas y auditores.',
      planning: 'Capacidad de estructurar agendas rigurosas y anticipar contingencias territoriales.',
      organization: 'Metódico en archivo documental, custodia de evidencias y sistematización de experiencias.',
      responsibility: 'Compromiso indeclinable con la misión social de la Corporación y la confidencialidad de la población.'
    }
  },
  responsibilities: {
    administrative: 'Cumplimiento del reglamento interno de trabajo, radicación oportuna de trámites institucionales y administración eficiente del equipo de campo.',
    operational: 'Garantizar la realización física de los talleres, eventos, entregas nutricionales y visitas en el territorio asignado.',
    financial: 'Legalización transparente de cajas menores y anticipos, con facturas electrónicas válidas ante la DIAN y soportes de entrega.',
    documentary: 'Custodiar el 100% de los expedientes del proyecto con listas de asistencia, diagnósticos e informes debidamente foliados.',
    community: 'Salvaguardar el bienestar, respeto a la dignidad y confidencialidad absoluta de las familias y niños participantes.',
    monitoringEvaluation: 'Alimentar periódicamente los sistemas de información y presentar alertas tempranas de desviación sobre metas pactadas.'
  },
  version: '2.0 - Aprobada por Junta Directiva',
  lastApprovedDate: '2026-02-15'
};

export const INITIAL_DEMO_AUDIT: Audit = {
  id: 'aud-demo-001',
  code: 'AUD-2026-001',
  status: 'en_proceso',
  isDemo: true,
  currentMoment: 5,
  createdAt: '2026-10-15 08:30',
  updatedAt: '2026-11-08 14:15',

  // MOMENTO 1. PROGRAMACIÓN DE LA AUDITORÍA
  momento1: {
    projectName: 'Proyecto Semillas de Esperanza: Fortalecimiento Nutricional y Psicosocial para Niños y Familias',
    projectCode: 'PROJ-MED-2026-C13',
    gestorName: 'Lic. Valentina Restrepo Salazar',
    gestorCargo: 'Gestora de Proyectos para Sectores Vulnerables',
    gestorArea: 'Dirección Operativa de Proyectos Comunitarios',
    gestorLocation: 'Comuna 13 (San Javier) - Medellín, Antioquia',
    dateProgrammed: '2026-10-15',
    startDate: '2026-10-28',
    endDate: '2026-11-12',
    reason: 'programada',
    auditorLider: 'Ing. Carlos Andrés Montoya',
    auditoresApoyo: ['Dra. Mariana Gómez Vélez'],
    priority: 'alta',
    priorityJustification: 'El proyecto atiende de forma directa a 180 niños, niñas y adolescentes en alto riesgo psicosocial y maneja recursos mixtos de cooperación comunitaria. Requiere verificación estricta de protección de datos, ejecución de talleres y legalización presupuestal.',
    programmingStatus: 'Aprobada',
    approvedBy: 'Dr. Roberto Casas Cárdenas (Coordinador de Auditoría)',
    approvedAt: '2026-10-16 11:00'
  },

  // MOMENTO 2. PLAN DE AUDITORÍA
  momento2: {
    generalObjective: 'Evaluar el cumplimiento de las funciones y responsabilidades del Gestor(a) de Proyectos de la Corporación Social Somos Uno, verificando la adecuada planeación, ejecución, seguimiento y control de los proyectos dirigidos a sectores vulnerables.',
    specificObjectives: [
      'Verificar la articulación de la planeación operativa frente a las necesidades reales diagnosticadas en la Comuna 13.',
      'Comprobar la aplicación de la normativa legal colombiana vigente, en especial la Ley 1581 de 2012 y protección reforzada a la infancia.',
      'Constatar la idoneidad y respaldo probatorio de los informes de gestión y avances físicos y presupuestales reportados.',
      'Evaluar el cumplimiento de las 14 funciones específicas establecidas en el Manual de Funciones del cargo.',
      'Formular hallazgos, conformidades, no conformidades y oportunidades de mejora para el fortalecimiento del impacto social.'
    ],
    scope: 'Revisión exhaustiva al desempeño integral de la Gestora de Proyectos durante el periodo comprendido entre el 1 de mayo de 2026 y el 30 de septiembre de 2026, abarcando actividades de campo en la Comuna 13, expedientes de 180 beneficiarios, informes técnicos radicados y ejecución presupuestal.',
    criteria: [
      'Manual de Funciones institucional de la Corporación Social Somos Uno',
      'Constitución Política de Colombia (Arts. 13, 15, 44)',
      'Ley 1581 de 2012 y Decreto 1377 de 2013 (Protección de datos personales)',
      'Convenio de Asociación N° 045-2026',
      'Procedimiento Operativo Interno P-OP-03 (Ejecución y archivo de proyectos comunitarios)',
      'Norma Técnica ISO 19011:2018'
    ],
    legalNorms: [
      'Constitución Política de 1991',
      'Ley 1581 de 2012 (Habeas Data)',
      'Ley 1098 de 2006 (Código de la Infancia y la Adolescencia)',
      'Ley 1474 de 2011 (Estatuto Anticorrupción)'
    ],
    technicalNorms: [
      'ISO 19011:2018 (Directrices para auditorías de sistemas de gestión)',
      'Manual de Funciones V.2.0 Somos Uno',
      'Guía Metodológica de Marco Lógico'
    ],
    methodology: 'Enfoque mixto que combina: 1) Revisión y contrastación documental de expedientes en oficina; 2) Entrevistas estructuradas a la gestora y equipo psicosocial; 3) Muestreo aleatorio de carpetas de beneficiarios (30% de la población); 4) Visita de observación directa en la sede comunitaria El Socorro.',
    activities: [
      { id: 'act-1', name: 'Reunión formal de apertura y socialización del plan', date: '2026-10-28 09:00', responsible: 'Carlos Montoya (Auditor Líder)', resources: 'Sala de juntas / Conexión institucional' },
      { id: 'act-2', name: 'Revisión de legalidad y consentimientos informados Ley 1581', date: '2026-10-29 10:00', responsible: 'Mariana Gómez (Auditor Apoyo)', resources: 'Expediente digital y archivo físico' },
      { id: 'act-3', name: 'Inspección de informes de avance físico y financiero', date: '2026-10-30 14:00', responsible: 'Carlos Montoya', resources: 'Planillas presupuestales y facturación' },
      { id: 'act-4', name: 'Visita de verificación en campo Comuna 13 - Comedor Comunitario', date: '2026-11-04 09:30', responsible: 'Equipo Auditor', resources: 'Transporte institucional y listas de cotejo' },
      { id: 'act-5', name: 'Consolidación de lista de chequeo y no conformidades', date: '2026-11-06 11:00', responsible: 'Equipo Auditor', resources: 'SOMOS AUDITA Suite' },
      { id: 'act-6', name: 'Reunión de cierre, acta de resultados y compromisos', date: '2026-11-08 14:00', responsible: 'Carlos Montoya y Valentina Restrepo', resources: 'Sala de juntas / Acta de Cierre digital' }
    ],
    responsibles: 'Auditor Líder: Ing. Carlos Montoya; Auditora de Apoyo: Dra. Mariana Gómez; Gestora Auditada: Lic. Valentina Restrepo; Coordinador Supervisor: Dr. Roberto Casas.',
    schedule: 'Del 28 de octubre al 12 de noviembre de 2026, cumpliendo 35 horas de auditoría directa.',
    necessaryResources: 'Acceso a repositorio institucional en la nube, permisos en SOMOS AUDITA, expedientes de Comuna 13, transporte a territorio.',
    requiredDocuments: [
      'Plan operativo anual y matriz de marco lógico del proyecto',
      'Listados de asistencia originales y consentimientos firmados por acudientes',
      'Informes mensuales de gestión de mayo a septiembre de 2026',
      'Comprobantes de entrega de complementos nutricionales',
      'Actas de comités comunitarios y memorias fotográficas'
    ],
    executionDate: '2026-10-28',
    status: 'Aprobado',
    approvedBy: 'Dr. Roberto Casas Cárdenas (Coordinador)',
    approvedAt: '2026-10-20 16:30',
    version: 1
  },

  // MOMENTO 3. ACTA DE APERTURA DE LA AUDITORÍA
  momento3: {
    meetingDate: '2026-10-28',
    meetingTime: '09:00 AM',
    modality: 'Mixta',
    participants: [
      { id: 'p-1', name: 'Ing. Carlos Andrés Montoya', cargo: 'Auditor Líder Senior', roleInAudit: 'Auditor Líder', signed: true, signedAt: '2026-10-28 09:45' },
      { id: 'p-2', name: 'Dra. Mariana Gómez Vélez', cargo: 'Auditora de Apoyo', roleInAudit: 'Auditor de Apoyo', signed: true, signedAt: '2026-10-28 09:47' },
      { id: 'p-3', name: 'Lic. Valentina Restrepo Salazar', cargo: 'Gestora de Proyectos', roleInAudit: 'Gestor Auditado', signed: true, signedAt: '2026-10-28 09:50' },
      { id: 'p-4', name: 'Dr. Roberto Casas Cárdenas', cargo: 'Coordinador de Control Interno', roleInAudit: 'Supervisor de Proceso', signed: true, signedAt: '2026-10-28 09:52' }
    ],
    confirmedObjective: 'Evaluar el cumplimiento de las funciones del cargo de Gestor(a) de Proyectos y la adecuada gestión técnica, comunitaria y legal del Proyecto Semillas de Esperanza en Comuna 13.',
    confirmedScope: 'Periodo mayo a septiembre 2026. Revisión documental, 180 beneficiarios, visita a Comuna 13 e informes de gestión.',
    confirmedCriteria: 'Manual de Funciones institucional, Constitución Política, Ley 1581 de 2012, ISO 19011:2018, Convenio 045-2026.',
    confirmedMethodology: 'Revisión muestral probabilística de expedientes, entrevistas presenciales, cotejo en campo y registro en SOMOS AUDITA.',
    interviewSchedule: 'Martes 29 de octubre a viernes 1 de noviembre: entrevistas individuales y revisión de expedientes en sala técnica.',
    requestedDocumentsList: [
      { id: 'req-1', docName: 'Expedientes físicos foliados de 180 familias beneficiarias', deadline: '2026-10-29 12:00', status: 'Entregado' },
      { id: 'req-2', docName: 'Informes mensuales de avance con soportes financieros de talleres', deadline: '2026-10-30 09:00', status: 'Entregado' },
      { id: 'req-3', docName: 'Formularios de autorización de tratamiento de datos personales de menores', deadline: '2026-10-29 16:00', status: 'Entregado' },
      { id: 'req-4', docName: 'Registro de entrega de kits nutricionales con firma de acudientes', deadline: '2026-10-31 10:00', status: 'Entregado' }
    ],
    observations: 'La gestora auditada expresa plena disposición para suministrar la información requerida y manifiesta que se cuenta con el archivo en oficina central y sede territorial.',
    initialCommitments: [
      { id: 'c-1', commitment: 'Habilitar acceso irrestricto al archivo digital y carpetas compartidas', responsible: 'Lic. Valentina Restrepo', deadline: '2026-10-28 12:00' },
      { id: 'c-2', commitment: 'Garantizar el protocolo de confidencialidad y no divulgación de datos de menores', responsible: 'Equipo Auditor', deadline: '2026-10-28 09:30' }
    ],
    status: 'Aprobada',
    approvedBy: 'Ing. Carlos Andrés Montoya',
    approvedAt: '2026-10-28 10:15'
  },

  // MOMENTO 4. LISTA DE CHEQUEO (4 componentes + manual de funciones)
  momento4: {
    status: 'Finalizada',
    completedAt: '2026-11-06 17:30',
    leadAuditorReview: 'Revisión exhaustiva completada. Se identificaron cumplimientos notables en la vinculación comunitaria, pero se evidenciaron debilidades en los soportes documentales de 2 talleres y en la oportunidad de la conciliación presupuestal.',
    items: [
      // A. NORMAS LEGALES
      {
        id: 'chk-leg-1',
        category: 'normas_legales',
        normOrTitle: 'Constitución Política de Colombia (Arts. 13 y 44)',
        articleOrReq: 'Protección integral, prevalencia de derechos infantiles y dignidad humana',
        description: 'Verificar que las intervenciones comunitarias respeten la dignidad de las familias y prioricen el interés superior de los niños y niñas.',
        result: 'cumple',
        findingDescription: 'Se constató que las dinámicas pedagógicas y la entrega de paquetes nutricionales se efectúan en espacios dignos y con trato cálido y respetuoso.',
        evidenceText: 'Actas de talleres lúdicos, registro de visitas domiciliarias y entrevistas aleatorias a 8 madres líderes de la Comuna 13.',
        attachments: [
          { id: 'att-1', name: 'Acta_Verificacion_Dignidad_Comuna13.pdf', size: '1.2 MB', type: 'application/pdf', uploadDate: '2026-10-29', uploadedBy: 'Mariana Gómez' }
        ],
        reviewDate: '2026-10-29',
        auditorName: 'Dra. Mariana Gómez Vélez',
        observations: 'Excelente apropiación de valores institucionales por parte del equipo comunitario.'
      },
      {
        id: 'chk-leg-2',
        category: 'normas_legales',
        normOrTitle: 'Ley 1581 de 2012 (Protección de Datos Personales)',
        articleOrReq: 'Arts. 5, 7 y 9: Tratamiento de datos sensibles y derechos de niños y adolescentes',
        description: 'Verificar que todos los formularios, fichas socioeconómicas y fotografías cuenten con la debida autorización previa, expresa e informada suscrita por padres o tutores legales.',
        result: 'no_cumple',
        findingDescription: 'En la muestra de talleres comunitarios de julio y agosto de 2026, se identificaron 2 actividades con registros fotográficos y listados donde 14 acudientes no firmaron la casilla de autorización de Habeas Data ni reposan los consentimientos individuales exigidos.',
        evidenceText: 'Planilla de asistencia del Taller "Crianza con Amor" (23 de julio 2026) y "Nutrición Saludable" (14 de agosto 2026) sin firmas en columna de autorización de datos personales.',
        attachments: [
          { id: 'att-2', name: 'Evidencia_Planillas_Sin_HabeasData_Julio.pdf', size: '2.4 MB', type: 'application/pdf', uploadDate: '2026-10-29', uploadedBy: 'Carlos Montoya' }
        ],
        reviewDate: '2026-10-29',
        auditorName: 'Ing. Carlos Andrés Montoya',
        observations: 'Se genera No Conformidad NC-01 por incumplimiento expreso a la Ley 1581 y al protocolo institucional de protección a la infancia.'
      },

      // B. NORMAS TÉCNICAS
      {
        id: 'chk-tec-1',
        category: 'normas_tecnicas',
        normOrTitle: 'ISO 19011:2018 / Procedimiento Interno P-OP-03',
        articleOrReq: 'Numeral 4.2: Conservación de registros y evidencias objetivas de actividades',
        description: 'Verificar que cada actividad programada en el cronograma cuente con sus respectivos soportes documentales: acta firmada, listado de asistentes, informe técnico y evidencia de entregables.',
        result: 'no_cumple',
        findingDescription: 'En el informe de gestión de agosto aparecen reportados como ejecutados dos talleres de fortalecimiento psicosocial comunitario, pero en el archivo físico y digital no reposan las actas ni los listados de participantes suscritos.',
        evidenceText: 'Informe mensual radicado frente a carpeta técnica de evidencias de agosto de 2026; faltan soportes de los talleres del 08 y 22 de agosto.',
        attachments: [
          { id: 'att-3', name: 'Cotejo_Talleres_Vs_Evidencias_Agosto.pdf', size: '1.8 MB', type: 'application/pdf', uploadDate: '2026-10-30', uploadedBy: 'Carlos Montoya' }
        ],
        reviewDate: '2026-10-30',
        auditorName: 'Ing. Carlos Andrés Montoya',
        observations: 'Coincide con el ejemplo estipulado en la directriz de auditoría. Se genera No Conformidad NC-02.'
      },
      {
        id: 'chk-tec-2',
        category: 'normas_tecnicas',
        normOrTitle: 'Procedimiento de Gestión Presupuestal P-FI-02',
        articleOrReq: 'Numeral 5.3: Conciliación presupuestal mensual frente al avance físico',
        description: 'Verificar la presentación oportuna de las legalizaciones de gastos y la coherencia del avance financiero frente al avance de metas físicas.',
        result: 'cumple_parcialmente',
        findingDescription: 'Los gastos cuentan con facturas electrónicas válidas, pero la conciliación presupuestal acumulada del mes de septiembre presentó 18 días hábiles de retraso en su entrega a contabilidad.',
        evidenceText: 'Planilla de radicación contable de legalizaciones N° 104 entregada el 26 de octubre en lugar del 05 de octubre.',
        attachments: [
          { id: 'att-4', name: 'Acta_Radicacion_Extemporanea_Gastos.pdf', size: '890 KB', type: 'application/pdf', uploadDate: '2026-10-30', uploadedBy: 'Mariana Gómez' }
        ],
        reviewDate: '2026-10-30',
        auditorName: 'Dra. Mariana Gómez Vélez',
        observations: 'Se documenta como Oportunidad de Mejora OM-01 para optimizar el cierre contable quincenal.'
      },

      // C. CARACTERIZACIÓN DEL PROCESO
      {
        id: 'chk-car-1',
        category: 'caracterizacion',
        normOrTitle: 'Caracterización del Proceso: Gestión de Proyectos Comunitarios',
        articleOrReq: 'Entradas, Actividades, Salidas y Clientes/Beneficiarios',
        description: 'Revisar si el proceso gestionado tiene formalmente identificados objetivo, alcance, proveedores, entradas, actividades, responsables, recursos, salidas/productos y beneficiarios.',
        result: 'cumple',
        findingDescription: 'El proceso cuenta con la matriz de caracterización aprobada V.3, mapa de riesgos territorial actualizado a 2026 y fichas técnicas de los insumos nutricionales.',
        evidenceText: 'Ficha técnica institucional de caracterización codificada C-PR-01 y manual de procesos vigente.',
        attachments: [
          { id: 'att-5', name: 'Caracterizacion_Proceso_Comunitario_V3.pdf', size: '1.5 MB', type: 'application/pdf', uploadDate: '2026-11-04', uploadedBy: 'Carlos Montoya' }
        ],
        reviewDate: '2026-11-04',
        auditorName: 'Ing. Carlos Andrés Montoya',
        observations: 'Excelente nivel de documentación del flujo de valor del proceso.'
      },
      {
        id: 'chk-car-2',
        category: 'caracterizacion',
        normOrTitle: 'Matriz de Riesgos y Controles del Proceso',
        articleOrReq: 'Identificación de riesgos territoriales y medidas preventivas de mitigación',
        description: 'Verificar la aplicación de controles preventivos frente a riesgos de alteración de orden público en Comuna 13 y deserción escolar.',
        result: 'cumple',
        findingDescription: 'Se evidenció la activación de rutas de contingencia comunitaria cuando se presentaron alertas de seguridad, reprogramando actividades sin incidentes para la población.',
        evidenceText: 'Bitácora de contingencias territoriales y actas de acuerdos de seguridad con líderes barriales.',
        attachments: [],
        reviewDate: '2026-11-04',
        auditorName: 'Dra. Mariana Gómez Vélez',
        observations: 'Manejo asertivo de la relación comunitaria en situaciones de vulnerabilidad.'
      },

      // D. INFORMES
      {
        id: 'chk-inf-1',
        category: 'informes',
        normOrTitle: 'Informes Periódicos de Gestión a la Dirección',
        articleOrReq: 'Oportunidad, contenido, impacto social y metas alcanzadas',
        description: 'Comprobar que el gestor entregue informes completos, oportunos, coherentes y respaldados; revisar avances de metas, presupuesto y beneficiarios.',
        result: 'cumple',
        findingDescription: 'Los informes mensuales de mayo, junio, julio y agosto contienen descripciones detalladas del avance de metas físicas: 172 de 180 niños alcanzados (95.5% de cumplimiento de meta global).',
        evidenceText: 'Informes mensuales N° 1, 2, 3 y 4 con visto bueno de la Coordinación de Proyectos.',
        attachments: [
          { id: 'att-6', name: 'Informe_Semestral_Consolidado_Semillas.pdf', size: '3.1 MB', type: 'application/pdf', uploadDate: '2026-11-05', uploadedBy: 'Carlos Montoya' }
        ],
        reviewDate: '2026-11-05',
        auditorName: 'Ing. Carlos Andrés Montoya',
        observations: 'Informes de alta calidad narrativa y cuantitativa, con excelentes indicadores de satisfacción en beneficiarios.'
      },

      // E. VINCULACIÓN CON MANUAL DE FUNCIONES
      {
        id: 'chk-fun-1',
        category: 'manual_funciones',
        normOrTitle: 'Función Específica N° 1: Formular y planificar proyectos',
        articleOrReq: 'Manual de Funciones: Numeral 1',
        description: 'Verificar la estructuración del cronograma detallado, plan operativo y objetivos con metas verificables.',
        result: 'cumple',
        findingDescription: 'La formulación del proyecto cuenta con matriz de marco lógico rigurosa, presupuesto detallado y cronograma aprobado.',
        evidenceText: 'Documento técnico de formulación del Proyecto Semillas de Esperanza radicado en abril 2026.',
        attachments: [],
        reviewDate: '2026-11-05',
        auditorName: 'Dra. Mariana Gómez Vélez',
        observations: 'Cumplimiento cabal de la función de planeación.'
      },
      {
        id: 'chk-fun-7',
        category: 'manual_funciones',
        normOrTitle: 'Función Específica N° 7: Coordinar actividades con comunidades',
        articleOrReq: 'Manual de Funciones: Numeral 7',
        description: 'Verificar la convocatoria e interacción respetuosa con las familias y beneficiarios en terreno.',
        result: 'cumple',
        findingDescription: 'Constatado en la visita de campo el alto reconocimiento comunitario, confianza y liderazgo positivo de la gestora.',
        evidenceText: 'Entrevistas a líderes comunales del barrio El Socorro y actas de asambleas informativas.',
        attachments: [],
        reviewDate: '2026-11-05',
        auditorName: 'Ing. Carlos Andrés Montoya',
        observations: 'Destacada labor en la articulación con líderes comunitarios locales.'
      },
      {
        id: 'chk-fun-14',
        category: 'manual_funciones',
        normOrTitle: 'Función Específica N° 14: Manejo responsable de datos de beneficiarios',
        articleOrReq: 'Manual de Funciones: Numeral 14',
        description: 'Verificar custodia estricta de datos personales de menores y familias vulnerables.',
        result: 'cumple_parcialmente',
        findingDescription: 'Existe custodia física de carpetas bajo llave, pero se detectó falencia en la recolección del consentimiento expreso en dos talleres masivos (asociado a NC-01).',
        evidenceText: 'Archivo físico verificado en sede; carpetas de beneficiarios organizadas, pero con faltantes de formato en talleres colectivos.',
        attachments: [],
        reviewDate: '2026-11-05',
        auditorName: 'Ing. Carlos Andrés Montoya',
        observations: 'Requiere estandarización del protocolo en actividades extramurales masivas.'
      }
    ]
  },

  // MOMENTO 5. ACTA DE CIERRE DE LA AUDITORÍA
  momento5: {
    meetingDate: '2026-11-08',
    meetingTime: '02:00 PM',
    status: 'Borrador',
    conformidades: [
      {
        id: 'conf-1',
        requirement: 'Constitución Política de Colombia (Art. 13) y Protocolo Comunitario Somos Uno',
        evidence: 'Entrevistas en campo, memorias de talleres y encuestas de satisfacción con promedio 4.8/5.0 en la Comuna 13.',
        description: 'Respeto absoluto por la dignidad humana, trato empático y sin discriminación a las 180 familias participantes del proyecto.',
        observations: 'Se destaca el compromiso y vocación de servicio de la Gestora de Proyectos y su equipo de facilitadores.'
      },
      {
        id: 'conf-2',
        requirement: 'Manual de Funciones - Numeral 1: Formulación técnica del proyecto',
        evidence: 'Matriz de Marco Lógico y Plan Operativo 2026 debidamente aprobados por la Dirección Ejecutiva.',
        description: 'Estructuración metodológica impecable del proyecto, con indicadores SMART y metas claras alineadas con el plan estratégico de la Corporación.',
        observations: 'Modelo de formulación propuesto como buena práctica replicable para otros proyectos de la entidad.'
      },
      {
        id: 'conf-3',
        requirement: 'Caracterización del Proceso: Gestión de Proyectos Comunitarios (C-PR-01)',
        evidence: 'Documentación institucional vigente y aplicación de mapas de riesgos territoriales.',
        description: 'El proceso cuenta con entradas, controles, actividades y salidas claramente mapeadas y conocidas por el equipo operativo.',
        observations: 'Madurez del sistema de gestión a nivel de procesos.'
      }
    ],
    hallazgos: [
      {
        id: 'hal-1',
        description: 'Demora en la radicación de la conciliación contable del mes de septiembre de 2026, generada por retrasos en la remisión de facturas por parte de un proveedor local de refrigerios.',
        objectiveEvidence: 'Planilla de radicación contable N° 104 de fecha 26 de octubre de 2026.',
        criterion: 'Procedimiento P-FI-02 Numeral 5.3',
        area: 'Coordinación de Proyectos / Área Administrativa y Financiera',
        observations: 'No generó pérdida económica, pero afectó los tiempos de cierre contable mensual.'
      },
      {
        id: 'hal-2',
        description: 'Ausencia de lista de chequeo previa a la salida a campo para verificar que los facilitadores lleven consigo los formatos estandarizados de autorización de datos personales.',
        objectiveEvidence: 'Testimonio del equipo facilitador durante las entrevistas del 30 de octubre.',
        criterion: 'Manual de Procedimientos Operativos',
        area: 'Operaciones Comunitarias',
        observations: 'Causa raíz detectada que propició el faltante de firmas en dos talleres comunitarios.'
      }
    ],
    oportunidadesMejora: [
      {
        id: 'om-1',
        situation: 'Cierre presupuestal mensual ajustado y demoras en el reporte de facturación física.',
        opportunity: 'Implementar un formato digital simplificado de pre-legalización semanal vía dispositivo móvil para el gestor en campo.',
        recommendation: 'Diseñar un formulario en la nube que permita cargar fotos de recibos al instante de la compra para que contabilidad pre-valide.',
        responsible: 'Coordinador Administrativo / Gestora de Proyectos',
        expectedResult: 'Reducción de los tiempos de radicación contable de 18 días a máximo 3 días hábiles tras finalizar cada mes.'
      },
      {
        id: 'om-2',
        situation: 'Los consentimientos de protección de datos se diligencian actualmente en hojas sueltas durante los eventos colectivos.',
        opportunity: 'Integrar la autorización de tratamiento de datos en el reverso de la escarapela o en el formulario digital único de inscripción al proyecto.',
        recommendation: 'Vincular el consentimiento al momento de la matrícula de la familia al programa social para no depender de planillas por evento.',
        responsible: 'Asesor Jurídico y Gestora de Proyectos',
        expectedResult: 'Cobertura del 100% de consentimientos informados antes del inicio de los talleres formativos.'
      }
    ],
    noConformidades: [
      {
        id: 'nc-01',
        code: 'NC-01',
        date: '2026-11-06',
        findingWhatWasFound: 'En la revisión documental de los talleres "Crianza con Amor" (23 de julio de 2026) y "Nutrición Saludable" (14 de agosto de 2026), se encontraron listados de asistencia y fotografías grupales de 14 menores y madres acudientes sin la firma de autorización de tratamiento de datos personales.',
        breachedNormOrRequirement: 'Ley 1581 de 2012 (Artículos 5, 7 y 9 sobre datos sensibles y prevalencia de derechos de niños) y Manual de Funciones del cargo (Función 14).',
        howItBreachesNorm: 'Se recolectaron datos identificatorios y registros fotográficos de menores de edad sin contar con la autorización previa, expresa e informada exigida por el marco de Habeas Data para personas de especial protección.',
        associatedConsequencesOrRisks: 'Riesgo legal de sanciones por parte de la Superintendencia de Industria y Comercio (SIC), posibles quejas de padres de familia y vulneración del principio de seguridad y confidencialidad institucional.',
        correctiveActionTreatment: '1) Contactar y recolectar de forma prioritaria las autorizaciones físicas o digitales faltantes con las 14 familias focalizadas; 2) Retirar cautelarmente de cualquier medio de difusión o red social institucional las fotos de dichos eventos hasta contar con el consentimiento pleno; 3) Diseñar una lista de verificación obligatoria para actividades en campo.',
        objectiveEvidence: 'Planillas físicas de asistencia de los talleres de fecha 23 de julio y 14 de agosto de 2026 donde la columna de Habeas Data figura en blanco para 14 participantes.',
        identifiedCause: 'Falta de capacitación al personal facilitador voluntario sobre la obligatoriedad estricta de recolectar el consentimiento antes de iniciar la actividad pedagógica.',
        riskLevel: 'alto',
        consequences: 'Exposición institucional a procesos de inspección y vigilancia; vulneración potencial del derecho a la intimidad y protección de menores.',
        responsibleToSolve: 'Lic. Valentina Restrepo Salazar (Gestora) y Asesoría Jurídica',
        correctiveAction: 'Plan de choque para saneamiento documental de consentimientos, retiro de material gráfico de plataformas y jornada de capacitación a facilitadores.',
        commitmentDate: '2026-11-25',
        status: 'abierta',
        observations: 'Hallazgo crítico que requiere seguimiento prioritario por parte de la Coordinación de Auditoría.',
        gestorClarifications: 'La gestora manifiesta: "Reconozco la omisión en estos dos talleres comunitarios masivos donde la afluencia de familias superó la logística prevista y el voluntario asignado a la mesa de registro omitió solicitar la firma del consentimiento. Me comprometo a visitar personalmente a las 14 familias antes del 20 de noviembre para subsanar los formatos y custodiar debidamente las autorizaciones."'
      },
      {
        id: 'nc-02',
        code: 'NC-02',
        date: '2026-11-06',
        findingWhatWasFound: 'En el informe de gestión de agosto de 2026 aparecen registrados como ejecutados dos talleres psicosociales comunitarios (fechas 08 y 22 de agosto), pero durante la auditoría no se encontraron las actas técnicas, listas de asistencia originales ni evidencias de entrega de refrigerios que comprueben la realización efectiva de dichas dos actividades.',
        breachedNormOrRequirement: 'Procedimiento Interno de Operaciones P-OP-03 (Numeral 4.2 que exige respaldar documentalmente el 100% de las actividades reportadas) y el Convenio 045-2026 (Cláusula 8 de rendición de cuentas).',
        howItBreachesNorm: 'Se certificó en el informe mensual de actividades una gestión que carece de los soportes documentales y verificables requeridos por el procedimiento institucional.',
        associatedConsequencesOrRisks: 'Pérdida de trazabilidad y confiabilidad de los informes de gestión, riesgo de glosas por parte de los financiadores del proyecto y cuestionamientos sobre el cumplimiento de metas.',
        correctiveActionTreatment: '1) Realizar búsqueda exhaustiva y solicitar al facilitador externo la entrega de los borradores o actas originales si existieren; 2) En caso de no existir soporte original, emitir una aclaración formal ante la Coordinación ajustando la meta mensual reportada o reprogramando las sesiones con los beneficiarios; 3) Establecer un control de verificación de soportes previo a la firma de cualquier informe mensual.',
        objectiveEvidence: 'Informe de gestión radicado del mes de agosto de 2026 frente al expediente físico donde faltan las actas y listados correspondientes a las sesiones del 08 y 22 de agosto.',
        identifiedCause: 'El facilitador contratado para estos dos talleres no entregó oportunamente los formatos al terminar las sesiones y la gestora radicó el informe mensual sin hacer el cotejo previo de las evidencias.',
        riskLevel: 'medio',
        consequences: 'Dificultad probatoria para sustentar el cobro de honorarios y refrigerios de esas dos fechas, afectando la credibilidad institucional.',
        responsibleToSolve: 'Lic. Valentina Restrepo Salazar (Gestora de Proyectos)',
        correctiveAction: 'Recuperar los soportes con el facilitador, expedir acta de subsanación y crear un checklist de radicación de informes.',
        commitmentDate: '2026-11-20',
        status: 'abierta',
        observations: 'Ejemplo ilustrativo de la guía de auditoría para verificar la correspondencia estricta entre reportes y evidencias.',
        gestorClarifications: 'La gestora aclara: "Los dos talleres sí se llevaron a cabo con la psicóloga de apoyo en el salón comunal de San Javier; sin embargo, ella conservó las planillas físicas en su portafolio personal y no las archivó en la carpeta general antes de mi viaje de vacaciones. Ya me contacté con ella y las carpetas serán aportadas a la coordinación a más tardar este viernes."'
      }
    ],
    gestorGeneralComments: 'Agradezco al equipo auditor la rigurosidad, el enfoque pedagógico y el respeto mantenido a lo largo de las visitas. Las dos no conformidades y oportunidades de mejora identificadas serán asumidas con máxima seriedad como una oportunidad de fortalecimiento institucional para que nuestros proyectos con familias vulnerables sigan siendo un referente de calidad y transparencia.',
    closingCommitments: [
      { id: 'com-1', commitment: 'Presentar plan de acción detallado para subsanar NC-01 y NC-02', responsible: 'Lic. Valentina Restrepo', deadline: '2026-11-15' },
      { id: 'com-2', commitment: 'Auditoría de seguimiento documental a los compromisos', responsible: 'Ing. Carlos Montoya', deadline: '2026-11-30' },
      { id: 'com-3', commitment: 'Emisión del informe final consolidado de auditoría', responsible: 'Equipo Auditor', deadline: '2026-11-12' }
    ]
  },

  // MOMENTO 6. INFORME DE LA AUDITORÍA
  momento6: {
    title: 'Informe Consolidado de Auditoría Integral al Cargo de Gestor(a) de Proyectos',
    generatedAt: '2026-11-08 14:30',
    version: 1,
    status: 'Borrador',
    approvedBy: undefined,
    approvedAt: undefined,
    executiveSummary: 'La auditoría integral desarrollada al cargo de Gestor(a) de Proyectos para Sectores Vulnerables en el marco del Proyecto Semillas de Esperanza (Comuna 13 de Medellín) evidenció un desempeño sobresaliente en la articulación comunitaria, calidez humana y cumplimiento de objetivos de impacto social (95.5% de cobertura en la población objetivo). No obstante, se establecieron dos (2) No Conformidades en los componentes de cumplimiento legal (Ley 1581 de protección de datos de menores) y soporte probatorio de informes (falta de actas de dos talleres), así como dos (2) Oportunidades de Mejora relativas a la oportunidad contable y la digitalización de consentimientos.',
    methodologyConducted: 'Se aplicó la metodología internacional ISO 19011:2018 estructurada en los 7 momentos obligatorios de SOMOS AUDITA. Se evaluaron normas legales, normas técnicas, caracterización del proceso, informes de gestión y el cumplimiento puntual de las 14 funciones específicas del cargo.',
    riskAnalysis: 'El riesgo global del proyecto es evaluado como MODERADO CONTROLADO. Los riesgos legales derivados del tratamiento de datos de menores son mitigables en el corto plazo mediante el plan de contingencia acordado. No se evidenciaron indicios de desvío de fondos ni malversación de recursos.',
    generalConclusions: [
      'El cargo de Gestor(a) de Proyectos es desempeñado con alto compromiso ético y vocación comunitaria por parte de la titular Lic. Valentina Restrepo Salazar.',
      'Existe coherencia entre las necesidades territoriales de la Comuna 13 y las actividades pedagógicas y nutricionales desplegadas por la Corporación Social Somos Uno.',
      'Es imperativo blindar los procesos de recolección de consentimientos informados de menores para garantizar el cumplimiento pleno de la Ley 1581 de 2012.',
      'Se requiere consolidar un mecanismo de control de calidad documental previo a la radicación de informes mensuales de gestión ante la dirección.'
    ],
    recommendations: [
      { id: 'rec-1', text: 'Implementar el kit de consentimientos informados digitalizados previo al inicio de cualquier nuevo ciclo de proyectos comunitarios.', responsible: 'Coordinación de Proyectos y Gestora', priority: 'alta', deadline: '2026-12-15' },
      { id: 'rec-2', text: 'Capacitar a todo el voluntariado y facilitadores en protocolos de recolección y custodia de evidencias de campo.', responsible: 'Auditoría y Gestión Humana', priority: 'media', deadline: '2026-11-30' },
      { id: 'rec-3', text: 'Adoptar un tablero digital de verificación documental donde ningún informe pueda radicarse sin adjuntar las actas correspondientes.', responsible: 'Área de Sistemas / SOMOS AUDITA', priority: 'alta', deadline: '2026-12-01' }
    ],
    annexes: [
      { id: 'anx-1', title: 'Ficha de Programación AUD-2026-001', description: 'Programación formal aprobada con designación de equipo auditor', reference: 'Momento 1' },
      { id: 'anx-2', title: 'Plan de Auditoría Aprobado', description: 'Agenda y criterios técnicos concertados', reference: 'Momento 2' },
      { id: 'anx-3', title: 'Acta de Apertura Firmada', description: 'Formalización de inicio con firmas de los participantes', reference: 'Momento 3' },
      { id: 'anx-4', title: 'Matriz Completa de Lista de Chequeo', description: 'Evaluación de 10 criterios de normas, proceso e informes', reference: 'Momento 4' },
      { id: 'anx-5', title: 'Acta de Cierre y Fichas de No Conformidad', description: 'Detalle de conformidades, hallazgos y No Conformidades NC-01 y NC-02', reference: 'Momento 5' }
    ]
  },

  // MOMENTO 7. EVALUACIÓN DE LOS AUDITORES
  momento7: {
    status: 'Completada',
    completedAt: '2026-11-08 15:10',
    evaluations: [
      {
        id: 'eval-1',
        auditorId: 'usr-3',
        auditorName: 'Ing. Carlos Andrés Montoya',
        role: 'Auditor Líder',
        ratings: {
          conocimientoNormas: 5,
          preparacion: 5,
          organizacion: 4,
          responsabilidad: 5,
          puntualidad: 5,
          comunicacion: 5,
          imparcialidad: 5,
          objetividad: 5,
          manejoEvidencias: 4,
          identificacionHallazgos: 5,
          elaboracionInformes: 5,
          confidencialidad: 5,
          trabajoEquipo: 4
        },
        averageScore: 4.77,
        strengths: 'Excelente dominio de la norma ISO 19011 y de la legislación colombiana aplicable. Trato respetuoso y constructivo durante las entrevistas, generando un ambiente de confianza sin perder el rigor técnico.',
        areasForImprovement: 'Optimizar los tiempos de digitalización de soportes pesados en la plataforma para evitar congestión durante las jornadas de cierre.',
        observations: 'Desempeño sobresaliente como auditor líder. Condujo el proceso con total imparcialidad y objetividad.',
        trainingRecommendations: 'Actualización en el nuevo estándar de gestión de riesgos territoriales y herramientas de analítica de datos.',
        evaluatedBy: 'Dr. Roberto Casas Cárdenas (Coordinador de Auditoría)',
        evaluationDate: '2026-11-08'
      },
      {
        id: 'eval-2',
        auditorId: 'usr-4',
        auditorName: 'Dra. Mariana Gómez Vélez',
        role: 'Auditor de Apoyo',
        ratings: {
          conocimientoNormas: 4,
          preparacion: 4,
          organizacion: 5,
          responsabilidad: 5,
          puntualidad: 4,
          comunicacion: 5,
          imparcialidad: 5,
          objetividad: 4,
          manejoEvidencias: 5,
          identificacionHallazgos: 4,
          elaboracionInformes: 4,
          confidencialidad: 5,
          trabajoEquipo: 5
        },
        averageScore: 4.54,
        strengths: 'Gran capacidad de escucha en terreno y minuciosidad en la revisión de carpetas familiares y consentimientos de Habeas Data.',
        areasForImprovement: 'Fortalecer la redacción sintética de hallazgos en las fichas de no conformidad.',
        observations: 'Excelente apoyo técnico y humano. Generó empatía con el personal auditado.',
        trainingRecommendations: 'Taller avanzado sobre formulación de no conformidades con enfoque de causa raíz 5 Porqués.',
        evaluatedBy: 'Dr. Roberto Casas Cárdenas (Coordinador de Auditoría)',
        evaluationDate: '2026-11-08'
      }
    ]
  }
};

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-15 08:30:12',
    userName: 'Roberto Casas',
    userRole: 'COORDINADOR_AUDITORIA',
    action: 'Creación de Programación',
    module: 'Momento 1 - Programación',
    details: 'Se programó la auditoría AUD-2026-001 para el Proyecto Semillas de Esperanza.'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-16 11:00:45',
    userName: 'Roberto Casas',
    userRole: 'COORDINADOR_AUDITORIA',
    action: 'Aprobación de Programación',
    module: 'Momento 1 - Programación',
    details: 'Se aprobó la programación y se asignó como Auditor Líder a Carlos Andrés Montoya.'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-20 16:30:20',
    userName: 'Carlos Andrés Montoya',
    userRole: 'AUDITOR_LIDER',
    action: 'Aprobación de Plan de Auditoría',
    module: 'Momento 2 - Plan',
    details: 'Se aprobó el plan de auditoría versión 1 con 6 actividades clave.'
  },
  {
    id: 'log-4',
    timestamp: '2026-10-28 10:15:05',
    userName: 'Carlos Andrés Montoya',
    userRole: 'AUDITOR_LIDER',
    action: 'Firma de Acta de Apertura',
    module: 'Momento 3 - Acta Apertura',
    details: 'Se registró la asistencia y firma electrónica de los 4 participantes.'
  },
  {
    id: 'log-5',
    timestamp: '2026-11-06 17:30:19',
    userName: 'Mariana Gómez',
    userRole: 'AUDITOR_APOYO',
    action: 'Diligenciamiento Lista de Chequeo',
    module: 'Momento 4 - Lista de Chequeo',
    details: 'Se completaron 10 criterios evaluados y se adjuntaron 6 evidencias documentales.'
  },
  {
    id: 'log-6',
    timestamp: '2026-11-08 14:15:40',
    userName: 'Carlos Andrés Montoya',
    userRole: 'AUDITOR_LIDER',
    action: 'Registro de No Conformidades en Acta de Cierre',
    module: 'Momento 5 - Acta Cierre',
    details: 'Se documentaron NC-01 y NC-02 respondiendo las 5 preguntas obligatorias y se registraron comentarios de la gestora.'
  }
];
