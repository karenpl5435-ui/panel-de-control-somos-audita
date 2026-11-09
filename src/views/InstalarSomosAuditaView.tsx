import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';
import {
  Download,
  CheckCircle,
  Monitor,
  Smartphone,
  Laptop,
  WifiOff,
  Sparkles,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const InstalarSomosAuditaView: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { showToast } = useApp();
  const [showIOSModal, setShowIOSModal] = useState(false);

  const handleInstallClick = async () => {
    if (isInstalled) {
      showToast('SOMOS AUDITA ya se encuentra instalada en este dispositivo.', 'info');
      return;
    }
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        showToast('¡SOMOS AUDITA instalada exitosamente!', 'success');
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      showToast('Para instalar manualmente: abra el menú del navegador (tres puntos) y seleccione "Instalar aplicación" o "Crear acceso directo".', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Aplicación Web Progresiva (PWA) Oficial</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0c2340] tracking-tight">
          INSTALAR SOMOS AUDITA
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Instale la plataforma empresarial en su computador, tableta o celular para trabajar en ventana independiente con acceso directo institucional y soporte sin conexión.
        </p>
      </div>

      {/* Main Installation Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs text-center space-y-6">
        <div className="w-20 h-20 bg-[#0c2340] text-emerald-400 rounded-2xl mx-auto flex items-center justify-center shadow-md">
          <ShieldCheck className="w-12 h-12" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Corporación Social Somos Uno · SOMOS AUDITA
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Versión 2.0 PWA para Auditoría de Proyectos Sociales
          </p>
        </div>

        {/* STATUS BADGE */}
        <div>
          {isInstalled ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>La aplicación ya está instalada en modo Standalone en este equipo</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 rounded-xl border border-blue-200 text-xs font-medium">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span>Lista para instalarse como aplicación de escritorio o móvil</span>
            </div>
          )}
        </div>

        {/* PROMINENT INSTALL BUTTON */}
        <div>
          <button
            onClick={handleInstallClick}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-black shadow-md hover:shadow-lg transition-all transform active:scale-95"
          >
            <Download className="w-5 h-5" />
            <span>INSTALAR SOMOS AUDITA</span>
          </button>
        </div>

        {/* PWA Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-6 border-t border-slate-100 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span>Ventana Independiente</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Se abre sin barra de direcciones ni distracciones del navegador, comportándose como una aplicación nativa.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Laptop className="w-4 h-4 text-emerald-600" />
              <span>Acceso Directo en Escritorio</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Crea un icono oficial de SOMOS AUDITA en el menú de inicio y escritorio de Windows, Mac o pantalla de inicio en Android.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <WifiOff className="w-4 h-4 text-amber-600" />
              <span>Disponibilidad en Campo</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Permite consultar listas de chequeo, manuales y normas en territorios vulnerables con conectividad limitada.
            </p>
          </div>
        </div>
      </div>

      {/* Instructions by Device */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          Instrucciones de Instalación según su Navegador y Sistema Operativo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Google Chrome / Microsoft Edge (Windows / Mac):</strong>
            <p className="text-[11px] leading-relaxed">
              1. En la barra de direcciones superior, ubique el icono de instalación (pantalla con flecha).<br />
              2. Haga clic en <strong>"Instalar SOMOS AUDITA"</strong>.<br />
              3. Confirme en la ventana emergente para crear el acceso directo en su escritorio.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Safari (iPhone / iPad / Mac):</strong>
            <p className="text-[11px] leading-relaxed">
              1. Toque el botón <strong>Compartir</strong> (icono de cuadrado con flecha hacia arriba).<br />
              2. Desplácese hacia abajo y seleccione <strong>"Agregar a pantalla de inicio"</strong>.<br />
              3. Pulse "Agregar" en la esquina superior derecha.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Google Chrome en Android:</strong>
            <p className="text-[11px] leading-relaxed">
              1. Toque los tres puntos verticales en la esquina superior derecha.<br />
              2. Seleccione <strong>"Instalar aplicación"</strong> o "Agregar a la pantalla principal".<br />
              3. Confirme la instalación.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Seguridad y Respaldo de Datos:</strong>
            <p className="text-[11px] leading-relaxed">
              Los registros guardados en la app se sincronizan con la base de datos institucional y no se pierden al cerrar la ventana.
            </p>
          </div>
        </div>
      </div>

      {/* iOS Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Instalar en iPhone o iPad</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              1. En la barra de Safari, pulse el icono de <strong>Compartir</strong> (cuadrado con flecha hacia arriba).<br />
              2. Seleccione <strong>"Agregar a pantalla de inicio"</strong>.<br />
              3. Confirme para disfrutar de SOMOS AUDITA a pantalla completa.
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
