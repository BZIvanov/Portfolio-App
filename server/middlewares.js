const session = require('express-session');

exports.init = (server, db) => {
  const sess = {
    name: 'portfolio-session',
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    store: db.initSessionStore(),
  };

  server.use(session(sess));
};
