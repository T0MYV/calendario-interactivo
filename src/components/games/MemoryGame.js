import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MemoryGame = ({ onWin, onLose, isActive, cards = [] }) => {
  const [gameCards, setGameCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    initializeGame();
  }, [cards]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onLose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onLose]);

  useEffect(() => {
    if (matchedCards.length === gameCards.length && gameCards.length > 0) {
      onWin();
    }
  }, [matchedCards, gameCards, onWin]);

  const initializeGame = () => {
    const duplicatedCards = [...cards, ...cards];
    const shuffledCards = duplicatedCards
      .map((card, index) => ({ id: index, symbol: card, isFlipped: false }))
      .sort(() => Math.random() - 0.5);
    
    setGameCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimeLeft(60);
  };

  const handleCardClick = (cardId) => {
    if (!isActive || flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId) || matchedCards.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCard, secondCard] = newFlippedCards.map(id => 
        gameCards.find(card => card.id === id)
      );

      if (firstCard.symbol === secondCard.symbol) {
        setMatchedCards(prev => [...prev, ...newFlippedCards]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (cardId) => {
    return flippedCards.includes(cardId) || matchedCards.includes(cardId);
  };

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="flex justify-between items-center bg-gray-100 rounded-2xl p-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Movimientos</p>
          <p className="text-2xl font-bold text-blue-600">{moves}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Tiempo</p>
          <p className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-green-600'}`}>
            {timeLeft}s
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Parejas</p>
          <p className="text-2xl font-bold text-purple-600">
            {matchedCards.length / 2}/{cards.length}
          </p>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-3">
        {gameCards.map((card) => (
          <motion.div
            key={card.id}
            className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl cursor-pointer shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(card.id)}
          >
            <motion.div
              className="w-full h-full rounded-xl flex items-center justify-center text-3xl font-bold"
              animate={{ 
                rotateY: isCardFlipped(card.id) ? 180 : 0,
                backgroundColor: isCardFlipped(card.id) ? '#ffffff' : 'transparent'
              }}
              transition={{ duration: 0.3 }}
              style={{
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            >
              {isCardFlipped(card.id) ? (
                <span style={{ transform: 'rotateY(180deg)' }}>
                  {card.symbol}
                </span>
              ) : (
                <span className="text-white">?</span>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-600">
        <p>Encuentra todas las parejas antes de que se acabe el tiempo</p>
      </div>
    </div>
  );
};

export default MemoryGame;