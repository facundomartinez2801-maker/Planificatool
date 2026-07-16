import React, { useState } from 'react';
import { MessageCircle, X, Check } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  timestamp: string;
  selectionStart: number;
  selectionEnd: number;
}

interface CommentThreadProps {
  comments: Comment[];
  onAddComment: (text: string, start: number, end: number) => void;
  onApplyChanges: (comments: Comment[]) => void;
  onDeleteComment: (id: string) => void;
  selectedText?: string;
  isApplying?: boolean;
}

export const CommentThread: React.FC<CommentThreadProps> = ({
  comments,
  onAddComment,
  onApplyChanges,
  onDeleteComment,
  selectedText = '',
  isApplying = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const handleAddComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText, selectionStart, selectionEnd);
      setCommentText('');
      setSelectionStart(0);
      setSelectionEnd(0);
    }
  };

  const handleApplyChanges = () => {
    onApplyChanges(comments);
  };

  const handleSelectText = (e: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
      const range = selection.getRangeAt(0);
      setSelectionStart(range.startOffset);
      setSelectionEnd(range.endOffset);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-teal-600 hover:bg-teal-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 active:scale-95"
        title="Comentarios y cambios"
      >
        <MessageCircle size={24} />
        {comments.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {comments.length}
          </span>
        )}
      </button>

      {/* Panel de comentarios */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-teal-50 p-4 border-b border-stone-200 flex justify-between items-center">
            <h3 className="font-bold text-stone-800">Comentarios y Cambios</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Área de comentarios */}
          <div className="max-h-80 overflow-y-auto p-4 space-y-3">
            {comments.length === 0 ? (
              <p className="text-sm text-stone-400 text-center py-4">
                No hay comentarios aún. Selecciona texto en el documento y comenta los cambios que quieres.
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <p className="text-sm font-medium text-blue-900 flex-grow">{comment.text}</p>
                    <button
                      onClick={() => onDeleteComment(comment.id)}
                      className="text-blue-400 hover:text-blue-600 transition-colors flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-blue-600">{comment.timestamp}</p>
                </div>
              ))
            )}
          </div>

          {/* Formulario de nuevo comentario */}
          <div className="border-t border-stone-200 p-4 bg-stone-50 space-y-3">
            {selectedText && (
              <div className="bg-yellow-50 p-2 rounded border border-yellow-200 text-xs text-yellow-800">
                <p className="font-medium mb-1">Texto seleccionado:</p>
                <p className="italic truncate">"{selectedText}"</p>
              </div>
            )}

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Describe el cambio que quieres..."
              className="w-full p-2 border border-stone-300 rounded-lg text-sm resize-none focus:outline-none focus:border-teal-500"
              rows={2}
            />

            <button
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              Agregar comentario
            </button>
          </div>

          {/* Botón de aplicar cambios */}
          {comments.length > 0 && (
            <div className="border-t border-stone-200 p-4 bg-teal-50">
              <button
                onClick={handleApplyChanges}
                disabled={isApplying}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Check size={18} />
                {isApplying ? 'Aplicando cambios...' : 'Aplicar cambios'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
