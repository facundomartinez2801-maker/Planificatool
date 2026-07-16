import React, { useState } from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface IdeaFormProps {
  onBack: () => void;
  onSubmit: (idea: string) => void;
  materialType: string;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ onBack, onSubmit, materialType }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = () => {
    if (idea.trim().length >= 5) {
      onSubmit(idea);
    }
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto py-12 px-4">
      <button onClick={onBack} className="text-teal-700 hover:text-teal-900 mb-6 font-medium flex items-center gap-1">
        ← Volver atrás
      </button>

      <h1 className="text-3xl font-bold text-stone-800 mb-3">Contame tu idea inicial</h1>
      <p className="text-stone-600 mb-8 text-lg">
        Escribí con tus propias palabras qué te gustaría enseñar, a quiénes y si tenés algún objetivo en mente.
        No te preocupes por el formato, la IA te ayudará a ordenarlo.
      </p>

      <div className="bg-white p-2 rounded-2xl shadow-sm border border-stone-200">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Ej: Quiero armar un proyecto para chicos de 5to grado sobre las plantas nativas de nuestra región..."
          className="w-full h-64 p-4 rounded-xl outline-none resize-none text-stone-800 text-lg leading-relaxed placeholder-stone-400"
        />
      </div>

      <div className="mt-8 flex justify-between items-center bg-teal-50 p-4 rounded-lg border border-teal-100">
        <div className="flex items-center gap-3 text-teal-800">
          <Lightbulb size={20} />
          <p className="text-sm">En el próximo paso conversaremos para refinar esta idea.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={idea.trim().length < 5}
          className="bg-teal-700 text-white px-8 py-3 rounded-lg font-medium text-lg disabled:opacity-50 hover:bg-teal-800 transition-colors shadow-sm flex items-center gap-2"
        >
          Iniciar charla <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
