export type UserRole =
  | 'ADMINISTRADOR'
  | 'COORDINADOR_AUDITORIA'
  | 'AUDITOR_LIDER'
  | 'AUDITOR_APOYO'
  | 'GESTOR_AUDITADO'
  | 'DIRECCION_ADMINISTRATIVA';

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  cargo: string;
  active: boolean;
  phone?: string;
  lastLogin?: string;
  avatar?: string;
}

export type PriorityLevel = 'alta' | 'media' | 'baja' | 'alto' | 'medio' | 'bajo';

export type AuditReason =
  | 'programada'
  | 'seguimiento'
  | 'especial'
  | 'situacion_identificada';

export type AuditStatus =
  | 'programada'
  | 'en_proceso'
  | 'en_revision'
  | 'finalizada';

export type CheckResult =
  | 'cumple'
  | 'no_cumple'
  | 'cumple_parcialmente'
  | 'no_aplica'
  | 'sin_evaluar';

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  url?: string;
  uploadedBy: string;
}

export interface CheckItem {
  id: string;
  category: 'normas_legales' | 'normas_tecnicas' | 'caracterizacion' | 'informes' | 'manual_funciones';
  normOrTitle: string;
  articleOrReq: string;
  description: string;
  result: CheckResult;
  findingDescription: string;
  evidenceText: string;
  attachments: Attachment[];
  reviewDate: string;
  auditorName: string;
  observations: string;
  customAdded?: boolean;
}

export interface NonConformity {
  id: string;
  code: string; // e.g. NC-01
  date: string;
  findingWhatWasFound: string; // 1. ¿Cuál fue el hallazgo y qué fue lo que se encontró?
  breachedNormOrRequirement: string; // 2. ¿Qué norma o requisito se incumplió?
  howItBreachesNorm: string; // 3. ¿Cómo se está violando esa norma?
  associatedConsequencesOrRisks: string; // 4. ¿Cuáles son las posibles consecuencias o riesgos asociados?
  correctiveActionTreatment: string; // 5. ¿Qué se debe hacer para solucionar la no conformidad?
  objectiveEvidence: string;
  identifiedCause: string;
  riskLevel: PriorityLevel;
  consequences: string;
  responsibleToSolve: string;
  correctiveAction: string;
  commitmentDate: string;
  status: 'abierta' | 'en_tratamiento' | 'cerrada';
  observations: string;
  gestorClarifications: string;
}

export interface Conformity {
  id: string;
  requirement: string;
  evidence: string;
  description: string;
  observations: string;
}

export interface Finding {
  id: string;
  description: string;
  objectiveEvidence: string;
  criterion: string;
  area: string;
  observations: string;
}

export interface ImprovementOpportunity {
  id: string;
  situation: string;
  opportunity: string;
  recommendation: string;
  responsible: string;
  expectedResult: string;
}

export interface Participant {
  id: string;
  name: string;
  cargo: string;
  roleInAudit: string;
  signed: boolean;
  signedAt?: string;
}

export interface AuditorEvaluation {
  id: string;
  auditorId: string;
  auditorName: string;
  role: string;
  ratings: {
    conocimientoNormas: number;
    preparacion: number;
    organizacion: number;
    responsabilidad: number;
    puntualidad: number;
    comunicacion: number;
    imparcialidad: number;
    objetividad: number;
    manejoEvidencias: number;
    identificacionHallazgos: number;
    elaboracionInformes: number;
    confidencialidad: number;
    trabajoEquipo: number;
  };
  averageScore: number;
  strengths: string;
  areasForImprovement: string;
  observations: string;
  trainingRecommendations: string;
  evaluatedBy: string;
  evaluationDate: string;
}

export interface Audit {
  id: string;
  code: string; // e.g. AUD-2026-001
  status: AuditStatus;
  isDemo?: boolean;
  currentMoment: number; // 1 to 7
  createdAt: string;
  updatedAt: string;

  // MOMENTO 1
  momento1: {
    projectName: string;
    projectCode: string;
    gestorName: string;
    gestorCargo: string;
    gestorArea: string;
    gestorLocation: string;
    dateProgrammed: string;
    startDate: string;
    endDate: string;
    reason: AuditReason;
    auditorLider: string;
    auditoresApoyo: string[];
    priority: PriorityLevel;
    priorityJustification: string;
    programmingStatus: 'Borrador' | 'Programada' | 'En revisión' | 'Aprobada';
    approvedBy?: string;
    approvedAt?: string;
  };

