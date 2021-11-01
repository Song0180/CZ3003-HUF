import create from 'zustand';

import {
  fetchGames,
  fetchQuizzes,
  createGame,
  fetchQuizQuestions,
  fetchQuizResult,
  fetchQuizLeaderBoard,
} from '../../api/game';

const initialState = {
  isLoading: false,
  games: [],
  currentGameQuizzes: [],
  quizQuestions: [],
  currentQuizLeaderBoardData: [],
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
      const quizzes = result.data;
      // const dummyQuizzes = [
      //   {
      //     quiz_id: 'asdasd',
      //     game_id: '1231asd',
      //     quiz_duration: 10,
      //     quiz_max_score: 100,
      //     quiz_description: 'a quiz',
      //     no_of_qn: 2,
      //   },
      // ];
      set({ currentGameQuizzes: quizzes });
    }
    set({ isLoading: false });
  },

  fetchQuizQuestions: async (quizId) => {
    set({ isLoading: true });
    const result = await fetchQuizQuestions(quizId);
    if (typeof result === 'string') {
      set({ isLoading: false });
      return result;
    } else {
      const questions = result.data;
      console.log(questions);
      set({ quizQuestions: questions });
    }
    set({ isLoading: false });
  },

  fetchQuizResult: async (quizId) => {
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

  fetchQuizLeaderBoard: async (quizId) => {
    set({ isLoading: true });
    const result = await fetchQuizLeaderBoard(quizId);
    if (typeof result === 'string') {
      set({ isLoading: false });
      return result;
    } else {
      set({
        currentQuizLeaderBoardData: result.data ? result.data.topfive : [],
        isLoading: false,
      });
    }
  },

  createNewGame: async (gameData) => {
    set({ isLoading: true });
    const {
      username,
      game_name,
      game_tag,
      no_of_quiz,
      game_description,
      no_of_qn_per_quiz: total_no_qn,
    } = gameData;

    const result = await createGame(
      username,
      game_name,
      game_tag,
      no_of_quiz,
      game_description,
      total_no_qn
    );
    set({ isLoading: false });
    if (typeof result === 'string') {
      return result;
    } else if (result.status === 201) {
      return result.data;
    }
  },
}));
