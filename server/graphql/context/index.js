const passport = require('passport');

// options == {email, password}
const authenticateUser = (options) => {
  return new Promise((resolve, reject) => {
    console.log('Calling authenticateUser');

    const done = (error, user) => {
      // Here we will get user if user is authenticated
      // If we will get user we can save session to DB

      if (error) {
        return reject(new Error(error));
      }

      if (user) {
        return resolve(user);
      } else {
        return reject(new Error('Invalid password or email!'));
      }
    };

    const authFn = passport.authenticate('graphql', options, done);
    authFn();
  });
};

exports.buildAuthContext = () => {
  const auth = {
    authenticate: (options) => authenticateUser(options),
  };

  return auth;
};
