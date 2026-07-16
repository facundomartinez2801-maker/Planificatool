import React from 'react';
import { BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentStep: number;
  onLogout?: () => void;
}

const steps = [
  { id: 1, label: 'Selección' },
  { id: 2, label: 'Idea Inicial' },
  { id: 3, label: 'Entrevista' },
  { id: 4, label: 'Resultado' }
];

export const Header: React.FC<HeaderProps> = ({ currentStep, onLogout }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-teal-700 text-white p-2 rounded-lg">
            <BookOpen size={24} />
          </div>
          <span className="font-bold text-xl text-teal-900 tracking-tight">PlanificaTool</span>
        </div>

        {/* Progress Indicator */}
        <nav className="hidden md:flex items-center gap-4 flex-1 mx-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors
                ${currentStep > step.id ? 'bg-teal-100 text-teal-700' :
                  currentStep === step.id ? 'bg-teal-700 text-white shadow-md' : 'bg-stone-100 text-stone-400'}`}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <span className={`ml-2 text-sm font-medium ${currentStep === step.id ? 'text-teal-900' : 'text-stone-500'}`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-stone-300 mx-3"></div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="md:hidden text-sm font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Paso {currentStep} de 4
          </div>
          {user && (
            <>
              <span className="text-sm text-stone-600 hidden sm:inline">{user.nombre}</span>
              <button
                onClick={handleLogout}
                className="text-stone-600 hover:text-teal-700 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
