import create from 'zustand';

import {
  fetchGames,
  fetchQuizzes,
  createGame,
  fetchQuizOptions,
  fetchQuizQuestions,
  fetchQuizResult,
} from '../../api/game';

const initialState = {
  isLoading: false,
  games: [],
  currentGameQuizzes: [],
  quizQuestions: [],
};

export const useGameStore = create((set, get) => ({
  ...initialState,

  fetchGames: async () => {
    set({ isLoading: true });
    const result = await fetchGames();
    if (typeof result === 'string') {
      set({ isLoading: false });
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
      set({ isLoading: false });
      return result;
    } else {
      // const quizzes = result.data;
      const dummyQuizzes = [
        {
          quiz_id: 'asdasd',
          game_id: '1231asd',
          quiz_duration: 10,
          quiz_max_score: 100,
          quiz_description: 'a quiz',
          no_of_qn: 2,
        },
      ];
      set({ currentGameQuizzes: dummyQuizzes });
    }
    set({ isLoading: false });
  },

  fetchQuizQuestions: async (gameId, quizId) => {
    set({ isLoading: true });
    const result = await fetchQuizQuestions(quizId);
    if (typeof result === 'string') {
      return result;
    } else {
      const questions = result.data;
      console.log(questions);
      set({ quizQuestions: questions });
    }
    set({ isLoading: false });
  },

  fetchQuizOptions: async (gameId, quizId) => {
    set({ isLoading: true });
    const result = await fetchQuizOptions(quizId);
    if (typeof result === 'string') {
      return result;
    } else {
      const options = result.data;
      console.log(options);
      set({ quizOptions: options });
    }
    set({ isLoading: false });
  },

  fetchQuizResult: async (gameId, quizId) => {
    set({ isLoading: true });
    const result = await fetchQuizResult(quizId);
    if (typeof result === 'string') {
      return result;
    } else {
      const quizresults = result.data;
      set({ quizResults: quizresults });
    }
    set({ isLoading: false });
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
