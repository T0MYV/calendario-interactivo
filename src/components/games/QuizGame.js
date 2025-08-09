import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const QuizGame = ({ onWin, onLose, isActive, questions = [] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, currentQuestion]);

  useEffect(() => {
    setTimeLeft(30); // Reset timer for each question
  }, [currentQuestion]);

  const handleTimeUp = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null || !isActive) return;
    
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setCorrectAnswers(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        finishQuiz();
      }
    }, 1500);
  };

  const finishQuiz = () => {
    setShowResult(true);
    if (correctAnswers >= Math.ceil(questions.length * 0.6)) { // 60% to pass
      onWin();
    } else {
      onLose();
    }
  };

  const getAnswerColor = (answerIndex) => {
    if (selectedAnswer === null) {
      return 'from-gray-700 to-gray-600 text-gray-100 hover:from-gray-600 hover:to-gray-500';
    }
    
    if (answerIndex === questions[currentQuestion].correct) {
      return 'from-emerald-400 to-emerald-500 text-white';
    }
    
    if (answerIndex === selectedAnswer) {
      return 'from-red-400 to-red-500 text-white';
    }
    
    return 'from-gray-600 to-gray-500 text-gray-300';
  };

  if (showResult) {
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${
          passed ? 'bg-emerald-700' : 'bg-red-700'
        }`}>
          {passed ? (
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          ) : (
            <XCircle className="w-12 h-12 text-red-400" />
          )}
        </div>
        
        <div>
          <h3 className={`text-3xl font-bold mb-2 ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
            {passed ? '¡Excelente!' : '¡Inténtalo de nuevo!'}
          </h3>
          <p className="text-gray-300 text-lg">
            Respondiste correctamente {correctAnswers} de {questions.length} preguntas
          </p>
          <p className="text-2xl font-bold text-gray-100 mt-2">
            {percentage}%
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress and Timer */}
      <div className="flex justify-between items-center bg-gray-700 rounded-2xl p-4">
        <div className="text-center">
          <p className="text-sm text-gray-300">Pregunta</p>
          <p className="text-2xl font-bold text-sky-400">
            {currentQuestion + 1}/{questions.length}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300">Tiempo</p>
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-400' : 'text-emerald-400'}`} />
            <p className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-emerald-400'}`}>
              {timeLeft}s
            </p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300">Correctas</p>
          <p className="text-2xl font-bold text-amber-400">{correctAnswers}</p>
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-gray-100 mb-6 text-center">
          {questions[currentQuestion]?.question}
        </h3>

        <div className="space-y-3">
          {questions[currentQuestion]?.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${getAnswerColor(index)}`}
              whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
              whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              disabled={selectedAnswer !== null}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Instructions */}
      <div className="text-center text-gray-300">
        <p>Responde correctamente al menos el 60% de las preguntas para ganar</p>
      </div>
    </div>
  );
};

export default QuizGame;