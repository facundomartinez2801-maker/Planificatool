import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlanProvider, usePlan, Planificacion } from './context/PlanContext';
import { Header } from './components/Header';
import { MaterialSelector } from './components/MaterialSelector';
import { IdeaForm } from './components/IdeaForm';
import { ChatInterface } from './components/ChatInterface';
import { DocumentEditor } from './components/DocumentEditor';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const { currentStep, setCurrentStep, setCurrentPlanificacion, createNewPlanificacion, setCurrentPlanificacion } = usePlan();
  const [selectedMaterial, setSelectedMaterial] = useState('secuencia');
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'editor'>('dashboard');

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setCurrentPage('dashboard')} />;
  }

  const handleMaterialSelect = (material: string) => {
    setSelectedMaterial(material);
  };

  const handleStartPlan = () => {
    setCurrentStep(2);
  };

  const handleIdeaSubmit = async (idea: string) => {
    await createNewPlanificacion(selectedMaterial, idea);
  };

  const handleGenerateDocument = () => {
    setCurrentStep(4);
  };

  const handleNewPlan = () => {
    setCurrentStep(1);
    setCurrentPage('editor');
  };

  const handleViewPlan = (plan: Planificacion) => {
    setCurrentPlanificacion(plan);
    setCurrentPage('editor');
    setCurrentStep(4);
  };

  const handleBack = () => {
    setCurrentPage('dashboard');
  };

  if (currentPage === 'dashboard') {
    return (
      <>
        <Header currentStep={0} onLogout={() => setCurrentPage('dashboard')} />
        <DashboardPage
          onNewPlan={handleNewPlan}
          onViewPlan={handleViewPlan}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-900 selection:bg-teal-200">
      <Header
        currentStep={currentStep}
        onLogout={() => {
          logout();
          setCurrentPage('dashboard');
        }}
      />

      <main>
        {currentStep === 1 && (
          <>
            <MaterialSelector onSelect={handleMaterialSelect} />
            <div className="flex justify-center pb-12">
              <button
                onClick={handleStartPlan}
                className="w-full sm:w-auto bg-teal-700 text-white px-12 py-4 rounded-xl font-medium text-lg hover:bg-teal-800 transition-colors shadow-md hover:shadow-lg"
              >
                Confirmar y Continuar
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <IdeaForm
            onBack={() => setCurrentStep(1)}
            onSubmit={handleIdeaSubmit}
            materialType={selectedMaterial}
          />
        )}

        {currentStep === 3 && (
          <ChatInterface onGenerateDocument={handleGenerateDocument} />
        )}

        {currentStep === 4 && (
          <DocumentEditor onBack={() => setCurrentStep(3)} />
        )}
      </main>

      <button
        onClick={() => setCurrentPage('dashboard')}
        className="fixed bottom-6 right-6 bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-800 transition-colors shadow-lg"
      >
        Ir al dashboard
      </button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PlanProvider>
        <AppContent />
      </PlanProvider>
    </AuthProvider>
  );
}
