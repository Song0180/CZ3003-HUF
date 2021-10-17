import create from 'zustand';

import { mockQuizzes } from './mockData';
import { fetchGames, fetchQuizzes } from '../../api/game';

const initialState = {
  isLoading: false,
  games: [],
  currentGameQuizzes: [],
  currentQuizQuetsions: [],
};

export const useGameStore = create((set, get) => ({
  ...initialState,
  fetchGames: async () => {
    set({ isLoading: true });
    const result = await fetchGames();
    if (typeof result === 'string') {
      return result;
    } else {
      const games = result.data;
      set({ games: games });
    }
    set({ isLoading: false });
  },
  fetchGameQuiz: async (gameId) => {
    set({ isLoading: true });
    const result = await fetchQuizzes(gameId);
    if (typeof result === 'string') {
      return result;
    } else {
      const quizzes = result.data;
      set({ currentGameQuizzes: quizzes });
    }
    set({ isLoading: false, currentQuizQuetsions: mockQuizzes });
  },
}));
