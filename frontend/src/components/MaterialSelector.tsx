import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Layers, Pen, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

const MATERIAL_OPTIONS = [
  { id: 'secuencia', title: 'Secuencia Didáctica', desc: 'Sucesión de clases articuladas para enseñar un tema.', icon: Layers },
  { id: 'anual', title: 'Planificación Anual', desc: 'Organización general de contenidos de todo el año.', icon: Calendar },
  { id: 'clase', title: 'Plan de Clases', desc: 'Estructura detallada para una sola jornada o bloque.', icon: BookOpen },
  { id: 'proyecto', title: 'Proyecto Educativo', desc: 'Propuesta interdisciplinaria basada en un producto o problema.', icon: Lightbulb },
  { id: 'guion', title: 'Guion Conjetural', desc: 'Narrativa de cómo te imaginás que transcurrirá la clase.', icon: Pen },
  { id: 'otro', title: 'Otro', desc: 'Cualquier otro formato que necesites.', icon: BookOpen }
];

interface MaterialSelectorProps {
  onSelect: (materialType: string) => void;
}

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({ onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    onSelect(MATERIAL_OPTIONS[activeIndex].id);
  }, [activeIndex, onSelect]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % MATERIAL_OPTIONS.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + MATERIAL_OPTIONS.length) % MATERIAL_OPTIONS.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto py-12 px-4 overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 text-center">¿Qué material querés preparar hoy?</h1>
      <p className="text-stone-600 mb-12 text-lg text-center max-w-2xl mx-auto">
        Deslizá para ver las opciones. La tarjeta central quedará seleccionada automáticamente.
      </p>

      <div
        className="relative w-full max-w-5xl mx-auto h-[480px] sm:h-[520px] flex justify-center items-center mb-10 select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Botón Anterior */}
        <button
          onClick={handlePrev}
          className="absolute left-0 md:left-6 z-50 bg-white/90 backdrop-blur-sm border border-stone-200 shadow-md rounded-full p-3 md:p-4 text-stone-600 hover:text-teal-700 hover:border-teal-400 transition-all hover:scale-110 active:scale-95"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Tarjetas */}
        <div className="relative w-full max-w-[280px] sm:max-w-[340px] h-[420px] sm:h-[460px] flex justify-center items-center">
          {MATERIAL_OPTIONS.map((opt, index) => {
            let offset = index - activeIndex;
            const total = MATERIAL_OPTIONS.length;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            const translateX = `calc(${offset} * 115%)`;
            const scale = isCenter ? 1 : 0.85;
            const opacity = isCenter ? 1 : (Math.abs(offset) === 1 ? 0.6 : 0);
            const zIndex = 30 - Math.abs(offset);

            const Icon = opt.icon;

            return (
              <div
                key={opt.id}
                className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out cursor-pointer"
                style={{
                  transform: `translateX(${translateX}) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: isVisible ? 'auto' : 'none'
                }}
              >
                <div className={`w-full h-full flex flex-col p-6 sm:p-8 rounded-3xl border-2 transition-colors duration-300 shadow-xl
                  ${isCenter
                    ? 'border-teal-500 bg-white shadow-teal-900/10'
                    : 'border-stone-200 bg-stone-50/90 hover:border-teal-300'}`}
                >
                  <div className={`mb-8 mt-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-500
                    ${isCenter ? 'bg-teal-600 text-white shadow-lg scale-110' : 'bg-stone-200 text-stone-500'}`}>
                    <Icon size={isCenter ? 40 : 32} />
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold text-center mb-4 transition-colors ${isCenter ? 'text-teal-900' : 'text-stone-700'}`}>
                    {opt.title}
                  </h3>

                  <p className={`text-center text-sm sm:text-base leading-relaxed flex-grow transition-colors ${isCenter ? 'text-stone-600' : 'text-stone-500'}`}>
                    {opt.desc}
                  </p>

                  <div className={`mt-4 py-3 px-4 rounded-xl text-center text-sm font-semibold transition-all duration-300
                    ${isCenter ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'bg-transparent text-stone-400 opacity-0'}`}>
                    Opción Seleccionada
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={handleNext}
          className="absolute right-0 md:right-6 z-50 bg-white/90 backdrop-blur-sm border border-stone-200 shadow-md rounded-full p-3 md:p-4 text-stone-600 hover:text-teal-700 hover:border-teal-400 transition-all hover:scale-110 active:scale-95"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button className="w-full sm:w-auto bg-teal-700 text-white px-12 py-4 rounded-xl font-medium text-lg hover:bg-teal-800 transition-colors shadow-md hover:shadow-lg">
          Confirmar y Continuar
        </button>
      </div>
    </div>
  );
};
