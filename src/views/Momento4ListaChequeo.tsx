import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useApp } from '../context/AppContext';
import { CheckItem, CheckResult } from '../types';
import {
  ClipboardList,
  Save,
  CheckCircle,
  AlertTriangle,
  Upload,
  FileText,
  FileCheck,
  PlusCircle,
  Filter,
  ArrowRight,
  Paperclip,
  Check,
  X,
  HelpCircle,
  ChevronDown,
  Download,
  Printer,
  ShieldCheck,
  Eye,
  Table as TableIcon,
  Search,
  LayoutList,
  CheckSquare,
  FileDown
} from 'lucide-react';

export const Momento4ListaChequeo: React.FC = () => {
  const { activeAudit, selectedAuditId, updateAuditMomento, setActiveView, currentUser, showToast, exportToCSV } = useApp();

  if (!activeAudit) return null;

  const [items, setItems] = useState<CheckItem[]>([...activeAudit.momento4.items]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filterResult, setFilterResult] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'document'>('cards');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [selectedItemForEvidence, setSelectedItemForEvidence] = useState<string | null>(null);
  const [newAttachmentName, setNewAttachmentName] = useState('');
  const [showAddCustomQuestion, setShowAddCustomQuestion] = useState(false);
  const [customQuestion, setCustomQuestion] = useState({
    category: 'normas_legales' as CheckItem['category'],
    normOrTitle: '',
    articleOrReq: '',
    description: ''
  });

  const handleUpdateItem = (id: string, updates: Partial<CheckItem>) => {
    const updated = items.map((it) => (it.id === id ? { ...it, ...updates } : it));
    setItems(updated);
  };

  const handleSaveList = () => {
    updateAuditMomento(selectedAuditId, 'momento4', {
      ...activeAudit.momento4,
      items,
      status: 'En curso'
    });
    showToast('Lista de chequeo guardada exitosamente.', 'success');
  };

  const handleFinalizeList = () => {
    updateAuditMomento(selectedAuditId, 'momento4', {
      ...activeAudit.momento4,
      items,
      status: 'Finalizada',
      completedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    });
    showToast('Lista de chequeo FINALIZADA. Los hallazgos y conformidades se trasladaron al Momento 5: Acta de Cierre.', 'success');
    setActiveView('momento5');
  };

  const handleExportExcel = () => {
    const rows = items.map((it, idx) => ({
      'N°': idx + 1,
      'Componente / Categoría': it.category.replace('_', ' ').toUpperCase(),
      'Norma o Criterio': it.normOrTitle,
      'Artículo o Requisito': it.articleOrReq,
      'Descripción del Aspecto a Evaluar': it.description,
      'Resultado de la Evaluación':
        it.result === 'cumple'
          ? 'CUMPLE'
          : it.result === 'no_cumple'
          ? 'NO CUMPLE'
          : it.result === 'cumple_parcialmente'
          ? 'CUMPLE PARCIAL'
          : it.result === 'no_aplica'
          ? 'NO APLICA'
          : 'SIN EVALUAR',
      'Descripción de lo Encontrado (Hallazgo)': it.findingDescription || 'Sin observaciones registradas',
      'Evidencia Objetiva Examinada': it.evidenceText || 'No se registraron folios o evidencias específicas',
      'Soportes Adjuntos':
        it.attachments && it.attachments.length > 0
          ? it.attachments.map((a) => `${a.name} (${a.size})`).join('; ')
          : 'Sin archivos adjuntos',
      'Fecha de Revisión': it.reviewDate || '',
      'Auditor Responsable': it.auditorName || currentUser.fullName,
      'Observaciones Adicionales': it.observations || ''
    }));

    const cleanGestor = activeAudit.momento1.gestorName.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `LISTA_CHEQUEO_${activeAudit.code}_${cleanGestor}_${new Date().toISOString().slice(0, 10)}`;
    exportToCSV(rows, filename);
    showToast('Lista de chequeo descargada en formato Excel (.CSV compatible) exitosamente.', 'success');
  };

  const handleExportPDF = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Top Institutional Header
      doc.setFillColor(12, 35, 64); // #0c2340
      doc.rect(0, 0, pageWidth, 22, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('CORPORACIÓN SOCIAL SOMOS UNO', 14, 9);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('NIT. 901.482.319-5 · Medellín, Antioquia · Sistema Integral de Auditoría SOMOS AUDITA', 14, 14);
      doc.text('Formato Oficial F-AUD-004 · Vigencia 2026', 14, 18);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`CÓDIGO: ${activeAudit.code}`, pageWidth - 14, 10, { align: 'right' });
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, pageWidth - 14, 16, { align: 'right' });

      // Title
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('MOMENTO 4: LISTA DE CHEQUEO DE AUDITORÍA INTEGRAL DE GESTIÓN', 14, 30);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(
        'Evaluación técnica articulada al Manual de Funciones del Gestor(a) de Proyectos para Sectores Vulnerables.',
        14,
        35
      );

      // Metadata Table
      autoTable(doc, {
        startY: 38,
        theme: 'grid',
        styles: { fontSize: 7.5, cellPadding: 1.5, textColor: [30, 41, 59] },
        head: [['Proyecto Evaluado', 'Gestor(a) Auditado(a)', 'Auditor Líder', 'Período', 'Estado']],
        body: [
          [
            `${activeAudit.momento1.projectName} (${activeAudit.momento1.projectCode})\nUbicación: ${activeAudit.momento1.gestorLocation}`,
            `${activeAudit.momento1.gestorName}\nCargo: ${activeAudit.momento1.gestorCargo}`,
            `${activeAudit.momento1.auditorLider}\nEquipo: ${activeAudit.momento1.auditoresApoyo.join(', ')}`,
            `${activeAudit.momento1.startDate} al ${activeAudit.momento1.endDate}`,
            activeAudit.momento4.status || 'En curso'
          ]
        ],
        headStyles: {
          fillColor: [241, 245, 249],
          textColor: [15, 23, 42],
          fontStyle: 'bold',
          lineWidth: 0.1,
          lineColor: [203, 213, 225]
        },
        columnStyles: {
          0: { cellWidth: 72 },
          1: { cellWidth: 60 },
          2: { cellWidth: 55 },
          3: { cellWidth: 45 },
          4: { cellWidth: 37, halign: 'center', fontStyle: 'bold' }
        }
      });

      // Stats Summary Table
      const afterMetaY = (doc as any).lastAutoTable?.finalY ? (doc as any).lastAutoTable.finalY + 3 : 58;
      const complianceRate = Math.round((cumpleCount / (totalCount - noAplicaCount || 1)) * 100);

      autoTable(doc, {
        startY: afterMetaY,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2, halign: 'center', valign: 'middle' },
        head: [['Total Criterios', 'Cumple', 'No Cumple (Hallazgo)', 'Cumple Parcial', 'No Aplica', 'Sin Evaluar', 'Índice de Conformidad']],
        body: [
          [
            String(totalCount),
            String(cumpleCount),
            String(noCumpleCount),
            String(parcialCount),
            String(noAplicaCount),
            String(sinEvaluarCount),
            `${complianceRate}%`
          ]
        ],
        headStyles: {
          fillColor: [226, 232, 240],
          textColor: [15, 23, 42],
          fontStyle: 'bold',
          fontSize: 7.5
        },
        didParseCell: (data) => {
          if (data.section === 'body') {
            if (data.column.index === 1) data.cell.styles.textColor = [5, 150, 105];
            if (data.column.index === 2) data.cell.styles.textColor = [225, 29, 72];
            if (data.column.index === 3) data.cell.styles.textColor = [217, 119, 6];
            if (data.column.index === 6) {
              data.cell.styles.textColor = [12, 35, 64];
              data.cell.styles.fontStyle = 'bold';
            }
          }
        }
      });

      // Detailed Checklist Rows
      const afterStatsY = (doc as any).lastAutoTable?.finalY ? (doc as any).lastAutoTable.finalY + 4 : 76;

      const checklistRows = items.map((it, idx) => {
        const resultLabel =
          it.result === 'cumple'
            ? 'CUMPLE'
            : it.result === 'no_cumple'
            ? 'NO CUMPLE'
            : it.result === 'cumple_parcialmente'
            ? 'PARCIAL'
            : it.result === 'no_aplica'
            ? 'NO APLICA'
            : 'SIN EVALUAR';

        const categoryLabel = it.category.replace('_', ' ').toUpperCase();

        const evidenceAndFindings = [
          it.findingDescription ? `HALLAZGO: ${it.findingDescription}` : '',
          it.evidenceText ? `EVIDENCIA: ${it.evidenceText}` : '',
          it.attachments && it.attachments.length > 0
            ? `SOPORTES: ${it.attachments.map((a) => a.name).join(', ')}`
            : ''
        ]
          .filter(Boolean)
          .join('\n');

        return [
          String(idx + 1),
          categoryLabel,
          `${it.normOrTitle}\n(${it.articleOrReq})`,
          it.description,
          resultLabel,
          evidenceAndFindings || 'Conforme según revisión documental y operativa.',
          it.reviewDate || '2026-11-08'
        ];
      });

      autoTable(doc, {
        startY: afterStatsY,
        theme: 'striped',
        styles: {
          fontSize: 7.2,
          cellPadding: 2,
          overflow: 'linebreak',
          valign: 'top',
          lineColor: [226, 232, 240],
          lineWidth: 0.1
        },
        head: [['N°', 'Componente', 'Norma / Requisito', 'Aspecto Evaluado', 'Resultado', 'Hallazgos y Evidencias Examinadas', 'Fecha']],
        body: checklistRows,
        headStyles: {
          fillColor: [12, 35, 64],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center',
          fontSize: 7.5
        },
        columnStyles: {
          0: { cellWidth: 8, halign: 'center' },
          1: { cellWidth: 26, fontStyle: 'bold' },
          2: { cellWidth: 42 },
          3: { cellWidth: 68 },
          4: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
          5: { cellWidth: 'auto' },
          6: { cellWidth: 18, halign: 'center', fontSize: 6.5 }
        },
        didParseCell: (data) => {
          if (data.section === 'body' && data.column.index === 4) {
            const val = data.cell.raw;
            if (val === 'CUMPLE') {
              data.cell.styles.textColor = [16, 120, 70];
            } else if (val === 'NO CUMPLE') {
              data.cell.styles.textColor = [200, 20, 40];
            } else if (val === 'PARCIAL') {
              data.cell.styles.textColor = [180, 95, 6];
            } else if (val === 'NO APLICA') {
              data.cell.styles.textColor = [100, 116, 139];
            }
          }
        }
      });

      // Signatures Section
      const afterItemsY = (doc as any).lastAutoTable?.finalY ? (doc as any).lastAutoTable.finalY + 12 : pageHeight - 30;
      let signatureY = afterItemsY;

      if (signatureY > pageHeight - 35) {
        doc.addPage();
        signatureY = 30;
      }

      const sigWidth = 75;
      const spacing = 18;
      const startX = (pageWidth - (sigWidth * 3 + spacing * 2)) / 2;

      // Sig 1: Auditor Líder
      doc.setDrawColor(100, 116, 139);
      doc.setLineWidth(0.3);
      doc.line(startX, signatureY, startX + sigWidth, signatureY);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(activeAudit.momento1.auditorLider, startX + sigWidth / 2, signatureY + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text('Auditor(a) Líder de Calidad', startX + sigWidth / 2, signatureY + 8, { align: 'center' });
      doc.text('Corporación Social Somos Uno', startX + sigWidth / 2, signatureY + 11, { align: 'center' });

      // Sig 2: Gestor Auditado
      const x2 = startX + sigWidth + spacing;
      doc.line(x2, signatureY, x2 + sigWidth, signatureY);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(activeAudit.momento1.gestorName, x2 + sigWidth / 2, signatureY + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(activeAudit.momento1.gestorCargo, x2 + sigWidth / 2, signatureY + 8, { align: 'center' });
      doc.text('Persona Auditada', x2 + sigWidth / 2, signatureY + 11, { align: 'center' });

      // Sig 3: Dirección Control Interno
      const x3 = x2 + sigWidth + spacing;
      doc.line(x3, signatureY, x3 + sigWidth, signatureY);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text('Dra. Claudia Marcela Henao', x3 + sigWidth / 2, signatureY + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text('Dirección de Control Interno / Calidad', x3 + sigWidth / 2, signatureY + 8, { align: 'center' });
      doc.text('Corporación Social Somos Uno', x3 + sigWidth / 2, signatureY + 11, { align: 'center' });

      // Pagination
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(148, 163, 184);
        doc.text(
          `SOMOS AUDITA · Lista de Chequeo Oficial (${activeAudit.code}) · Página ${i} de ${totalPages}`,
          pageWidth / 2,
          pageHeight - 5,
          { align: 'center' }
        );
      }

      const cleanGestor = activeAudit.momento1.gestorName.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `LISTA_CHEQUEO_${activeAudit.code}_${cleanGestor}_${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(filename);
      showToast(`Archivo PDF "${filename}" generado y descargado exitosamente.`, 'success');
    } catch (err: any) {
      console.error('Error generating PDF:', err);
      showToast('No se pudo generar el archivo directo. Abriendo diálogo del navegador...', 'warning');
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleAddAttachment = (itemId: string) => {
    if (!newAttachmentName.trim()) return;
    const newAtt = {
      id: 'att-' + Date.now(),
      name: newAttachmentName.trim(),
      size: '1.4 MB',
      type: newAttachmentName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
      uploadDate: new Date().toISOString().slice(0, 10),
      uploadedBy: currentUser.fullName
    };

    const updated = items.map((it) => {
      if (it.id === itemId) {
        return {
          ...it,
          attachments: [...it.attachments, newAtt]
        };
      }
      return it;
    });
    setItems(updated);
    setNewAttachmentName('');
    setSelectedItemForEvidence(null);
    showToast(`Evidencia adjunta con éxito a la pregunta.`, 'success');
  };

  const handleAddQuestionSubmit = () => {
    if (!customQuestion.normOrTitle || !customQuestion.description) {
      showToast('Por favor diligencie el título y la descripción.', 'warning');
      return;
    }
    const newItem: CheckItem = {
      id: 'chk-custom-' + Date.now(),
      category: customQuestion.category,
      normOrTitle: customQuestion.normOrTitle,
      articleOrReq: customQuestion.articleOrReq || 'Criterio institucional',
      description: customQuestion.description,
      result: 'sin_evaluar',
      findingDescription: '',
      evidenceText: '',
      attachments: [],
      reviewDate: new Date().toISOString().slice(0, 10),
      auditorName: currentUser.fullName,
      observations: '',
      customAdded: true
    };
    setItems([...items, newItem]);
    setShowAddCustomQuestion(false);
    setCustomQuestion({ category: 'normas_legales', normOrTitle: '', articleOrReq: '', description: '' });
    showToast('Nueva pregunta de verificación agregada a la lista.', 'success');
  };

  // Filter items
  const filteredItems = items.filter((it) => {
    const matchesCategory = activeCategory === 'all' || it.category === activeCategory;
    const matchesResult = filterResult === 'all' || it.result === filterResult;
    const matchesSearch =
      !searchTerm.trim() ||
      it.normOrTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      it.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      it.articleOrReq.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (it.findingDescription && it.findingDescription.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (it.evidenceText && it.evidenceText.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesResult && matchesSearch;
  });

  // Calculate stats
  const totalCount = items.length;
  const cumpleCount = items.filter((i) => i.result === 'cumple').length;
  const noCumpleCount = items.filter((i) => i.result === 'no_cumple').length;
  const parcialCount = items.filter((i) => i.result === 'cumple_parcialmente').length;
  const noAplicaCount = items.filter((i) => i.result === 'no_aplica').length;
  const sinEvaluarCount = items.filter((i) => i.result === 'sin_evaluar').length;

  return (
    <>
      <div className="space-y-6 max-w-6xl mx-auto no-print">
        {/* Header and Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Fase 2: Hacer (PHVA)</span>
            <span>·</span>
            <span>Momento Obligatorio 4</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MOMENTO 4. LISTA DE CHEQUEO DE AUDITORÍA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evaluación técnica organizada en cuatro componentes: Normas Legales, Normas Técnicas, Caracterización del Proceso e Informes, articulada al Manual de Funciones del Gestor(a).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista interactiva de tarjetas para calificar y documentar"
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Modo Tarjetas</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('document')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition ${
                viewMode === 'document'
                  ? 'bg-[#0c2340] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Ver toda la lista de chequeo en pantalla en formato institucional completo"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Todo (Documento)</span>
            </button>
          </div>

          {/* Download PDF Direct File */}
          <button
            type="button"
            disabled={isGeneratingPdf}
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition shadow-xs"
            title="Descargar archivo PDF oficial directamente a tu equipo"
          >
            {isGeneratingPdf ? <FileDown className="w-4 h-4 animate-bounce" /> : <Download className="w-4 h-4" />}
            <span>{isGeneratingPdf ? 'Generando...' : 'Descargar PDF (.pdf)'}</span>
          </button>

          {/* Download Excel CSV */}
          <button
            type="button"
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
            title="Descargar lista de chequeo en formato Excel (archivo .csv delimitado)"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Excel (.csv)</span>
          </button>

          {/* Print dialog */}
          <button
            type="button"
            onClick={handlePrintPDF}
            className="flex items-center gap-1.5 px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            title="Imprimir documento en impresora física"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>

          <button
            onClick={() => setShowAddCustomQuestion(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>Agregar</span>
          </button>
          <button
            onClick={handleSaveList}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Guardar</span>
          </button>
          <button
            onClick={handleFinalizeList}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
          >
            <span>Finalizar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        <div className="p-3 bg-white border border-slate-200 rounded-lg text-center shadow-xs">
          <span className="text-[11px] text-slate-500 block font-medium">Total Criterios</span>
          <span className="text-xl font-bold text-slate-900 tabular-nums">{totalCount}</span>
        </div>
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
          <span className="text-[11px] text-emerald-800 block font-medium">Cumple</span>
          <span className="text-xl font-bold text-emerald-800 tabular-nums">{cumpleCount}</span>
        </div>
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-center">
          <span className="text-[11px] text-rose-800 block font-medium">No Cumple</span>
          <span className="text-xl font-bold text-rose-800 tabular-nums">{noCumpleCount}</span>
        </div>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
          <span className="text-[11px] text-amber-800 block font-medium">Cumple Parcial</span>
          <span className="text-xl font-bold text-amber-800 tabular-nums">{parcialCount}</span>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
          <span className="text-[11px] text-slate-600 block font-medium">No Aplica</span>
          <span className="text-xl font-bold text-slate-700 tabular-nums">{noAplicaCount}</span>
        </div>
        <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-center">
          <span className="text-[11px] text-slate-500 block font-medium">Sin Evaluar</span>
          <span className="text-xl font-bold text-slate-600 tabular-nums">{sinEvaluarCount}</span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por criterio, norma, hallazgo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* 4 Components Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 flex-1">
          {[
            { id: 'all', label: 'Todos los Componentes' },
            { id: 'normas_legales', label: 'A. Normas Legales' },
            { id: 'normas_tecnicas', label: 'B. Normas Técnicas' },
            { id: 'caracterizacion', label: 'C. Caracterización' },
            { id: 'informes', label: 'D. Informes' },
            { id: 'manual_funciones', label: 'E. Manual de Funciones' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#0c2340] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter by Result */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterResult}
            onChange={(e) => setFilterResult(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 font-medium"
          >
            <option value="all">Todos ({filteredItems.length})</option>
            <option value="cumple">Solo Cumple</option>
            <option value="no_cumple">Solo No Cumple (Riesgos)</option>
            <option value="cumple_parcialmente">Solo Cumple Parcial</option>
            <option value="no_aplica">Solo No Aplica</option>
            <option value="sin_evaluar">Solo Sin Evaluar</option>
          </select>
        </div>
      </div>

      {/* Modal / Form to Add Custom Question */}
      {showAddCustomQuestion && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200">
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
              Agregar Nuevo Criterio / Pregunta de Verificación
            </h3>
            <button onClick={() => setShowAddCustomQuestion(false)} className="text-slate-500 hover:text-slate-800 text-xs">
              ✕ Cancelar
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Componente / Categoría</label>
              <select
                value={customQuestion.category}
                onChange={(e) => setCustomQuestion({ ...customQuestion, category: e.target.value as any })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5"
              >
                <option value="normas_legales">A. Normas Legales</option>
                <option value="normas_tecnicas">B. Normas Técnicas</option>
                <option value="caracterizacion">C. Caracterización</option>
                <option value="informes">D. Informes</option>
                <option value="manual_funciones">E. Manual de Funciones</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nombre de la Norma o Criterio</label>
              <input
                type="text"
                placeholder="Ej. Ley 1098 de 2006 / Protocolo Comunitario..."
                value={customQuestion.normOrTitle}
                onChange={(e) => setCustomQuestion({ ...customQuestion, normOrTitle: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Artículo o Requisito Específico</label>
              <input
                type="text"
                placeholder="Ej. Art. 44 / Numeral 3.2..."
                value={customQuestion.articleOrReq}
                onChange={(e) => setCustomQuestion({ ...customQuestion, articleOrReq: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block font-semibold text-slate-700 mb-1">Descripción del Aspecto a Evaluar *</label>
              <textarea
                rows={2}
                placeholder="Describa con precisión qué debe verificar el auditor en el cargo de Gestor(a)..."
                value={customQuestion.description}
                onChange={(e) => setCustomQuestion({ ...customQuestion, description: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddCustomQuestion(false)}
              className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddQuestionSubmit}
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 shadow-xs"
            >
              Guardar y Publicar Pregunta
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area: Document View vs Cards View */}
      {viewMode === 'document' ? (
        /* Document Table View (Shows all items at once with complete findings and evidences) */
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Formato Documental Completo
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Mostrando {filteredItems.length} de {items.length} criterios evaluados
                </span>
              </div>
              <h2 className="text-base font-black text-slate-900 mt-1">
                CORPORACIÓN SOCIAL SOMOS UNO · LISTA DE CHEQUEO (FORMATO F-AUD-004)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isGeneratingPdf}
                onClick={handleExportPDF}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition shadow-xs"
                title="Descargar archivo PDF oficial directamente a tu equipo"
              >
                {isGeneratingPdf ? <FileDown className="w-4 h-4 animate-bounce" /> : <Download className="w-4 h-4" />}
                <span>Descargar PDF (.pdf)</span>
              </button>
              <button
                type="button"
                onClick={handleExportExcel}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                title="Descargar archivo Excel"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Excel (.csv)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Modo Tarjetas</span>
              </button>
            </div>
          </div>

          {/* Audit Metadata Summary Strip */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <div>
              <span className="text-slate-500 block font-semibold text-[10px] uppercase">Código y Proyecto</span>
              <span className="font-bold text-slate-900">{activeAudit.code}</span>
              <span className="text-slate-600 block text-[11px] truncate">{activeAudit.momento1.projectName}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-semibold text-[10px] uppercase">Gestor(a) Auditado(a)</span>
              <span className="font-bold text-slate-900">{activeAudit.momento1.gestorName}</span>
              <span className="text-slate-500 block text-[11px]">{activeAudit.momento1.gestorCargo}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-semibold text-[10px] uppercase">Auditor Líder</span>
              <span className="font-bold text-slate-900">{activeAudit.momento1.auditorLider}</span>
              <span className="text-slate-500 block text-[11px]">{activeAudit.momento1.startDate} al {activeAudit.momento1.endDate}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-semibold text-[10px] uppercase">Nivel de Conformidad</span>
              <span className="text-lg font-black text-[#0c2340]">
                {Math.round((cumpleCount / (totalCount - noAplicaCount || 1)) * 100)}%
              </span>
              <span className="text-slate-500 block text-[10px]">
                {cumpleCount} cumple · {noCumpleCount} no cumple · {parcialCount} parcial
              </span>
            </div>
          </div>

          {/* Full Checklist Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#0c2340] text-white">
                  <th className="p-3 w-10 text-center font-bold">N°</th>
                  <th className="p-3 w-32 font-bold">Componente</th>
                  <th className="p-3 w-44 font-bold">Norma / Requisito</th>
                  <th className="p-3 font-bold">Aspecto Evaluado</th>
                  <th className="p-3 w-28 text-center font-bold">Calificación</th>
                  <th className="p-3 font-bold">Hallazgos / Evidencias</th>
                  <th className="p-3 w-28 font-bold">Auditor & Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredItems.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-3 text-center font-bold text-slate-500">{idx + 1}</td>
                    <td className="p-3">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {item.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{item.normOrTitle}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{item.articleOrReq}</div>
                    </td>
                    <td className="p-3 text-slate-800 leading-relaxed font-medium">
                      {item.description}
                    </td>
                    <td className="p-3 text-center">
                      {item.result === 'cumple' && (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md text-[11px]">
                          <Check className="w-3 h-3" /> CUMPLE
                        </span>
                      )}
                      {item.result === 'no_cumple' && (
                        <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 font-bold px-2.5 py-1 rounded-md text-[11px]">
                          <X className="w-3 h-3" /> NO CUMPLE
                        </span>
                      )}
                      {item.result === 'cumple_parcialmente' && (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-md text-[11px]">
                          <AlertTriangle className="w-3 h-3" /> PARCIAL
                        </span>
                      )}
                      {item.result === 'no_aplica' && (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-md text-[11px]">
                          NO APLICA
                        </span>
                      )}
                      {item.result === 'sin_evaluar' && (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-400 font-bold px-2.5 py-1 rounded-md text-[11px]">
                          SIN EVALUAR
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-700 text-xs space-y-1">
                      {item.findingDescription && (
                        <div>
                          <span className="font-bold text-rose-900">Hallazgo: </span>
                          <span>{item.findingDescription}</span>
                        </div>
                      )}
                      {item.evidenceText && (
                        <div>
                          <span className="font-bold text-slate-900">Evidencia: </span>
                          <span>{item.evidenceText}</span>
                        </div>
                      )}
                      {item.attachments && item.attachments.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 mt-1">
                          <span className="font-semibold text-slate-600 text-[11px]">Soportes:</span>
                          {item.attachments.map((a) => (
                            <span key={a.id} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-mono border">
                              {a.name}
                            </span>
                          ))}
                        </div>
                      )}
                      {!item.findingDescription && !item.evidenceText && !item.attachments?.length && (
                        <span className="text-slate-400 italic">Conforme según revisión documental.</span>
                      )}
                    </td>
                    <td className="p-3 text-[11px] text-slate-500">
                      <div>{item.reviewDate}</div>
                      <div className="text-[10px] text-slate-400">{item.auditorName}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Items List (Cards View) */
        <div className="space-y-4">
          {filteredItems.map((item, index) => {
            const isNoCumple = item.result === 'no_cumple';
            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border p-5 transition-all shadow-xs space-y-4 ${
                  isNoCumple
                    ? 'border-rose-300 bg-rose-50/20'
                    : item.result === 'cumple'
                    ? 'border-emerald-200'
                    : 'border-slate-200'
                }`}
              >
                {/* Top Item Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {item.category.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {item.normOrTitle}
                      </span>
                      {item.customAdded && (
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-semibold">
                          Personalizada
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      Requisito: {item.articleOrReq}
                    </div>
                  </div>

                  {/* Response Selection Options (Cumple, No cumple, Cumple parcialmente, No aplica) */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                    {[
                      { value: 'cumple', label: 'Cumple', color: 'bg-emerald-600 text-white' },
                      { value: 'cumple_parcialmente', label: 'Parcial', color: 'bg-amber-500 text-white' },
                      { value: 'no_cumple', label: 'No Cumple', color: 'bg-rose-600 text-white' },
                      { value: 'no_aplica', label: 'No Aplica', color: 'bg-slate-700 text-white' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleUpdateItem(item.id, { result: opt.value as CheckResult })}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                          item.result === opt.value
                            ? `${opt.color} shadow-xs`
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Requirement Description */}
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Finding / What was found */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Descripción de lo Encontrado / Hallazgo
                    </label>
                    <textarea
                      rows={2}
                      value={item.findingDescription}
                      onChange={(e) => handleUpdateItem(item.id, { findingDescription: e.target.value })}
                      placeholder="Describa con exactitud lo observado en la documentación o visita de campo..."
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Evidencia Objetiva Examinada
                    </label>
                    <textarea
                      rows={2}
                      value={item.evidenceText}
                      onChange={(e) => handleUpdateItem(item.id, { evidenceText: e.target.value })}
                      placeholder="Cite nombres de actas, fechas, folios, personas entrevistadas..."
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Evidences Attachments & Meta bar */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Paperclip className="w-3.5 h-3.5" />
                      Soportes ({item.attachments.length}):
                    </span>
                    {item.attachments.map((att) => (
                      <span
                        key={att.id}
                        className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200"
                      >
                        <FileText className="w-3 h-3 text-blue-600" />
                        <span>{att.name}</span>
                        <span className="text-[10px] text-slate-400">({att.size})</span>
                      </span>
                    ))}

                    <button
                      onClick={() => setSelectedItemForEvidence(selectedItemForEvidence === item.id ? null : item.id)}
                      className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline text-[11px]"
                    >
                      <Upload className="w-3 h-3" />
                      <span>+ Adjuntar Evidencia</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                    <span>Revisado: {item.reviewDate}</span>
                    <span>·</span>
                    <span>Auditor: {item.auditorName}</span>
                  </div>
                </div>

                {/* Attach File Form if toggled */}
                {selectedItemForEvidence === item.id && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="text"
                      placeholder="Nombre del archivo o soporte (ej. Acta_Taller_08Ago.pdf)..."
                      value={newAttachmentName}
                      onChange={(e) => setNewAttachmentName(e.target.value)}
                      className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs"
                    />
                    <button
                      onClick={() => handleAddAttachment(item.id)}
                      className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold"
                    >
                      Confirmar Carga de Soporte
                    </button>
                    <button
                      onClick={() => setSelectedItemForEvidence(null)}
                      className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Actions Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <span className="text-xs text-slate-500">
          Los incumplimientos detectados se convertirán en No Conformidades durante el Momento 5.
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'cards' ? 'document' : 'cards')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition"
          >
            {viewMode === 'cards' ? <Eye className="w-4 h-4 text-blue-700" /> : <LayoutList className="w-4 h-4 text-blue-700" />}
            <span>{viewMode === 'cards' ? 'Ver Documento Completo' : 'Ver Modo Tarjetas'}</span>
          </button>
          <button
            type="button"
            disabled={isGeneratingPdf}
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition shadow-xs"
            title="Descargar archivo PDF oficial directamente"
          >
            {isGeneratingPdf ? <FileDown className="w-4 h-4 animate-bounce" /> : <Download className="w-4 h-4" />}
            <span>{isGeneratingPdf ? 'Generando...' : 'Descargar PDF (.pdf)'}</span>
          </button>
          <button
            type="button"
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
            title="Descargar lista de chequeo en formato Excel"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Excel (.csv)</span>
          </button>
          <button
            type="button"
            onClick={handlePrintPDF}
            className="flex items-center gap-1.5 px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            title="Imprimir documento en impresora física"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
          <button
            onClick={handleSaveList}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs"
          >
            Guardar Avance
          </button>
          <button
            onClick={handleFinalizeList}
            className="px-4 py-2 bg-[#0c2340] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
          >
            Finalizar Lista y Pasar a Acta de Cierre (Momento 5)
          </button>
        </div>
      </div>
    </div>

    {/* Printable Institutional Report (Visible only on window.print() / Save as PDF) */}
    <div className="print-only text-slate-900 bg-white p-8 max-w-5xl mx-auto">
      {/* Institutional Letterhead Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-extrabold tracking-wider text-slate-900 uppercase">
              Corporación Social Somos Uno
            </div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              NIT. 901.482.319-5 · Medellín, Antioquia, Colombia
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Sistema de Gestión y Control Interno · SOMOS AUDITA (2026)
            </div>
          </div>
          <div className="text-right border-l-2 border-slate-300 pl-4">
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Formato Institucional</span>
            <span className="block text-sm font-black text-slate-900">F-AUD-004</span>
            <span className="block text-[11px] text-slate-600">Versión: 02.2026</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <h1 className="text-lg font-black uppercase tracking-tight text-slate-900">
            MOMENTO 4: LISTA DE CHEQUEO DE AUDITORÍA INTEGRAL DE GESTIÓN
          </h1>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Evaluación técnica del cargo Gestor(a) de Proyectos para Sectores Vulnerables
          </p>
        </div>
      </div>

      {/* Audit Metadata Table */}
      <table className="w-full text-xs border border-slate-300 mb-6 border-collapse">
        <tbody>
          <tr className="border-b border-slate-300">
            <td className="bg-slate-100 font-bold p-2 w-1/4 border-r border-slate-300">Código de Auditoría:</td>
            <td className="p-2 font-mono font-bold w-1/4 border-r border-slate-300">{activeAudit.code}</td>
            <td className="bg-slate-100 font-bold p-2 w-1/4 border-r border-slate-300">Fecha de Emisión:</td>
            <td className="p-2 w-1/4">{new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
          </tr>
          <tr className="border-b border-slate-300">
            <td className="bg-slate-100 font-bold p-2 border-r border-slate-300">Proyecto Evaluado:</td>
            <td className="p-2 border-r border-slate-300">{activeAudit.momento1.projectName} ({activeAudit.momento1.projectCode})</td>
            <td className="bg-slate-100 font-bold p-2 border-r border-slate-300">Ubicación / Territorio:</td>
            <td className="p-2">{activeAudit.momento1.gestorLocation}</td>
          </tr>
          <tr className="border-b border-slate-300">
            <td className="bg-slate-100 font-bold p-2 border-r border-slate-300">Gestor(a) Auditado(a):</td>
            <td className="p-2 font-semibold border-r border-slate-300">{activeAudit.momento1.gestorName}</td>
            <td className="bg-slate-100 font-bold p-2 border-r border-slate-300">Cargo Evaluado:</td>
            <td className="p-2">{activeAudit.momento1.gestorCargo}</td>
          </tr>
          <tr className="border-b border-slate-300">
            <td className="bg-slate-100 font-bold p-2 border-r border-slate-300">Auditor(a) Líder:</td>
            <td className="p-2 border-r border-slate-300">{activeAudit.momento1.auditorLider}</td>
            <td className="bg-slate-100 font-bold p-2 border-r border-slate-300">Equipo de Apoyo:</td>
            <td className="p-2">{activeAudit.momento1.auditoresApoyo.join(', ')}</td>
          </tr>
          <tr>
            <td className="bg-slate-100 font-bold p-2 border-r border-slate-300">Período de Ejecución:</td>
            <td className="p-2 border-r border-slate-300">{activeAudit.momento1.startDate} al {activeAudit.momento1.endDate}</td>
            <td className="bg-slate-100 font-bold p-2 border-r border-slate-300">Estado de la Lista:</td>
            <td className="p-2 font-bold text-slate-800">{activeAudit.momento4.status || 'En curso'}</td>
          </tr>
        </tbody>
      </table>

      {/* Quantitative Summary */}
      <div className="mb-6 border border-slate-300 rounded p-3 bg-slate-50">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
          Resumen Cuantitativo de Conformidad
        </div>
        <div className="grid grid-cols-6 gap-2 text-center text-xs">
          <div className="border border-slate-300 bg-white p-2 rounded">
            <span className="block text-[10px] text-slate-500 font-semibold">Total Criterios</span>
            <span className="text-sm font-bold text-slate-900">{totalCount}</span>
          </div>
          <div className="border border-emerald-300 bg-emerald-50 p-2 rounded text-emerald-900">
            <span className="block text-[10px] text-emerald-800 font-semibold">Cumple</span>
            <span className="text-sm font-bold">{cumpleCount}</span>
          </div>
          <div className="border border-rose-300 bg-rose-50 p-2 rounded text-rose-900">
            <span className="block text-[10px] text-rose-800 font-semibold">No Cumple</span>
            <span className="text-sm font-bold">{noCumpleCount}</span>
          </div>
          <div className="border border-amber-300 bg-amber-50 p-2 rounded text-amber-900">
            <span className="block text-[10px] text-amber-800 font-semibold">Cumple Parcial</span>
            <span className="text-sm font-bold">{parcialCount}</span>
          </div>
          <div className="border border-slate-300 bg-slate-100 p-2 rounded text-slate-700">
            <span className="block text-[10px] text-slate-600 font-semibold">No Aplica</span>
            <span className="text-sm font-bold">{noAplicaCount}</span>
          </div>
          <div className="border border-blue-300 bg-blue-50 p-2 rounded text-blue-900">
            <span className="block text-[10px] text-blue-800 font-semibold">Índice Conformidad</span>
            <span className="text-sm font-bold">
              {Math.round((cumpleCount / (totalCount - noAplicaCount || 1)) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Checklist Table */}
      <div className="mb-8">
        <table className="w-full text-[11px] border border-slate-400 border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white font-bold text-left">
              <th className="p-2 border border-slate-500 w-8 text-center">N°</th>
              <th className="p-2 border border-slate-500 w-28">Componente</th>
              <th className="p-2 border border-slate-500 w-36">Norma / Requisito</th>
              <th className="p-2 border border-slate-500">Aspecto Evaluado</th>
              <th className="p-2 border border-slate-500 w-24 text-center">Resultado</th>
              <th className="p-2 border border-slate-500">Hallazgo / Evidencia Objetiva</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={it.id} className={`border-b border-slate-300 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}>
                <td className="p-2 border-r border-slate-300 text-center font-bold text-slate-600">{idx + 1}</td>
                <td className="p-2 border-r border-slate-300 font-semibold text-slate-700">
                  {it.category.replace('_', ' ').toUpperCase()}
                </td>
                <td className="p-2 border-r border-slate-300">
                  <div className="font-bold text-slate-900">{it.normOrTitle}</div>
                  <div className="text-[10px] text-slate-500">{it.articleOrReq}</div>
                </td>
                <td className="p-2 border-r border-slate-300 text-slate-800 leading-snug">
                  {it.description}
                </td>
                <td className="p-2 border-r border-slate-300 text-center font-bold">
                  {it.result === 'cumple' && <span className="text-emerald-700">CUMPLE</span>}
                  {it.result === 'no_cumple' && <span className="text-rose-700">NO CUMPLE</span>}
                  {it.result === 'cumple_parcialmente' && <span className="text-amber-700">PARCIAL</span>}
                  {it.result === 'no_aplica' && <span className="text-slate-500">N/A</span>}
                  {it.result === 'sin_evaluar' && <span className="text-slate-400">SIN EVALUAR</span>}
                </td>
                <td className="p-2 text-slate-700 leading-snug">
                  {it.findingDescription && (
                    <div className="mb-1">
                      <span className="font-bold text-slate-900">Hallazgo: </span>
                      {it.findingDescription}
                    </div>
                  )}
                  {it.evidenceText && (
                    <div>
                      <span className="font-bold text-slate-900">Evidencia: </span>
                      {it.evidenceText}
                    </div>
                  )}
                  {it.attachments && it.attachments.length > 0 && (
                    <div className="mt-1 text-[10px] text-slate-500">
                      <span className="font-semibold">Soportes: </span>
                      {it.attachments.map((a) => a.name).join(', ')}
                    </div>
                  )}
                  {!it.findingDescription && !it.evidenceText && !it.attachments?.length && (
                    <span className="text-slate-400 italic">Conforme según revisión documental.</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Institutional Signatures Section */}
      <div className="pt-8 border-t-2 border-slate-400 grid grid-cols-3 gap-6 text-center text-xs">
        <div>
          <div className="border-b border-slate-500 mb-2 h-14"></div>
          <div className="font-bold text-slate-900">{activeAudit.momento1.auditorLider}</div>
          <div className="text-[11px] text-slate-600">Auditor(a) Líder de Calidad</div>
          <div className="text-[10px] text-slate-400">Corporación Social Somos Uno</div>
        </div>
        <div>
          <div className="border-b border-slate-500 mb-2 h-14"></div>
          <div className="font-bold text-slate-900">{activeAudit.momento1.gestorName}</div>
          <div className="text-[11px] text-slate-600">{activeAudit.momento1.gestorCargo}</div>
          <div className="text-[10px] text-slate-400">Persona Auditada</div>
        </div>
        <div>
          <div className="border-b border-slate-500 mb-2 h-14"></div>
          <div className="font-bold text-slate-900">Dra. Claudia Marcela Henao</div>
          <div className="text-[11px] text-slate-600">Dirección de Control Interno / Calidad</div>
          <div className="text-[10px] text-slate-400">Corporación Social Somos Uno</div>
        </div>
      </div>
    </div>
  </>
);
};
