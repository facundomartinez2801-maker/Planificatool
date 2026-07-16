import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Eye } from 'lucide-react';
import { Planificacion } from '../context/PlanContext';

interface DashboardPageProps {
  onNewPlan: () => void;
  onViewPlan: (plan: Planificacion) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNewPlan, onViewPlan }) => {
  const [plans, setPlans] = useState<Planificacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/planificaciones', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro que quieres eliminar esta planificación?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/planificaciones/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete');
      setPlans(plans.filter(p => p._id !== id));
    } catch (error) {
      alert('Error al eliminar la planificación');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-teal-700 text-white p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <h1 className="text-3xl font-bold text-stone-800">Mis Planificaciones</h1>
            </div>
            <button
              onClick={onNewPlan}
              className="bg-teal-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors flex items-center gap-2 shadow-md"
            >
              <Plus size={20} />
              Nueva Planificación
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-stone-600">Cargando...</div>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center">
            <BookOpen size={48} className="mx-auto text-stone-300 mb-4" />
            <h2 className="text-2xl font-bold text-stone-800 mb-2">No tienes planificaciones aún</h2>
            <p className="text-stone-600 mb-6">Comienza creando una nueva planificación con ayuda de la IA</p>
            <button
              onClick={onNewPlan}
              className="bg-teal-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Crear tu primera planificación
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-stone-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-stone-800 mb-2 line-clamp-2">
                    {plan.titulo || 'Planificación sin título'}
                  </h3>
                  <p className="text-sm text-stone-600 mb-4">
                    <span className="inline-block bg-teal-50 text-teal-700 px-2 py-1 rounded">
                      {plan.tipo_material}
                    </span>
                  </p>
                  <p className="text-sm text-stone-500 line-clamp-3 mb-4">
                    {plan.idea_inicial}
                  </p>
                  <p className="text-xs text-stone-400 mb-4">
                    {plan.created_at ? new Date(plan.created_at).toLocaleDateString('es-AR') : 'Fecha desconocida'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewPlan(plan)}
                      className="flex-1 bg-teal-600 text-white py-2 rounded px-3 text-sm font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye size={16} />
                      Ver
                    </button>
                    <button
                      onClick={() => plan._id && handleDelete(plan._id)}
                      className="bg-red-50 text-red-700 py-2 rounded px-3 text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
