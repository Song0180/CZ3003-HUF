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
