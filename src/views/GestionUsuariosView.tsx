import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, UserRole } from '../types';
import {
  Users,
  PlusCircle,
  Shield,
  KeyRound,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Lock
} from 'lucide-react';

const ROLES_INFO: { role: UserRole; name: string; desc: string }[] = [
  { role: 'ADMINISTRADOR', name: 'Administrador', desc: 'Control total de la plataforma, usuarios, formularios, diseño y base de datos.' },
  { role: 'COORDINADOR_AUDITORIA', name: 'Coordinador de Auditoría', desc: 'Programar auditorías, asignar auditores, revisar y aprobar planes, actas e informes.' },
  { role: 'AUDITOR_LIDER', name: 'Auditor Líder', desc: 'Realizar auditorías, diligenciar formularios, registrar hallazgos y elaborar informes.' },
  { role: 'AUDITOR_APOYO', name: 'Auditor de Apoyo', desc: 'Apoyar revisiones, diligenciar listas de chequeo y adjuntar evidencias.' },
  { role: 'GESTOR_AUDITADO', name: 'Gestor(a) de Proyectos Auditado(a)', desc: 'Consultar solicitudes, entregar documentos, presentar aclaraciones y ver resultados.' },
  { role: 'DIRECCION_ADMINISTRATIVA', name: 'Dirección Administrativa', desc: 'Consultar resultados, revisar informes consolidados y seguimiento a estadísticas.' },
];

export const GestionUsuariosView: React.FC = () => {
  const { users, currentUser, addUser, updateUser, deleteUser, switchUserRole, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    cargo: '',
    role: 'AUDITOR_APOYO' as UserRole,
    phone: ''
  });

  const filteredUsers = users.filter((u) => {
    const s = searchTerm.toLowerCase();
    return (
      u.fullName.toLowerCase().includes(s) ||
      u.username.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      u.role.toLowerCase().includes(s)
    );
  });

  const handleAddSubmit = () => {
    if (!formData.username || !formData.fullName || !formData.email) {
      showToast('Por favor diligencie todos los campos requeridos.', 'warning');
      return;
    }
    addUser({
      username: formData.username.trim().toLowerCase(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      cargo: formData.cargo || 'Funcionario Somos Uno',
      role: formData.role,
      active: true,
      phone: formData.phone
    });
    setShowAddModal(false);
    setFormData({ username: '', fullName: '', email: '', cargo: '', role: 'AUDITOR_APOYO', phone: '' });
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    updateUser(editingUser);
    setEditingUser(null);
  };

  const toggleUserActive = (user: User) => {
    updateUser({ ...user, active: !user.active });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Seguridad y Control de Acceso</span>
            <span>·</span>
            <span>{users.length} Usuarios Registrados</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            GESTIÓN DE USUARIOS, ROLES Y PERMISOS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Administración de cuentas institucionales, asignación de los seis perfiles oficiales y control de privilegios de acceso.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Crear Nuevo Usuario</span>
        </button>
      </div>

      {/* Role Descriptions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ROLES_INFO.map((r) => {
          const isCurrentActive = currentUser.role === r.role;
          return (
            <div
              key={r.role}
              className={`p-3.5 rounded-xl border transition-all text-xs ${
                isCurrentActive
                  ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900">{r.name}</span>
                {isCurrentActive && (
                  <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded">
                    Perfil Activo
                  </span>
                )}
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">{r.desc}</p>
              <button
                onClick={() => switchUserRole(r.role)}
                className="mt-2 text-[11px] font-semibold text-emerald-700 hover:underline"
              >
                Probar como este rol →
              </button>
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, usuario, correo o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <span className="text-xs text-slate-500">
            Total usuarios: <strong>{filteredUsers.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
              <tr>
                <th className="py-2.5 px-3">Usuario / Nombre</th>
                <th className="py-2.5 px-3">Correo Institucional</th>
                <th className="py-2.5 px-3">Cargo</th>
                <th className="py-2.5 px-3">Rol Asignado</th>
                <th className="py-2.5 px-3">Estado</th>
                <th className="py-2.5 px-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{u.fullName}</span>
                    <span className="text-[11px] text-slate-500 font-mono">@{u.username}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{u.email}</td>
                  <td className="py-3 px-3 text-slate-700">{u.cargo}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => toggleUserActive(u)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        u.active
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {u.active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{u.active ? 'Activo' : 'Inactivo'}</span>
                    </button>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditingUser({ ...u })}
                        className="p-1.5 text-slate-500 hover:text-blue-700 rounded hover:bg-slate-100"
                        title="Editar usuario"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-700 rounded hover:bg-slate-100"
                        title="Eliminar usuario"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Crear Nuevo Usuario</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  placeholder="Ej. Lic. Claudia Mendoza..."
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre de Usuario *</label>
                <input
                  type="text"
                  placeholder="ej. claudia.mendoza"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  placeholder="claudia.mendoza@somosuno.org.co"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cargo Institucional</label>
                <input
                  type="text"
                  placeholder="Ej. Auditora de Apoyo Territorial..."
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Perfil / Rol en SOMOS AUDITA</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                >
                  {ROLES_INFO.map((r) => (
                    <option key={r.role} value={r.role}>{r.name}</option>
                  ))}
                </select>
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
                className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700 shadow-xs"
              >
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Editar Usuario: {editingUser.fullName}</h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={editingUser.fullName}
                  onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cargo</label>
                <input
                  type="text"
                  value={editingUser.cargo}
                  onChange={(e) => setEditingUser({ ...editingUser, cargo: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Perfil / Rol</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                >
                  {ROLES_INFO.map((r) => (
                    <option key={r.role} value={r.role}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Estado de la Cuenta</label>
                <select
                  value={editingUser.active ? 'true' : 'false'}
                  onChange={(e) => setEditingUser({ ...editingUser, active: e.target.value === 'true' })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5"
                >
                  <option value="true">Activa (Acceso Permitido)</option>
                  <option value="false">Desactivada (Acceso Bloqueado)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setEditingUser(null)}
                className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700"
              >
                Guardar Modificaciones
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
