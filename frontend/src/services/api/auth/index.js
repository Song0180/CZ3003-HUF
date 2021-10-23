import yelp from '../../yelp';

export const login = async (username, password) => {
  try {
    const response = await yelp.post('/login/', {
      username,
      password,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const register = async (email, username, password) => {
  try {
    const response = await yelp.post('/hufusers/', {
      email,
      username,
      password,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

// authenticate via facebook api token
export const facebookLogin = async (access_token) => {
  try {
    const response = await yelp.post('/rest-auth/fblogin/', {
      access_token,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

// calls API to verify authentication. If success, userinfo will be returned
export const facebookVerifyLoginAuth = async () => {
  try {
    const response = await yelp.get('/authenticateuser/', {});
    return response;
  } catch (err) {
    return err.message;
  }
};
