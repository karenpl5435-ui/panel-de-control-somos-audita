import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Audit,
  AuditLogEntry,
  JobDescription,
  LegalNormItem,
  PlatformConfig,
  User,
  UserRole
} from '../types';
import {
  INITIAL_AUDIT_LOGS,
  INITIAL_CONFIG,
  INITIAL_DEMO_AUDIT,
  INITIAL_JOB_DESCRIPTION,
  INITIAL_LEGAL_NORMS,
  INITIAL_USERS
} from '../data/initialData';

interface Toast {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation & View
  activeView: string;
  setActiveView: (view: string) => void;
  selectedAuditId: string;
  setSelectedAuditId: (id: string) => void;
  activeAudit: Audit | undefined;

  // Authentication & Users
  currentUser: User;
  users: User[];
  isLoggedIn: boolean;
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  switchUserRole: (role: UserRole) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;

  // Audits CRUD
  audits: Audit[];
  createAudit: (data: Partial<Audit['momento1']>) => Audit;
  updateAudit: (audit: Audit) => void;
  deleteAudit: (id: string) => boolean;
  updateAuditMomento: (
    auditId: string,
    momentoKey: 'momento1' | 'momento2' | 'momento3' | 'momento4' | 'momento5' | 'momento6' | 'momento7',
    data: any
  ) => void;

  // Job Functions Manual
  jobManual: JobDescription;
  updateJobManual: (manual: JobDescription) => void;

  // Legal Norms
  legalNorms: LegalNormItem[];
  addLegalNorm: (norm: Omit<LegalNormItem, 'id'>) => void;
  updateLegalNorm: (norm: LegalNormItem) => void;
  deleteLegalNorm: (id: string) => void;

  // Platform Config & Admin Editor
  config: PlatformConfig;
  updateConfig: (newConfig: Partial<PlatformConfig>) => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (action: string, module: string, details: string) => void;

  // System actions (Backups, Export, Demo reset)
  exportDatabaseJSON: () => void;
  importDatabaseJSON: (jsonStr: string) => boolean;
  resetToDemoData: () => void;
  exportToCSV: (rows: Record<string, any>[], filename: string) => void;

