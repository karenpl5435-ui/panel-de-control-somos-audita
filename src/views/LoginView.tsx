import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  HelpCircle,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const DEMO_ACCOUNTS: { role: UserRole; username: string; label: string; name: string }[] = [
  { role: 'ADMINISTRADOR', username: 'admin', label: 'Administrador General', name: 'Ing. Andrea Beltrán' },
  { role: 'COORDINADOR_AUDITORIA', username: 'coordinador', label: 'Coordinador de Auditoría', name: 'Dr. Roberto Casas' },
  { role: 'AUDITOR_LIDER', username: 'auditor_lider', label: 'Auditor Líder Senior', name: 'Ing. Carlos Montoya' },
  { role: 'AUDITOR_APOYO', username: 'auditor_apoyo', label: 'Auditor de Apoyo', name: 'Dra. Mariana Gómez' },
  { role: 'GESTOR_AUDITADO', username: 'gestor_proyectos', label: 'Gestor(a) Auditado(a)', name: 'Lic. Valentina Restrepo' },
  { role: 'DIRECCION_ADMINISTRATIVA', username: 'direccion', label: 'Dirección Administrativa', name: 'Dra. Elena Morales' },
];

export const LoginView: React.FC = () => {
  const { login, config } = useApp();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('••••••••');
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = login(username, password);
    if (!success) {
      setErrorMsg('Usuario o credenciales no válidas. Pruebe una de las cuentas de demostración abajo.');
    }
  };

  const handleQuickLogin = (uname: string) => {
    setUsername(uname);
    setPassword('••••••••');
    login(uname);
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail) return;
    setRecoverySent(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Logo Lockup */}
        <div className="w-16 h-16 bg-[#0c2340] text-emerald-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-3">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <h1 className="text-2xl font-black text-[#0c2340] tracking-tight uppercase">
          {config.appName}
        </h1>
        <p className="text-xs font-semibold text-emerald-800 tracking-wide mt-0.5">
          {config.corporateName}
        </p>
        <p className="text-[11px] text-slate-500 italic mt-1">
          "{config.slogan}"
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200 sm:px-10 space-y-6">
          <div className="text-center pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">
              Inicio de Sesión Institucional
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ingrese con sus credenciales autorizadas
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nombre de Usuario
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ej. admin, coordinador, gestor_proyectos"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Contraseña</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-semibold text-emerald-700 hover:underline"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0c2340] hover:bg-slate-800 text-white font-bold rounded-lg shadow-xs transition active:scale-98"
            >
              <span>Iniciar Sesión</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher for Evaluation */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block text-center">
              Acceso Rápido para Demostración de Perfiles:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.username}
                  type="button"
                  onClick={() => handleQuickLogin(acc.username)}
                  className="p-2 text-left bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-lg transition"
                >
                  <span className="font-bold text-slate-900 block truncate">{acc.label}</span>
                  <span className="text-[10px] text-slate-500 truncate block">{acc.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-500 mt-4">
          Corporación Social Somos Uno · Medellín, Colombia · 2026
        </p>
      </div>

      {/* Password Recovery Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-[#0c2340]">
              <KeyRound className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold">Recuperación de Contraseña</h3>
            </div>

            {!recoverySent ? (
              <form onSubmit={handleRecoverySubmit} className="space-y-3 text-xs">
                <p className="text-slate-600 leading-relaxed">
                  Ingrese su correo institucional registrado para recibir un enlace de restablecimiento seguro.
                </p>
                <input
                  type="email"
                  required
                  placeholder="su.correo@somosuno.org.co"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700"
                  >
                    Enviar Instrucciones
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-xs text-center py-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="font-bold text-slate-900">Enlace de Recuperación Enviado</p>
                <p className="text-slate-600 text-[11px]">
                  Hemos enviado las instrucciones a <strong>{recoveryEmail}</strong>. Verifique su bandeja de entrada o comuníquese con el Administrador.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setRecoverySent(false);
                    setRecoveryEmail('');
                  }}
                  className="w-full py-2 bg-[#0c2340] text-white rounded-lg text-xs font-bold"
                >
                  Regresar al Inicio de Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
