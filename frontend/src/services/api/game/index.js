import yelp from '../../yelp';

export const fetchGames = async () => {
  try {
    const response = await yelp.get('/hufgames', {});
    return response;
  } catch (err) {
    return err.message;
  }
};

export const fetchQuizzes = async (game_id) => {
  try {
    const response = await yelp.get('/hufquiz', { params: { game_id } });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const createGame = async (
  username,
  game_name,
  game_tag,
  no_of_quiz,
  game_description,
  total_no_qn
) => {
  try {
    const response = await yelp.post('/hufgames/', {
      username,
      game_name,
      game_tag,
      no_of_quiz,
      game_description,
      total_no_qn,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const fetchQuizLeaderBoard = async (quiz_id) => {
  try {
    const response = await yelp.get('/hufquizresult/', { params: { quiz_id } });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const createQuiz = async (
      quiz_id,
      game_id,
      quiz_duration,
      quiz_max_score,
      quiz_description,
      no_of_qn,
) => {
  try {
    const response = await yelp.post('/hufquiz/', {
      quiz_id,
      game_id,
      quiz_duration,
      quiz_max_score,
      quiz_description,
      no_of_qn,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const createQn = async (
      quiz_qn_id,
      quiz_id,
      correct_ans,
      question_name,
      score_per_qn,
) => {
  try {
    const response = await yelp.post('/hufquizqn/', {
      quiz_qn_id,
      quiz_id,
      correct_ans,
      question_name,
      score_per_qn,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const createOptions = async (
      quiz_qn_id,
      option_id,
      option_description,
) => {
  try {
    const response = await yelp.post('/hufquizoptions/', {
      quiz_qn_id,
      option_id,
      option_description,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};


