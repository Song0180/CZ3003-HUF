import yelp from '../../yelp';

export const fetchGames = async () => {
  try {
    const response = await yelp.get('/hufgames', {});
    return response;
  } catch (err) {
    return err.message;
  }
};

export const fetchQuizzes = async (gameId) => {
  try {
    const response = await yelp.get('/hufquiz', {});
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
    console.log(response);
    return response;
  } catch (err) {
    return err.message;
  }
};
