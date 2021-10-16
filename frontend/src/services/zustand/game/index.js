import create from 'zustand';

import { mockGames, mockQuizzes } from './mockData';

const initialState = {
  isLoading: false,
  games: [],
  currentQuizQuetsions: [],
};

export const useGameStore = create((set, get) => ({
  ...initialState,
  fetchGames: async () => {
    set({ isLoading: true });
    set({ isLoading: false, games: mockGames });
  },
  fetchGameQuiz: async (gameId) => {
    set({ isLoading: true });
    set({ isLoading: false, currentQuizQuetsions: mockQuizzes });
  },
}));
