import create from 'zustand';

import { mockQuizzes } from './mockData';
import { fetchGames, fetchQuizzes, postGamesCreation} from '../../api/game';


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
    if (typeof result === "string") {
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
    if (typeof result === "string") {
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

  postGamesCreation: async() => {
    const data = get({
      username: "hufadmin",
      game_name: "",
      no_of_quiz: "",
      total_no_qn: "",
      game_tag: "",
      game_description: "",
    });
    postGamesCreation(data);
  }
}));
