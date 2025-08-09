import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PuzzleGame = ({ onWin, onLose, isActive, size = 3, imageUrl = null }) => {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  // Imágenes de prueba si no se proporciona una URL
  const defaultImages = [
    'https://picsum.photos/id/237/300/300', // Perro
    'https://picsum.photos/id/1084/300/300', // Montañas
    'https://picsum.photos/id/1069/300/300', // Bosque
    'https://picsum.photos/id/1025/300/300', // Gato
  ];
  const currentImageUrl = imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)];

  useEffect(() => {
    initializeGame();
  }, [size, currentImageUrl]); // Reiniciar juego si cambia la imagen

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
    if (tiles.length > 0 && checkWin()) {
      onWin();
    }
  }, [tiles]);

  const initializeGame = () => {
    const totalTiles = size * size;
    const initialTiles = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);
    initialTiles.push(null); // Empty space
    
    // Shuffle the tiles
    const shuffledTiles = [...initialTiles];
    for (let i = 0; i < 1000; i++) {
      const emptyIndex = shuffledTiles.indexOf(null);
      const possibleMoves = getPossibleMoves(emptyIndex, size);
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [shuffledTiles[emptyIndex], shuffledTiles[randomMove]] = [shuffledTiles[randomMove], shuffledTiles[emptyIndex]];
    }
    
    setTiles(shuffledTiles);
    setMoves(0);
    setTimeLeft(120);
  };

  const getPossibleMoves = (emptyIndex, gridSize) => {
    const moves = [];
    const row = Math.floor(emptyIndex / gridSize);
    const col = emptyIndex % gridSize;

    if (row > 0) moves.push(emptyIndex - gridSize); // Up
    if (row < gridSize - 1) moves.push(emptyIndex + gridSize); // Down
    if (col > 0) moves.push(emptyIndex - 1); // Left
    if (col < gridSize - 1) moves.push(emptyIndex + 1); // Right

    return moves;
  };

  const handleTileClick = (index) => {
    if (!isActive) return;

    const emptyIndex = tiles.indexOf(null);
    const possibleMoves = getPossibleMoves(emptyIndex, size);

    if (possibleMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves(prev => prev + 1);
    }
  };

  const checkWin = () => {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] !== i + 1) return false;
    }
    return tiles[tiles.length - 1] === null;
  };

  const getTileStyle = (tileNumber, index) => {
    if (tileNumber === null) return {};

    const totalSize = size * size;
    const tileWidth = 100 / size; // Percentage width of each tile
    const originalX = ((tileNumber - 1) % size) * tileWidth;
    const originalY = Math.floor((tileNumber - 1) / size) * tileWidth;

    return {
      backgroundImage: `url(${currentImageUrl})`,
      backgroundSize: `${size * 100}% ${size * 100}%`,
      backgroundPosition: `${originalX}% ${originalY}%`,
      width: `${tileWidth}%`,
      height: `${tileWidth}%`,
      position: 'absolute',
      left: `${(index % size) * tileWidth}%`,
      top: `${Math.floor(index / size) * tileWidth}%`,
    };
  };

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="flex justify-between items-center bg-gray-700 rounded-2xl p-4">
        <div className="text-center">
          <p className="text-sm text-gray-300">Movimientos</p>
          <p className="text-2xl font-bold text-sky-400">{moves}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300">Tiempo</p>
          <p className={`text-2xl font-bold ${timeLeft <= 20 ? 'text-red-400' : 'text-emerald-400'}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300">Objetivo</p>
          <p className="text-lg font-bold text-amber-400">1-{size * size - 1}</p>
        </div>
      </div>

      {/* Puzzle Grid */}
      <div 
        className="relative mx-auto max-w-md aspect-square border-2 border-gray-600 rounded-xl overflow-hidden"
        style={{ width: '100%', paddingBottom: '100%' }} // Para mantener el aspecto cuadrado
      >
        {tiles.map((tile, index) => (
          <motion.div
            key={tile === null ? 'empty' : tile}
            className={`rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer shadow-lg absolute transition-all duration-200 ease-in-out ${
              tile === null 
                ? 'bg-gray-600' 
                : 'text-white'
            }`}
            style={{
              ...getTileStyle(tile, index),
              width: `${100 / size}%`,
              height: `${100 / size}%`,
            }}
            whileHover={tile !== null ? { scale: 1.02 } : {}}
            whileTap={tile !== null ? { scale: 0.98 } : {}}
            onClick={() => handleTileClick(index)}
            layout
          >
            {tile !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-3xl font-bold">
                {tile}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-300">
        <p>Ordena los números del 1 al {size * size - 1} para formar la imagen</p>
      </div>
    </div>
  );
};

export default PuzzleGame;