  // Notifications & Toast
  toasts: Toast[];
  showToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  unreadCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_AUDITS = 'somos_audita_data_v2';
const STORAGE_KEY_USERS = 'somos_audita_users_v2';
const STORAGE_KEY_CONFIG = 'somos_audita_config_v2';
const STORAGE_KEY_JOB = 'somos_audita_job_v2';
const STORAGE_KEY_NORMS = 'somos_audita_norms_v2';
const STORAGE_KEY_LOGS = 'somos_audita_logs_v2';
const STORAGE_KEY_CURRENT_USER = 'somos_audita_current_user_v2';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initial State from LocalStorage or Defaults
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERS);
      return stored ? JSON.parse(stored) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (stored) {
        const found = JSON.parse(stored);
        if (found && found.id) return found;
      }
      return INITIAL_USERS[0]; // Admin by default
    } catch {
      return INITIAL_USERS[0];
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [audits, setAudits] = useState<Audit[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUDITS);
      return stored ? JSON.parse(stored) : [INITIAL_DEMO_AUDIT];
    } catch {
      return [INITIAL_DEMO_AUDIT];
    }
  });

  const [selectedAuditId, setSelectedAuditId] = useState<string>(() => {
    return INITIAL_DEMO_AUDIT.id;
  });

  const [config, setConfig] = useState<PlatformConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
      return stored ? JSON.parse(stored) : INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  });

  const [jobManual, setJobManual] = useState<JobDescription>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_JOB);
      return stored ? JSON.parse(stored) : INITIAL_JOB_DESCRIPTION;
    } catch {
      return INITIAL_JOB_DESCRIPTION;
    }
  });

  const [legalNorms, setLegalNorms] = useState<LegalNormItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_NORMS);
      return stored ? JSON.parse(stored) : INITIAL_LEGAL_NORMS;
    } catch {
      return INITIAL_LEGAL_NORMS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LOGS);
      return stored ? JSON.parse(stored) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [activeView, setActiveView] = useState<string>('dashboard');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 2. Persistence sync effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AUDITS, JSON.stringify(audits));
    } catch (e) {
      console.error('Error saving audits to localStorage', e);
    }
  }, [audits]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to localStorage', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('Error saving config to localStorage', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_JOB, JSON.stringify(jobManual));
    } catch (e) {
      console.error('Error saving job manual to localStorage', e);
    }
  }, [jobManual]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NORMS, JSON.stringify(legalNorms));
    } catch (e) {
      console.error('Error saving norms to localStorage', e);
    }
  }, [legalNorms]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(auditLogs));
    } catch (e) {
      console.error('Error saving logs to localStorage', e);
    }
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(currentUser));
    } catch (e) {
      console.error('Error saving current user to localStorage', e);
    }
  }, [currentUser]);

  // Toast Helpers
  const showToast = (text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAuditLog = (action: string, module: string, details: string) => {
    const newLog: AuditLogEntry = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userName: currentUser.fullName,
      userRole: currentUser.role,
      action,
      module,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Auth & Roles
  const login = (username: string, _password?: string) => {
    const userFound = users.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase()
    );
    if (userFound && userFound.active) {
      setCurrentUser(userFound);
      setIsLoggedIn(true);
      showToast(`Bienvenido(a), ${userFound.fullName}`, 'success');
      addAuditLog('Inicio de sesión', 'Autenticación', `Acceso concedido al usuario ${userFound.username}`);
      return true;
    }
    showToast('Credenciales no válidas o usuario inactivo', 'error');
    return false;
  };

  const logout = () => {
    addAuditLog('Cierre de sesión', 'Autenticación', `Cierre de sesión del usuario ${currentUser.username}`);
    setIsLoggedIn(false);
    showToast('Sesión cerrada correctamente', 'info');
  };

  const switchUserRole = (role: UserRole) => {
    const matched = users.find((u) => u.role === role);
    if (matched) {
      setCurrentUser(matched);
      setIsLoggedIn(true);
      showToast(`Perfil cambiado a: ${matched.role} (${matched.fullName})`, 'info');
      addAuditLog('Cambio rápido de perfil', 'Administración de Usuarios', `Perfil activo: ${matched.role}`);
    }
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: 'usr-' + Date.now(),
      active: true,
      lastLogin: 'Nunca'
    };
    setUsers((prev) => [...prev, newUser]);
    addAuditLog('Creación de usuario', 'Gestión de Usuarios', `Creado usuario ${newUser.username} con rol ${newUser.role}`);
    showToast(`Usuario ${newUser.username} registrado exitosamente`, 'success');
  };

  const updateUser = (updated: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    if (currentUser.id === updated.id) {
      setCurrentUser(updated);
    }
    addAuditLog('Actualización de usuario', 'Gestión de Usuarios', `Modificados datos de ${updated.username}`);
    showToast(`Usuario ${updated.username} actualizado`, 'success');
  };

  const deleteUser = (id: string) => {
    if (users.length <= 1) {
      showToast('No se puede eliminar el único usuario del sistema', 'warning');
      return;
    }
    const target = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addAuditLog('Eliminación de usuario', 'Gestión de Usuarios', `Eliminado usuario ${target?.username}`);
    showToast('Usuario eliminado del sistema', 'info');
  };

  // Audits CRUD
  const activeAudit = audits.find((a) => a.id === selectedAuditId) || audits[0];

  const createAudit = (progData: Partial<Audit['momento1']>): Audit => {
    const count = audits.length + 1;
    const newCode = `AUD-${new Date().getFullYear()}-${String(count).padStart(3, '0')}`;
    const newId = 'aud-' + Date.now();

    const newAudit: Audit = {
      id: newId,
      code: newCode,
      status: 'programada',
      currentMoment: 1,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      isDemo: false,
      momento1: {
        projectName: progData.projectName || 'Nuevo Proyecto Social en Comunidad Vulnerable',
        projectCode: progData.projectCode || `PROJ-${newCode}`,
        gestorName: progData.gestorName || 'Lic. Valentina Restrepo Salazar',
        gestorCargo: progData.gestorCargo || 'Gestor(a) de Proyectos',
        gestorArea: progData.gestorArea || 'Área Social y Comunitaria',
        gestorLocation: progData.gestorLocation || 'Medellín, Antioquia',
        dateProgrammed: progData.dateProgrammed || new Date().toISOString().slice(0, 10),
        startDate: progData.startDate || new Date().toISOString().slice(0, 10),
        endDate: progData.endDate || new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
        reason: progData.reason || 'programada',
        auditorLider: progData.auditorLider || currentUser.fullName,
        auditoresApoyo: progData.auditoresApoyo || ['Dra. Mariana Gómez Vélez'],
        priority: progData.priority || 'media',
        priorityJustification: progData.priorityJustification || 'Auditoría interna periódica de control de gestión y calidad.',
        programmingStatus: 'Programada',
        approvedBy: currentUser.fullName,
        approvedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
      },
      momento2: {
        generalObjective: 'Evaluar el cumplimiento de las funciones y responsabilidades del Gestor(a) de Proyectos de la Corporación Social Somos Uno, verificando la adecuada planeación, ejecución, seguimiento y control de los proyectos dirigidos a sectores vulnerables.',
        specificObjectives: [
          'Verificar la planeación técnica y cronograma frente a necesidades de la comunidad.',
          'Comprobar la aplicación de la Ley 1581 de 2012 y normatividad de protección a menores.',
          'Revisar la coherencia y respaldo probatorio de los informes de gestión radicados.',
          'Evaluar el cumplimiento de las funciones específicas del cargo.'
        ],
        scope: `Revisión documental, operativa y de campo al proyecto ${progData.projectName || 'Social'} en el periodo vigente.`,
        criteria: [
          'Manual de Funciones institucional Somos Uno',
          'Constitución Política de Colombia',
          'Ley 1581 de 2012 (Protección de Datos)',
          'ISO 19011:2018 Directrices de Auditoría'
        ],
        legalNorms: ['Constitución Política de 1991', 'Ley 1581 de 2012'],
        technicalNorms: ['ISO 19011:2018', 'Manual de Funciones Institucional'],
        methodology: 'Revisión documental, entrevistas estructuradas, muestreo aleatorio de evidencias y visita a territorio.',
        activities: [
          { id: 'act-1', name: 'Acta de apertura y revisión inicial', date: new Date().toISOString().slice(0, 10), responsible: currentUser.fullName, resources: 'Sala técnica' }
        ],
        responsibles: `Auditor Líder: ${progData.auditorLider || currentUser.fullName}; Gestor Auditado: ${progData.gestorName || 'Gestor'}`,
        schedule: '15 días hábiles según programación',
        necessaryResources: 'Acceso a expedientes, repositorio digital y formatos institucionales',
        requiredDocuments: [
          'Plan operativo del proyecto',
          'Listados de asistencia y consentimientos de datos',
          'Informes mensuales de avance'
        ],
        executionDate: progData.startDate || new Date().toISOString().slice(0, 10),
        status: 'Borrador',
        version: 1
      },
      momento3: {
        meetingDate: progData.startDate || new Date().toISOString().slice(0, 10),
        meetingTime: '09:00 AM',
        modality: 'Presencial',
        participants: [
          { id: 'p-1', name: progData.auditorLider || currentUser.fullName, cargo: 'Auditor Líder', roleInAudit: 'Auditor Líder', signed: true, signedAt: new Date().toISOString().slice(0, 16) },
          { id: 'p-2', name: progData.gestorName || 'Gestor(a)', cargo: 'Gestor(a) de Proyectos', roleInAudit: 'Gestor Auditado', signed: false }
        ],
        confirmedObjective: 'Evaluar el cumplimiento de las funciones del cargo y la correcta gestión comunitaria.',
        confirmedScope: 'Periodo de ejecución del proyecto programado.',
        confirmedCriteria: 'Manual de funciones, normas legales y técnicas aplicables.',
        confirmedMethodology: 'Revisión documental, entrevistas y cotejo de evidencias.',
        interviewSchedule: 'Según agenda concertada en el plan.',
        requestedDocumentsList: [
          { id: 'req-1', docName: 'Carpetas de beneficiarios y consentimientos informados', deadline: 'En 3 días', status: 'Pendiente' },
          { id: 'req-2', docName: 'Informes mensuales de actividades y ejecución', deadline: 'En 3 días', status: 'Pendiente' }
        ],
        observations: 'Apertura formal de la auditoría.',
        initialCommitments: [
          { id: 'com-init-1', commitment: 'Entrega de expedientes completos para revisión', responsible: progData.gestorName || 'Gestor', deadline: 'Próxima semana' }
        ],
        status: 'Borrador'
      },
      momento4: {
        status: 'Borrador',
        leadAuditorReview: '',
        items: INITIAL_DEMO_AUDIT.momento4.items.map((item, idx) => ({
          ...item,
          id: `chk-item-${newId}-${idx}`,
          result: 'sin_evaluar',
          findingDescription: '',
          evidenceText: '',
          attachments: [],
          observations: ''
        }))
      },
      momento5: {
        meetingDate: progData.endDate || new Date().toISOString().slice(0, 10),
        meetingTime: '02:00 PM',
        status: 'Borrador',
        conformidades: [],
        hallazgos: [],
        oportunidadesMejora: [],
        noConformidades: [],
        gestorGeneralComments: '',
        closingCommitments: []
      },
      momento6: {
        title: `Informe Consolidado de Auditoría ${newCode}`,
        generatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        version: 1,
        status: 'Borrador',
        executiveSummary: '',
        methodologyConducted: '',
        riskAnalysis: '',
        generalConclusions: [],
        recommendations: [],
        annexes: []
      },
      momento7: {
        status: 'Pendiente',
        evaluations: []
      }
    };

    setAudits((prev) => [newAudit, ...prev]);
    setSelectedAuditId(newId);
    addAuditLog('Creación de auditoría', 'Momento 1 - Programación', `Creada nueva auditoría ${newCode} para ${newAudit.momento1.projectName}`);
    showToast(`Auditoría ${newCode} programada con éxito`, 'success');
    return newAudit;
  };

  const updateAudit = (updated: Audit) => {
    const withTimestamp = {
      ...updated,
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setAudits((prev) => prev.map((a) => (a.id === updated.id ? withTimestamp : a)));
    addAuditLog('Actualización de auditoría', `Auditoría ${updated.code}`, `Actualizados datos de auditoría`);
    showToast(`Auditoría ${updated.code} actualizada correctamente`, 'success');
  };

  const updateAuditMomento = (
    auditId: string,
    momentoKey: 'momento1' | 'momento2' | 'momento3' | 'momento4' | 'momento5' | 'momento6' | 'momento7',
    data: any
  ) => {
    setAudits((prev) =>
      prev.map((a) => {
        if (a.id === auditId) {
          const updated = {
            ...a,
            [momentoKey]: data,
            updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
          };
          return updated;
        }
        return a;
      })
    );
    showToast(`Guardados cambios en ${momentoKey.toUpperCase()}`, 'success');
    addAuditLog('Guardado de momento', momentoKey, `Actualizado ${momentoKey} en auditoría ${activeAudit?.code}`);
  };

  const deleteAudit = (id: string): boolean => {
    const target = audits.find((a) => a.id === id);
    if (!target) return false;
    if (audits.length <= 1) {
      showToast('No se puede eliminar la única auditoría del sistema', 'warning');
      return false;
    }
    setAudits((prev) => prev.filter((a) => a.id !== id));
    if (selectedAuditId === id) {
      const remaining = audits.filter((a) => a.id !== id);
      setSelectedAuditId(remaining[0].id);
    }
    addAuditLog('Eliminación de auditoría', 'Auditorías', `Eliminada auditoría ${target.code}`);
    showToast(`Auditoría ${target.code} eliminada del sistema`, 'info');
    return true;
  };

  // Job Manual
  const updateJobManual = (manual: JobDescription) => {
    setJobManual(manual);
    addAuditLog('Actualización de manual de funciones', 'Manual de Funciones', `Actualizada versión ${manual.version}`);
    showToast('Manual de funciones actualizado exitosamente', 'success');
  };

  // Legal Norms
  const addLegalNorm = (normData: Omit<LegalNormItem, 'id'>) => {
    const newNorm: LegalNormItem = {
      ...normData,
      id: 'norm-' + Date.now()
    };
    setLegalNorms((prev) => [...prev, newNorm]);
    addAuditLog('Creación de norma legal', 'Normatividad Legal', `Agregada norma ${newNorm.name}`);
    showToast(`Norma ${newNorm.name} registrada`, 'success');
  };

  const updateLegalNorm = (norm: LegalNormItem) => {
    setLegalNorms((prev) => prev.map((n) => (n.id === norm.id ? norm : n)));
    addAuditLog('Actualización de norma legal', 'Normatividad Legal', `Modificada norma ${norm.name}`);
    showToast(`Norma ${norm.name} actualizada`, 'success');
  };

  const deleteLegalNorm = (id: string) => {
    const target = legalNorms.find((n) => n.id === id);
    setLegalNorms((prev) => prev.filter((n) => n.id !== id));
    addAuditLog('Eliminación de norma legal', 'Normatividad Legal', `Eliminada norma ${target?.name}`);
    showToast('Norma eliminada de la biblioteca', 'info');
  };

  // Config & Editor
  const updateConfig = (newConfig: Partial<PlatformConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...newConfig
    }));
    addAuditLog('Edición de plataforma', 'Editor General', 'Actualizados parámetros visuales y contenidos de la plataforma');
    showToast('Configuraciones guardadas y aplicadas', 'success');
  };

  // Backup & Restore
  const exportDatabaseJSON = () => {
    const databaseDump = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      exportedBy: currentUser.fullName,
      config,
      users,
      audits,
      jobManual,
      legalNorms,
      auditLogs
    };
    const jsonStr = JSON.stringify(databaseDump, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `COPIA_SEGURIDAD_SOMOS_AUDITA_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addAuditLog('Exportación de respaldo', 'Base de Datos', 'Copia de seguridad completa descargada en formato JSON');
    showToast('Copia de seguridad generada y descargada', 'success');
  };

  const importDatabaseJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.audits && parsed.users) {
        if (parsed.audits) setAudits(parsed.audits);
        if (parsed.users) setUsers(parsed.users);
        if (parsed.config) setConfig(parsed.config);
        if (parsed.jobManual) setJobManual(parsed.jobManual);
        if (parsed.legalNorms) setLegalNorms(parsed.legalNorms);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
        if (parsed.audits.length > 0) setSelectedAuditId(parsed.audits[0].id);

        addAuditLog('Restauración de base de datos', 'Base de Datos', 'Base de datos restaurada exitosamente desde archivo JSON');
        showToast('Base de datos restaurada correctamente', 'success');
        return true;
      }
      showToast('Formato de archivo de respaldo no compatible', 'error');
      return false;
    } catch (err) {
      console.error(err);
      showToast('Error al parsear el archivo JSON de respaldo', 'error');
      return false;
    }
  };

  const resetToDemoData = () => {
    setAudits([INITIAL_DEMO_AUDIT]);
    setUsers(INITIAL_USERS);
    setConfig(INITIAL_CONFIG);
    setJobManual(INITIAL_JOB_DESCRIPTION);
    setLegalNorms(INITIAL_LEGAL_NORMS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSelectedAuditId(INITIAL_DEMO_AUDIT.id);
    setCurrentUser(INITIAL_USERS[0]);
    addAuditLog('Reinicio de simulación', 'Sistema', 'Datos restablecidos a la simulación inicial oficial');
    showToast('Plataforma reiniciada con la simulación oficial de auditoría', 'info');
  };

  // CSV Export utility
  const exportToCSV = (rows: Record<string, any>[], filename: string) => {
    if (!rows || !rows.length) {
      showToast('No hay datos disponibles para exportar', 'warning');
      return;
    }
    const headers = Object.keys(rows[0]);
    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [
        headers.join(';'),
        ...rows.map((row) =>
          headers
            .map((header) => {
              const val = row[header];
              if (val === null || val === undefined) return '""';
              const str = String(val).replace(/"/g, '""');
              return `"${str}"`;
            })
            .join(';')
        )
      ].join('\r\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addAuditLog('Exportación a Excel / CSV', 'Informes', `Descargado archivo ${filename}.csv`);
    showToast(`Archivo ${filename}.csv exportado con éxito`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedAuditId,
        setSelectedAuditId,
        activeAudit,
        currentUser,
        users,
        isLoggedIn,
        login,
        logout,
        switchUserRole,
        addUser,
        updateUser,
        deleteUser,
        audits,
        createAudit,
        updateAudit,
        deleteAudit,
        updateAuditMomento,
        jobManual,
        updateJobManual,
        legalNorms,
        addLegalNorm,
        updateLegalNorm,
        deleteLegalNorm,
        config,
        updateConfig,
        auditLogs,
        addAuditLog,
        exportDatabaseJSON,
        importDatabaseJSON,
        resetToDemoData,
        exportToCSV,
        toasts,
        showToast,
        removeToast,
        unreadCount: 3
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
