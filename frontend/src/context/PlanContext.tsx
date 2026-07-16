import React, { createContext, useState, useCallback, ReactNode } from 'react';

export interface Message {
  id: number;
  sender: 'user' | 'ia';
  type: 'text' | 'summary-question' | 'suggestion';
  text: string;
  summary?: string;
  suggestionData?: {
    title: string;
    items: string[];
  };
  suggestionAccepted?: boolean;
}

export interface Planificacion {
  _id?: string;
  tipo_material: string;
  idea_inicial: string;
  titulo: string;
  contenido: Record<string, any>;
  chat_history: Message[];
  created_at?: string;
  updated_at?: string;
}

interface PlanContextType {
  currentPlanificacion: Planificacion | null;
  currentStep: number;
  messages: Message[];
  isLoading: boolean;

  setCurrentPlanificacion: (plan: Planificacion) => void;
  setCurrentStep: (step: number) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: number, updates: Partial<Message>) => void;
  savePlanificacion: () => Promise<void>;
  createNewPlanificacion: (tipo_material: string, idea_inicial: string) => Promise<void>;
}

export const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPlanificacion, setCurrentPlanificacion] = useState<Planificacion | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const updateMessage = useCallback((id: number, updates: Partial<Message>) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, ...updates } : msg));
  }, []);

  const savePlanificacion = useCallback(async () => {
    if (!currentPlanificacion) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const method = currentPlanificacion._id ? 'PUT' : 'POST';
      const url = currentPlanificacion._id
        ? `/api/planificaciones/${currentPlanificacion._id}`
        : '/api/planificaciones';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...currentPlanificacion,
          chat_history: messages,
        }),
      });

      if (!response.ok) throw new Error('Failed to save');
      const data = await response.json();
      setCurrentPlanificacion(data);
    } finally {
      setIsLoading(false);
    }
  }, [currentPlanificacion, messages]);

  const createNewPlanificacion = useCallback(async (tipo_material: string, idea_inicial: string) => {
    setIsLoading(true);
    try {
      const newPlan: Planificacion = {
        tipo_material,
        idea_inicial,
        titulo: '',
        contenido: {},
        chat_history: [],
      };
      setCurrentPlanificacion(newPlan);
      setMessages([]);
      setCurrentStep(3);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    currentPlanificacion,
    currentStep,
    messages,
    isLoading,
    setCurrentPlanificacion,
    setCurrentStep,
    addMessage,
    updateMessage,
    savePlanificacion,
    createNewPlanificacion,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export const usePlan = () => {
  const context = React.useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within PlanProvider');
  }
  return context;
};
