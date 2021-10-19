import create from 'zustand';

import { mockQuizzes } from './mockData';
import { fetchGames, fetchQuizzes, createGame } from '../../api/game';

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
    set({ isLoading: false });
  },

  fetchQuizQuestions: async (gameId, quizId) => {
    set({ currentQuizQuetsions: mockQuizzes });
  },

  createNewGame: async (gameData) => {
    set({ isLoading: true });
    const {
      username,
      game_name,
      game_tag,
      no_of_quiz,
      game_description,
      total_no_qn,
    } = gameData;

    const result = await createGame(
      username,
      game_name,
      game_tag,
      no_of_quiz,
      game_description,
      total_no_qn
    );
    console.log(result);
    set({ isLoading: false });
    if (typeof result === 'string') {
      return result;
    } else if (result.status === 201) {
      return result.data;
    }
  },
}));
