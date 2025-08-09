import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skull, EyeOff, Shuffle, PlusCircle, Trash2 } from 'lucide-react';

const AdminTroll = () => {
  const [gameToTroll, setGameToTroll] = useState('memory');
  const [memoryCards, setMemoryCards] = useState(['🎈', '🌟', '🦋', '🌈', '🎨', '🎪', '🚀', '🎭']);
  const [puzzleImageUrl, setPuzzleImageUrl] = useState('');
  const [puzzleSize, setPuzzleSize] = useState(3);
  const [quizQuestions, setQuizQuestions] = useState([
    { question: '¿Cuál es el planeta más grande del sistema solar?', options: ['Tierra', 'Júpiter', 'Saturno', 'Neptuno'], correct: 1 },
  ]);

  const handleMemoryCardChange = (index, value) => {
    const newCards = [...memoryCards];
    newCards[index] = value;
    setMemoryCards(newCards);
  };

  const addMemoryCard = () => {
    setMemoryCards(prev => [...prev, '❓']);
  };

  const removeMemoryCard = (index) => {
    setMemoryCards(prev => prev.filter((_, i) => i !== index));
  };

  const shuffleMemoryCards = () => {
    setMemoryCards(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleQuizQuestionChange = (qIndex, field, value) => {
    const newQuestions = [...quizQuestions];
    if (field === 'options') {
      newQuestions[qIndex].options[value.index] = value.value;
    } else {
      newQuestions[qIndex][field] = value;
    }
    setQuizQuestions(newQuestions);
  };

  const addQuizQuestion = () => {
    setQuizQuestions(prev => [...prev, { question: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const removeQuizQuestion = (qIndex) => {
    setQuizQuestions(prev => prev.filter((_, i) => i !== qIndex));
  };

  const applyTroll = () => {
    // Aquí iría la lógica para enviar estos cambios al estado global del juego
    // o a la base de datos para que afecten al frontend.
    // Por ahora, solo un mensaje de consola.
    console.log(`Aplicando troleo para ${gameToTroll}:`, {
      memoryCards,
      puzzleImageUrl,
      puzzleSize,
      quizQuestions,
    });
    alert(`¡Troleo aplicado para ${gameToTroll}! Espero que disfrutes el caos.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-100">Zona de Troleo de Juegos</h2>
      <p className="text-gray-300">
        ¿Aburrido de que los usuarios ganen? ¡Aquí puedes manipular los juegos a tu antojo!
        ¡Que empiece el caos!
      </p>

      <div className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600">
        <h3 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <Skull size={24} /> Selecciona el Juego a Trolear
        </h3>
        <select
          value={gameToTroll}
          onChange={(e) => setGameToTroll(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
        >
          <option value="memory">Juego de Memoria</option>
          <option value="puzzle">Rompecabezas</option>
          <option value="quiz">Quiz</option>
        </select>
      </div>

      {gameToTroll === 'memory' && (
        <div className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600 space-y-4">
          <h3 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
            <Shuffle size={24} /> Trolear Juego de Memoria
          </h3>
          <p className="text-gray-300">Cambia los símbolos de las cartas, añade o quita. ¡Hazlo imposible!</p>
          <div className="grid grid-cols-4 gap-3">
            {memoryCards.map((card, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  value={card}
                  onChange={(e) => handleMemoryCardChange(index, e.target.value)}
                  className="w-full aspect-square text-center text-3xl bg-gray-800 text-gray-100 rounded-md p-2 border border-gray-600"
                  maxLength="2"
                />
                <motion.button
                  onClick={() => removeMemoryCard(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            <motion.button
              onClick={addMemoryCard}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusCircle size={20} /> Añadir Carta
            </motion.button>
            <motion.button
              onClick={shuffleMemoryCards}
              className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-sky-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Shuffle size={20} /> Barajar
            </motion.button>
          </div>
        </div>
      )}

      {gameToTroll === 'puzzle' && (
        <div className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600 space-y-4">
          <h3 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
            <EyeOff size={24} /> Trolear Rompecabezas
          </h3>
          <p className="text-gray-300">Cambia la imagen o el tamaño del rompecabezas. ¡Que sea un desafío visual!</p>
          <div>
            <label htmlFor="puzzleImageUrl" className="block text-gray-300 text-sm font-medium mb-2">
              URL de la Imagen (ej. https://picsum.photos/300/300)
            </label>
            <input
              type="text"
              id="puzzleImageUrl"
              value={puzzleImageUrl}
              onChange={(e) => setPuzzleImageUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
              placeholder="Deja vacío para imagen aleatoria"
            />
          </div>
          <div>
            <label htmlFor="puzzleSize" className="block text-gray-300 text-sm font-medium mb-2">
              Tamaño del Rompecabezas (ej. 3 para 3x3)
            </label>
            <input
              type="number"
              id="puzzleSize"
              value={puzzleSize}
              onChange={(e) => setPuzzleSize(Math.max(2, Math.min(5, parseInt(e.target.value) || 3)))}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
              min="2"
              max="5"
            />
          </div>
          {puzzleImageUrl && (
            <div className="mt-4">
              <p className="text-gray-300">Vista previa:</p>
              <img src={puzzleImageUrl} alt="Puzzle Preview" className="w-48 h-48 object-cover rounded-md border border-gray-600" />
            </div>
          )}
        </div>
      )}

      {gameToTroll === 'quiz' && (
        <div className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600 space-y-4">
          <h3 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
            <Skull size={24} /> Trolear Quiz
          </h3>
          <p className="text-gray-300">Cambia las preguntas, las respuestas o haz que todas sean incorrectas. ¡Pura maldad!</p>
          {quizQuestions.map((q, qIndex) => (
            <div key={qIndex} className="bg-gray-800 p-4 rounded-lg border border-gray-600 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-gray-100">Pregunta {qIndex + 1}</h4>
                <motion.button
                  onClick={() => removeQuizQuestion(qIndex)}
                  className="bg-red-600 text-white rounded-full p-1"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Pregunta</label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuizQuestionChange(qIndex, 'question', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Opciones</label>
                {q.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    value={option}
                    onChange={(e) => handleQuizQuestionChange(qIndex, 'options', { index: oIndex, value: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 mb-2"
                    placeholder={`Opción ${oIndex + 1}`}
                  />
                ))}
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">Respuesta Correcta (0-3)</label>
                <input
                  type="number"
                  value={q.correct}
                  onChange={(e) => handleQuizQuestionChange(qIndex, 'correct', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600"
                  min="0"
                  max="3"
                />
              </div>
            </div>
          ))}
          <motion.button
            onClick={addQuizQuestion}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusCircle size={20} /> Añadir Pregunta
          </motion.button>
        </div>
      )}

      <motion.button
        onClick={applyTroll}
        className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        ¡Aplicar Troleo!
      </motion.button>
    </motion.div>
  );
};

export default AdminTroll;