  // MOMENTO 2
  momento2: {
    generalObjective: string;
    specificObjectives: string[];
    scope: string;
    criteria: string[];
    legalNorms: string[];
    technicalNorms: string[];
    methodology: string;
    activities: { id: string; name: string; date: string; responsible: string; resources: string }[];
    responsibles: string;
    schedule: string;
    necessaryResources: string;
    requiredDocuments: string[];
    executionDate: string;
    status: 'Borrador' | 'En revisión' | 'Aprobado' | 'Con observaciones';
    approvedBy?: string;
    approvedAt?: string;
    version: number;
  };

  // MOMENTO 3
  momento3: {
    meetingDate: string;
    meetingTime: string;
    modality: 'Presencial' | 'Virtual' | 'Mixta';
    participants: Participant[];
    confirmedObjective: string;
    confirmedScope: string;
    confirmedCriteria: string;
    confirmedMethodology: string;
    interviewSchedule: string;
    requestedDocumentsList: { id: string; docName: string; deadline: string; status: 'Pendiente' | 'Entregado' }[];
    observations: string;
    initialCommitments: { id: string; commitment: string; responsible: string; deadline: string }[];
    status: 'Borrador' | 'Firmada' | 'Aprobada';
    approvedBy?: string;
    approvedAt?: string;
  };

  // MOMENTO 4
  momento4: {
    items: CheckItem[];
    status: 'Borrador' | 'En curso' | 'Finalizada';
    completedAt?: string;
    leadAuditorReview: string;
  };

  // MOMENTO 5
  momento5: {
    meetingDate: string;
    meetingTime: string;
    conformidades: Conformity[];
    hallazgos: Finding[];
    oportunidadesMejora: ImprovementOpportunity[];
    noConformidades: NonConformity[];
    gestorGeneralComments: string;
    closingCommitments: { id: string; commitment: string; responsible: string; deadline: string }[];
    status: 'Borrador' | 'En revisión' | 'Aprobada';
    approvedBy?: string;
    approvedAt?: string;
  };

  // MOMENTO 6
  momento6: {
    title: string;
    generatedAt: string;
    version: number;
    status: 'Borrador' | 'En revisión' | 'Aprobado';
    approvedBy?: string;
    approvedAt?: string;
    executiveSummary: string;
    methodologyConducted: string;
    riskAnalysis: string;
    generalConclusions: string[];
    recommendations: { id: string; text: string; responsible: string; priority: PriorityLevel; deadline: string }[];
    annexes: { id: string; title: string; description: string; reference: string }[];
  };

  // MOMENTO 7
  momento7: {
    evaluations: AuditorEvaluation[];
    status: 'Pendiente' | 'Completada';
    completedAt?: string;
  };
}

export interface LegalNormItem {
  id: string;
  name: string;
  numberAndYear: string;
  description: string;
  relatedArticles: string;
  applicabilitySomosUno: string;
  consultUrl: string;
  validityStatus: 'Vigente' | 'En revisión' | 'Modificada';
  type: 'legal' | 'tecnica';
}

export interface JobFunctionItem {
  id: string;
  number: number;
  title: string;
  description: string;
  verificationGuideline: string;
  category: 'Planeación' | 'Ejecución' | 'Seguimiento' | 'Documentación' | 'Comunidad';
  status: 'Propuesta' | 'Aprobada Oficial';
}

export interface JobDescription {
  jobTitle: string;
  department: string;
  immediateSupervisor: string;
  jobLevel: string;
  location: string;
  mainObjective: string;
  generalFunctions: string[];
  specificFunctions: JobFunctionItem[];
  profile: {
    education: string;
    experience: string;
    technicalKnowledge: string[];
    laborCompetencies: string[];
    skills: {
      communication: string;
      leadership: string;
      teamwork: string;
      planning: string;
      organization: string;
      responsibility: string;
    };
  };
  responsibilities: {
    administrative: string;
    operational: string;
    financial: string;
    documentary: string;
    community: string;
    monitoringEvaluation: string;
  };
  version: string;
  lastApprovedDate: string;
}

export interface PlatformConfig {
  corporateName: string;
  appName: string;
  slogan: string;
  cityYear: string;
  primaryColor: string;
  accentColor: string;
  logoUrl?: string;
  welcomeMessage: string;
  documentHeaders: {
    actaAperturaTitle: string;
    actaCierreTitle: string;
    informeTitle: string;
    footerText: string;
  };
  permissions: {
    [key in UserRole]: {
      canCreateAudit: boolean;
      canApproveMoments: boolean;
      canEditForms: boolean;
      canManageUsers: boolean;
      canAccessAdminEditor: boolean;
      canViewConfidentialBeneficiaryData: boolean;
      canExportData: boolean;
      canDeleteAudit: boolean;
    };
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  module: string;
  details: string;
}

export interface ChangeVersion {
  id: string;
  timestamp: string;
  author: string;
  summary: string;
  configSnapshot: Partial<PlatformConfig>;
}
