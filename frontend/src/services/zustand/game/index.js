import create from 'zustand';

import { mockQuizzes } from './mockData';
import {
  fetchGames,
  fetchQuizzes,
  createGame,
  fetchQuizLeaderBoard,
  createQuiz,
  createQn,
  createOptions
} from '../../api/game';

const initialState = {
  isLoading: false,
  games: [],
  currentGameQuizzes: [],
  currentQuizQuetsions: [],
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
    set({ currentQuizQuetsions: mockQuizzes });
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
    console.log(result);
    set({ isLoading: false });
    if (typeof result === 'string') {
      return result;
    } else if (result.status === 201) {
      return result.data;
    }
  },

  createNewQuiz: async (quizData) => {
    set ({ isLoading: true});
    const {
      quiz_id,
      game_id,
      quiz_duration,
      quiz_max_score,
      quiz_description,
      no_of_qn,
    } = quizData;

    const result = await createQuiz(
      quiz_id,
      game_id,
      quiz_duration,
      quiz_max_score,
      quiz_description,
      no_of_qn,
    );
    console.log(result);
    set ({ isLoading: false });
    if (typeof result == 'string'){
      return result;
    } else if (result.status === 201){
      return result.data;
    }
  },

  createNewQn: async (qnData) => {
    set ({ isLoading: true});
    const {
      quiz_qn_id,
      quiz_id,
      correct_ans,
      question_name,
      score_per_qn,
    } = qnData;

    const result = await createQn(
      quiz_qn_id,
      quiz_id,
      correct_ans,
      question_name,
      score_per_qn,
    );
    console.log(result);
    set ({ isLoading: false });
    if (typeof result == 'string'){
      return result;
    } else if (result.status === 201){
      return result.data;
    }
  },

  createNewOptions: async (optionsData) => {
    set ({ isLoading: true});
    const {
      quiz_qn_id,
      option_id,
      option_description,
    } = optionsData;

    const result = await createOptions(
      quiz_qn_id,
      option_id,
      option_description,
    );
    console.log(result);
    set ({ isLoading: false });
    if (typeof result == 'string'){
      return result;
    } else if (result.status === 201){
      return result.data;
    }
  },

}));
