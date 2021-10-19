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

export const postGamesCreation = async (params) => {
  try {
    const response = await yelp.post("/hufgames/", {
      username: params.username,
      game_name: params.game,
      game_tag: params.game_tag,
      game_description: params.game_description,
      no_of_quiz: params.no_of_quiz,
      total_no_qn: params.total_no_qn,
    });
    if (response.status === 200){
      console.log("Login successfull");
      console.log("data", response);
    }
    else{
      console.log("Unsuccessful");
    }
  } catch (err) {
    return err.message;
  }
};
