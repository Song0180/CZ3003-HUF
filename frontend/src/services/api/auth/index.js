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
    // const response = await yelp.post('/rest-auth/fblogin/', {
    //   access_token,
    // });
    const response = await fetch(
      'https://cz3003-huf.herokuapp.com/rest-auth/fblogin/',
      {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'Authorization',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          access_token,
        }),
      }
    );
    return response;
  } catch (err) {
    return err.message;
  }
};

// calls API to verify authentication. If success, userinfo will be returned
export const facebookVerifyLoginAuth = async () => {
  try {
    const response = await fetch(
      'https://cz3003-huf.herokuapp.com/authenticateuser/',
      {
        mode: 'no-cors',
        credentials: 'include',
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'Authorization',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
      }
    );

    return response;
  } catch (err) {
    return err.message;
  }
};
