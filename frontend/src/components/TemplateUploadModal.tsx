import React, { useRef, useState } from 'react';
import { Upload, Wand2, X } from 'lucide-react';

interface TemplateUploadModalProps {
  onClose: () => void;
  onSelectCargar: (file: File) => void;
  onSelectGenerar: () => void;
  isLoading?: boolean;
}

export const TemplateUploadModal: React.FC<TemplateUploadModalProps> = ({
  onClose,
  onSelectCargar,
  onSelectGenerar,
  isLoading = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea Word o PDF
      const validTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
      if (validTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        alert('Por favor, sube un archivo Word (.doc, .docx) o PDF');
      }
    }
  };

  const handleCargar = () => {
    if (selectedFile) {
      onSelectCargar(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900 bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-stone-800">¿Cómo generar tu documento?</h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-stone-600 mb-8">Elige cómo quieres que la IA genere tu documento basándose en la entrevista que completaste.</p>

        <div className="space-y-4">
          {/* OPCIÓN 1: Cargar Plantilla */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full text-left p-6 rounded-xl border-2 border-stone-200 hover:border-teal-500 hover:bg-teal-50 flex items-start gap-4 transition-all cursor-pointer group"
          >
            <div className="bg-teal-100 p-3 rounded-lg text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors flex-shrink-0">
              <Upload size={24} />
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold text-stone-800 mb-1">Cargar mi plantilla</h4>
              <p className="text-sm text-stone-500">
                {selectedFile ? (
                  <span className="text-teal-700 font-medium">✓ Archivo seleccionado: {selectedFile.name}</span>
                ) : (
                  'Sube un archivo Word o PDF con tu formato institucional. La IA lo analizará y completará con los datos de la entrevista.'
                )}
              </p>
            </div>
          </div>

          {/* Input de archivo (oculto) */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            accept=".doc,.docx,.pdf"
            className="hidden"
          />

          {/* Botón para Cargar si hay archivo seleccionado */}
          {selectedFile && (
            <button
              onClick={handleCargar}
              disabled={isLoading}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              Usar esta plantilla
            </button>
          )}

          {/* OPCIÓN 2: Generar Plantilla */}
          <button
            onClick={onSelectGenerar}
            disabled={isLoading}
            className="w-full text-left p-6 rounded-xl border-2 border-teal-600 bg-teal-50 hover:bg-teal-100 flex items-start gap-4 transition-all disabled:opacity-50"
          >
            <div className="bg-teal-600 p-3 rounded-lg text-white flex-shrink-0">
              <Wand2 size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-teal-900 mb-1">Que la IA diseñe una plantilla</h4>
              <p className="text-sm text-teal-700">
                La IA generará una plantilla profesional y bien estructurada basándose en el tipo de documento y los datos de tu entrevista.
              </p>
            </div>
          </button>
        </div>

        {/* Botón Cancelar */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="mt-8 w-full text-center text-stone-500 font-medium hover:text-stone-800 py-2 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
