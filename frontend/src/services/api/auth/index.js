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

export const facebookLogin = async (username, password) => {
  try {
    // const response = await yelp.post('/login/', {
    //   username,
    //   password,
    // });
    // console.log(response);
    // return response;
  } catch (err) {
    return err.message;
  }
};

// facebookLogin = event => {
//   console.log(JSON.stringify(this.loginState.credentials))
//   fetch('https://cz3003-huf.herokuapp.com/accounts/facebook/login/', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(this.loginState.credentials)
//   })
//     .then(response => response.json())
//     .then(
//       data => {
//         console.log("This is the response :", data);
//       })
//     .catch(error => console.error(error))
// }
