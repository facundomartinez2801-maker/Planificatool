import React, { useRef, useEffect, useState } from 'react';
import { Send, Upload, FileText, CheckCircle, Wand2 } from 'lucide-react';
import { usePlan, Message } from '../context/PlanContext';

interface ChatInterfaceProps {
  onGenerateDocument: () => void;
  materialType: string;
}

interface ExtractedInfo {
  pais?: string;
  provincia?: string;
  materia?: string;
  nivel?: string;
  objetivo?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onGenerateDocument, materialType }) => {
  const { messages, addMessage, updateMessage, currentPlanificacion, setCurrentPlanificacion } = usePlan();
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [templateDefined, setTemplateDefined] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo | null>(null);
  const [interviewPhase, setInterviewPhase] = useState<'initial' | 'dynamic' | 'complete'>('initial');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Ejemplo de párrafo inicial
  const INITIAL_PROMPT_EXAMPLE = `Una ${materialType === 'secuencia' ? 'secuencia de' : ''} de [MATERIA] para [NIVEL] acorde a los lineamientos curriculares de [PAÍS/PROVINCIA] que funcione para trabajar lo siguiente...`;

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Inicializar con mensaje de ejemplo
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMsg: Message = {
        id: Date.now(),
        sender: 'ia',
        type: 'text',
        text: `Hola 👋 Para ayudarte a crear una excelente ${materialType}, por favor describe tu idea en un párrafo. Incluye: el país/provincia, nivel educativo, materia, y qué quieres trabajar específicamente.`,
      };
      addMessage(welcomeMsg);
    }
  }, []);

  const analyzeInitialIdea = async (idea: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/chat/analyze-initial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          initial_idea: idea,
          material_type: materialType,
        }),
      });

      if (!response.ok) throw new Error('Failed to analyze');
      const data = await response.json();

      setExtractedInfo(data.extracted_info);
      setInterviewPhase('dynamic');

      // IA responde con lo que entendió y pregunta sobre lo que falta
      const iaMsg: Message = {
        id: Date.now(),
        sender: 'ia',
        type: 'text',
        text: data.message,
        summary: data.summary,
      };
      addMessage(iaMsg);
    } catch (error) {
      const errorMsg: Message = {
        id: Date.now(),
        sender: 'ia',
        type: 'text',
        text: 'Disculpa, hubo un error analizando tu idea. Por favor intenta de nuevo.',
      };
      addMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const newUserMsg: Message = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      text: chatInput,
    };
    addMessage(newUserMsg);
    const messageText = chatInput;
    setChatInput('');

    // Si es el primer mensaje, es el párrafo inicial
    if (interviewPhase === 'initial' && messages.length === 1) {
      await analyzeInitialIdea(messageText);
      return;
    }

    // Si es en fase dinámica, continúa la entrevista
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/chat/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: messageText,
          history: messages,
          extracted_info: extractedInfo,
          material_type: materialType,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();

      const iaMsg: Message = {
        id: Date.now() + 1,
        sender: 'ia',
        type: 'text',
        text: data.message,
        summary: data.summary,
      };
      addMessage(iaMsg);

      // Si la entrevista está completa, mostrar botón "Generar documento"
      if (data.interview_complete) {
        setInterviewPhase('complete');
      }
    } catch (error) {
      const errorMsg: Message = {
        id: Date.now() + 1,
        sender: 'ia',
        type: 'text',
        text: 'Disculpa, hubo un error. Por favor intenta de nuevo.',
      };
      addMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const attemptFinish = () => {
    if (!templateDefined) {
      setShowTemplateModal(true);
    } else {
      onGenerateDocument();
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto flex flex-col h-[calc(100vh-4rem)] pt-6 pb-4 px-2 md:px-4">
      {/* Chat Header */}
      <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-teal-100 p-2 rounded-full text-teal-700">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="font-bold text-stone-800">Asistente Pedagógico</h2>
            <p className="text-xs text-stone-500">Diseñando tu planificación</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTemplateDefined(!templateDefined)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border
              ${templateDefined ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'}`}
          >
            {templateDefined ? <CheckCircle size={16} /> : <Upload size={16} />}
            <span className="hidden sm:inline">{templateDefined ? 'Plantilla Lista' : 'Cargar Plantilla'}</span>
          </button>
          <button
            onClick={attemptFinish}
            className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 rounded-md text-sm font-medium shadow-sm transition-colors"
          >
            Generar Documento
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-stone-50 rounded-xl p-4 md:p-6 border border-stone-200 shadow-inner mb-4 flex flex-col gap-6">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-stone-400">
            <p>Comienza la conversación escribiendo tu pregunta</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] md:max-w-[75%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.summary && msg.sender === 'ia' && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-t-xl rounded-br-xl mb-1 ml-2 text-sm text-stone-700 shadow-sm w-full">
                  <div className="flex items-center gap-2 font-semibold text-amber-800 mb-1">
                    <span>Lo que entendí:</span>
                  </div>
                  <p>{msg.summary}</p>
                </div>
              )}

              <div className={`p-4 rounded-2xl shadow-sm text-[15px] leading-relaxed
                ${msg.sender === 'user'
                  ? 'bg-teal-700 text-white rounded-tr-none'
                  : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none ml-2'}`}
              >
                {msg.text}
              </div>

              <span className={`text-xs text-stone-400 mt-1 mx-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.sender === 'user' ? 'Vos' : 'PlanificaTool'}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-stone-200 text-stone-600 p-4 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm flex items-end gap-2">
        <textarea
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Escribí tu respuesta aquí..."
          className="flex-1 max-h-32 min-h-[44px] p-3 rounded-lg outline-none resize-none text-stone-800 placeholder-stone-400 bg-transparent"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!chatInput.trim() || isLoading}
          className="bg-teal-700 text-white p-3 rounded-lg disabled:opacity-50 hover:bg-teal-800 transition-colors h-[44px] flex items-center justify-center mb-1"
        >
          <Send size={20} />
        </button>
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-stone-900 bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-stone-800 mb-2">¡Casi listo para generar!</h3>
            <p className="text-stone-600 mb-6">¿Cómo preferís que organice la información?</p>

            <div className="space-y-3">
              <button onClick={() => { setTemplateDefined(true); setShowTemplateModal(false); }} className="w-full text-left p-4 rounded-xl border border-stone-200 hover:border-teal-500 hover:bg-teal-50 flex items-start gap-4 transition-colors">
                <div className="bg-teal-100 p-2 rounded-lg text-teal-700">
                  <Upload size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800">Cargar mi propia plantilla</h4>
                  <p className="text-sm text-stone-500">Subir un archivo Word o PDF vacío.</p>
                </div>
              </button>

              <button onClick={() => { setTemplateDefined(true); setShowTemplateModal(false); }} className="w-full text-left p-4 rounded-xl border-2 border-teal-600 bg-teal-50 hover:bg-teal-100 flex items-start gap-4 transition-colors">
                <div className="bg-teal-600 p-2 rounded-lg text-white">
                  <Wand2 size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-teal-900">Que la IA diseñe una plantilla</h4>
                  <p className="text-sm text-teal-700">Usar un formato estándar profesional.</p>
                </div>
              </button>
            </div>

            <button onClick={() => setShowTemplateModal(false)} className="mt-6 w-full text-center text-stone-500 font-medium hover:text-stone-800 py-2">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
