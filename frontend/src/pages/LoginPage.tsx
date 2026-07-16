import React, { useState } from 'react';
import { BookOpen, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { login, register, isLoading } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        if (!nombre.trim()) {
          setError('Por favor ingresa tu nombre');
          return;
        }
        await register(email, password, nombre);
      } else {
        await login(email, password);
      }
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al procesar la solicitud');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-white p-3 rounded-lg">
            <BookOpen size={32} className="text-teal-700" />
          </div>
          <h1 className="text-3xl font-bold text-white">PlanificaTool</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-2 text-center">
            {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h2>
          <p className="text-stone-600 text-center mb-6">
            {isRegister
              ? 'Únete a miles de docentes usando PlanificaTool'
              : 'Accede con tu cuenta'}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-teal-500"
                  required={isRegister}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Procesando...</span>
              ) : (
                <>
                  {isRegister ? <UserPlus size={20} /> : <LogIn size={20} />}
                  {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-stone-600 text-sm">
              {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError('');
                  setNombre('');
                  setEmail('');
                  setPassword('');
                }}
                className="text-teal-700 font-semibold hover:text-teal-800"
              >
                {isRegister ? 'Inicia sesión' : 'Regístrate aquí'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-8 opacity-75">
          © 2024 PlanificaTool - Simplificando la planificación educativa
        </p>
      </div>
    </div>
  );
};
