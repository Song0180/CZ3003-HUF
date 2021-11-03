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
    console.log(result);
    const dummyLB = [
      {
        username: 'haha',
        score: 20,
      },
      {
        username: 'haha2',
        score: 10,
      },
      {
        username: 'haha3',
        score: 5,
      },
      {
        username: 'haha4',
        score: 2,
      },
      {
        username: 'haha5',
        score: 1,
      },
    ];
    set({ currentQuizLeaderBoardData: dummyLB });
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
    set({ isLoading: false });
    if (typeof result === 'string') {
      return result;
    } else if (result.status === 201) {
      return result.data;
    }
  },
}));
