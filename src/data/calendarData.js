export const calendarData = {
  rewards: {
    1: { type: 'text', content: '¡Bienvenido al calendario mágico! 🎉', unlocked: false },
    2: { type: 'image', content: '🌟 Estrella de la suerte', unlocked: false },
    3: { type: 'text', content: 'Consejo del día: Sonríe más seguido 😊', unlocked: false },
    4: { type: 'image', content: '🎈 Globo de la felicidad', unlocked: false },
    5: { type: 'text', content: 'Dato curioso: Los delfines tienen nombres', unlocked: false },
    6: { type: 'image', content: '🌈 Arcoíris de esperanza', unlocked: false },
    7: { type: 'text', content: 'Reflexión: Cada día es una nueva oportunidad', unlocked: false },
    8: { type: 'image', content: '🦋 Mariposa de transformación', unlocked: false },
    9: { type: 'text', content: 'Motivación: Tú puedes lograr todo lo que te propongas', unlocked: false },
    10: { type: 'game', game: 'memory', content: '🎮 Juego de Memoria - ¡Encuentra las parejas!', unlocked: false },
    11: { type: 'image', content: '🌺 Flor de la perseverancia', unlocked: false },
    12: { type: 'text', content: 'Tip: Bebe más agua hoy💧', unlocked: false },
    13: { type: 'image', content: '🍀 Trébol de la buena suerte', unlocked: false },
    14: { type: 'text', content: 'Amor propio: Eres increíble tal como eres ❤️', unlocked: false },
    15: { type: 'game', game: 'puzzle', content: '🧩 Rompecabezas Deslizante', unlocked: false },
    16: { type: 'image', content: '🌙 Luna llena de sueños', unlocked: false },
    17: { type: 'text', content: 'Gratitud: Agradece por las pequeñas cosas', unlocked: false },
    18: { type: 'image', content: '🎨 Paleta de creatividad', unlocked: false },
    19: { type: 'text', content: 'Energía: Haz algo que te haga feliz hoy', unlocked: false },
    20: { type: 'game', game: 'quiz', content: '🧠 Quiz de Conocimiento General', unlocked: false },
    21: { type: 'image', content: '🏆 Trofeo del esfuerzo', unlocked: false },
    22: { type: 'text', content: 'Mindfulness: Respira profundo y relájate', unlocked: false },
    23: { type: 'image', content: '🎪 Circo de la diversión', unlocked: false },
    24: { type: 'text', content: 'Aventura: Sal de tu zona de confort', unlocked: false },
    25: { type: 'game', game: 'memory', content: '🎯 Desafío de Memoria Avanzado', unlocked: false },
    26: { type: 'image', content: '🚀 Cohete hacia tus metas', unlocked: false },
    27: { type: 'text', content: 'Sabiduría: Aprende algo nuevo cada día', unlocked: false },
    28: { type: 'image', content: '🎭 Máscara de la alegría', unlocked: false },
    29: { type: 'text', content: 'Conexión: Llama a alguien que extrañes', unlocked: false },
    30: { type: 'game', game: 'puzzle', content: '🎲 Desafío Final de Rompecabezas', unlocked: false },
    31: { type: 'special', content: '🎊 ¡GRAN FINAL! Desafío Supremo', unlocked: false }
  },
  
  specialDays: [10, 15, 20, 25, 30, 31],
  
  games: {
    memory: {
      name: 'Juego de Memoria',
      description: 'Encuentra todas las parejas de cartas',
      cards: ['🎈', '🌟', '🦋', '🌈', '🎨', '🎪', '🚀', '🎭']
    },
    puzzle: {
      name: 'Rompecabezas Deslizante',
      description: 'Ordena los números del 1 al 8',
      size: 3,
      imageUrl: null
    },
    quiz: {
      name: 'Quiz de Conocimiento',
      description: 'Responde correctamente las 3 preguntas',
      questions: [
        {
          question: '¿Cuál es el planeta más grande del sistema solar?',
          options: ['Tierra', 'Júpiter', 'Saturno', 'Neptuno'],
          correct: 1
        },
        {
          question: '¿En qué año llegó el hombre a la Luna?',
          options: ['1967', '1968', '1969', '1970'],
          correct: 2
        },
        {
          question: '¿Cuál es el océano más grande del mundo?',
          options: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'],
          correct: 3
        }
      ]
    }
  }
};

export const finalChallenges = [
  {
    id: 1,
    title: 'Desafío de Memoria Suprema',
    type: 'memory',
    description: 'Encuentra 12 parejas en tiempo récord',
    completed: false,
    cards: ['🎈', '🌟', '🦋', '🌈', '🎨', '🎪', '🚀', '🎭', '🌺', '🍀', '🌙', '🏆']
  },
  {
    id: 2,
    title: 'Rompecabezas Maestro',
    type: 'puzzle',
    description: 'Resuelve el rompecabezas 4x4',
    completed: false,
    size: 4,
    imageUrl: null
  },
  {
    id: 3,
    title: 'Quiz del Conocimiento Infinito',
    type: 'quiz',
    description: 'Responde 5 preguntas sin fallar',
    completed: false,
    questions: [
      {
        question: '¿Cuál es la velocidad de la luz?',
        options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
        correct: 0
      },
      {
        question: '¿Quién escribió "Cien años de soledad"?',
        options: ['Borges', 'Cortázar', 'García Márquez', 'Vargas Llosa'],
        correct: 2
      },
      {
        question: '¿Cuál es el elemento químico más abundante en el universo?',
        options: ['Oxígeno', 'Hidrógeno', 'Carbono', 'Helio'],
        correct: 1
      },
      {
        question: '¿En qué continente se encuentra el desierto de Gobi?',
        options: ['África', 'América', 'Asia', 'Australia'],
        correct: 2
      },
      {
        question: '¿Cuántos huesos tiene el cuerpo humano adulto?',
        options: ['206', '215', '198', '223'],
        correct: 0
      }
    ]
  }
];