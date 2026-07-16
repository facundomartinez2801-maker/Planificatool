import React, { useState } from 'react';
import { Download, FileText, Loader } from 'lucide-react';
import { usePlan } from '../context/PlanContext';

interface DocumentEditorProps {
  onBack: () => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ onBack }) => {
  const { currentPlanificacion } = usePlan();
  const [isExporting, setIsExporting] = useState(false);
  const [content, setContent] = useState('Contenido de tu planificación');

  const handleExport = async (format: 'pdf' | 'docx') => {
    if (!currentPlanificacion?.titulo) {
      alert('Por favor completa el titulo de la planificación');
      return;
    }

    setIsExporting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/exportar/${format}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          planificacion: currentPlanificacion,
          content,
        }),
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `planificacion.${format === 'pdf' ? 'pdf' : 'docx'}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error al exportar. Intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-[#E5E7EB] min-h-screen pb-12">
      {/* Floating Toolbar */}
      <div className="sticky top-16 z-10 bg-white border-b border-stone-200 shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-stone-500 hover:text-stone-800 text-sm font-medium hidden sm:block">
            ← Volver al chat
          </button>
          <div className="h-4 w-px bg-stone-300 hidden sm:block"></div>
          <span className="text-stone-600 font-medium text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Autoguardado activado
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="flex items-center gap-2 bg-white border border-stone-300 text-stone-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-50 shadow-sm transition-colors disabled:opacity-50"
          >
            {isExporting ? <Loader size={16} className="animate-spin" /> : <Download size={16} />}
            <span className="hidden sm:inline">Descargar PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button
            onClick={() => handleExport('docx')}
            disabled={isExporting}
            className="flex items-center gap-2 bg-[#2b579a] hover:bg-[#1f4277] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors disabled:opacity-50"
          >
            {isExporting ? <Loader size={16} className="animate-spin" /> : <Download size={16} />}
            <span className="hidden sm:inline">Descargar Word</span>
            <span className="sm:hidden">Word</span>
          </button>
        </div>
      </div>

      {/* Document Editor */}
      <div className="max-w-4xl mx-auto mt-8 px-2 sm:px-4 animate-fade-in">
        <div
          className="bg-white shadow-lg rounded-sm p-8 sm:p-12 min-h-[1056px] outline-none font-serif text-stone-800 leading-relaxed"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(e) => setContent(e.currentTarget.innerText)}
        >
          <h1 className="text-3xl font-bold text-center mb-6 border-b-2 border-stone-200 pb-4">
            {currentPlanificacion?.titulo || 'Tu Planificación'}
          </h1>

          <div className="mb-6 space-y-2 text-sm text-stone-600">
            <p><strong>Tipo:</strong> {currentPlanificacion?.tipo_material || 'Planificación'}</p>
            <p><strong>Creada:</strong> {currentPlanificacion?.created_at ? new Date(currentPlanificacion.created_at).toLocaleDateString('es-AR') : 'Hoy'}</p>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-3 text-teal-800">Descripción</h2>
          <p className="mb-4 text-justify">
            {currentPlanificacion?.idea_inicial || 'Tu idea inicial aparecerá aquí.'}
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-teal-800">Contenido</h2>
          <p className="mb-4">
            Edita este documento libremente. Todos los cambios se guardan automáticamente.
          </p>

          <div className="mt-12 p-4 border border-stone-200 bg-stone-50 rounded-lg text-sm text-stone-500 italic text-center" contentEditable="false">
            Hacé clic en cualquier parte del texto para editarlo libremente.
          </div>
        </div>
      </div>
    </div>
  );
};
