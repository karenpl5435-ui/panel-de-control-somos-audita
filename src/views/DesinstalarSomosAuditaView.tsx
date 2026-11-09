import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Trash2,
  AlertTriangle,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Database,
  ArrowRight,
  Monitor,
  Smartphone
} from 'lucide-react';

export const DesinstalarSomosAuditaView: React.FC = () => {
  const { showToast, currentUser } = useApp();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleStartDeinstall = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmModal = () => {
    setShowConfirmModal(false);
    showToast('Instrucciones de desinstalación visualizadas. Recuerde que sus datos de auditoría permanecen protegidos en el servidor institucional.', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 text-xs px-3 py-1 rounded-full font-bold border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Gestión de la Aplicación en su Dispositivo</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          DESINSTALAR SOMOS AUDITA
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Consulte las instrucciones oficiales para retirar el acceso directo de su computador o celular garantizando la conservación de los expedientes en la Corporación.
        </p>
      </div>

      {/* Reassurance Banner: Data Conservation Rule (Prompt Requirement 11) */}
      <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2 text-xs text-emerald-950">
        <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Garantía Institucional de Conservación Documental (Ley 594 de 2000 y Ley 1581)</span>
        </div>
        <p className="leading-relaxed">
          <strong>La desinstalación de SOMOS AUDITA de su dispositivo no borra automáticamente la información del servidor.</strong> Todos los registros de auditorías, listas de chequeo, actas de cierre, no conformidades, evidencias y evaluaciones de auditores permanecen resguardados de manera íntegra en la base de datos institucional de la Corporación Social Somos Uno.
        </p>
        <p className="leading-relaxed text-emerald-800 font-medium">
          Solo los administradores autorizados podrán gestionar la depuración o archivo definitivo de expedientes conforme a las tablas de retención documental y protocolos de confidencialidad.
        </p>
      </div>

      {/* Button Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs text-center space-y-6">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl mx-auto flex items-center justify-center border border-rose-200">
          <Trash2 className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900">
            Retirar SOMOS AUDITA de este Dispositivo
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Por seguridad de los navegadores web modernos, las PWAs se desinstalan desde las opciones del propio navegador o del sistema operativo para proteger al usuario.
          </p>
        </div>

        <div>
          <button
            onClick={handleStartDeinstall}
            className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>DESINSTALAR SOMOS AUDITA</span>
          </button>
        </div>
      </div>

      {/* Detailed Step-by-Step Instructions per Browser & OS */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Pasos Exactos para Desinstalar la Aplicación según su Equipo</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
          {/* Windows / Chrome */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span>Google Chrome en Windows o Mac:</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>Abra la aplicación <strong>SOMOS AUDITA</strong> en su ventana independiente.</li>
              <li>Haga clic en los tres puntos verticales en la esquina superior derecha de la barra de título.</li>
              <li>Seleccione la opción <strong>"Desinstalar SOMOS AUDITA..."</strong>.</li>
              <li>Haga clic en <strong>"Quitar"</strong>. (Opcionalmente elija si desea borrar datos temporales de la caché).</li>
            </ol>
          </div>

          {/* Microsoft Edge */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span>Microsoft Edge (Windows):</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>Abra Edge y escriba en la barra de direcciones: <code className="bg-white px-1 rounded font-mono">edge://apps</code>.</li>
              <li>Ubique la tarjeta de <strong>SOMOS AUDITA</strong>.</li>
              <li>Haga clic en los tres puntos del icono y seleccione <strong>"Desinstalar"</strong>.</li>
              <li>Confirme la eliminación del acceso directo.</li>
            </ol>
          </div>

          {/* Android */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Celulares y Tabletas Android:</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>Ubique el icono de <strong>SOMOS AUDITA</strong> en su pantalla de inicio o cajón de aplicaciones.</li>
              <li>Mantenga presionado el icono durante 2 segundos.</li>
              <li>Arrastre hacia el icono de la papelera o seleccione <strong>"Desinstalar" / "Eliminar"</strong>.</li>
              <li>Confirme en la pantalla de su dispositivo.</li>
            </ol>
          </div>

          {/* iOS Safari */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>iPhone e iPad (Apple iOS):</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>En la pantalla de inicio de su iPhone/iPad, mantenga presionado el icono de <strong>SOMOS AUDITA</strong>.</li>
              <li>Toque en <strong>"Eliminar marcador"</strong> o "Eliminar de la pantalla de inicio".</li>
              <li>Confirme para retirar el icono del dispositivo.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">
                Confirmación de Desinstalación
              </h3>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                Está a punto de consultar los pasos para retirar la aplicación web progresiva de su equipo.
              </p>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-medium">
                ✔ <strong>Recuerde:</strong> Sus auditorías, planes y actas aprobadas están 100% seguros y respaldados en los servidores de la Corporación Social Somos Uno. Podrá volver a ingresar en cualquier momento desde cualquier navegador autorizado.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cerrar
              </button>
              <button
                onClick={handleConfirmModal}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
              >
                He Comprendido las Instrucciones
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
