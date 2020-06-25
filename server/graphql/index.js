const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const {
  portfolioQueries,
  portfolioMutations,
  userMutations,
  userQueries,
} = require('./resolvers');
const { portfolioTypes, userTypes } = require('./types');
const { buildAuthContext } = require('./context');
const Portfolio = require('./models/portfolio');
const User = require('./models/user');

exports.createApolloServer = () => {
  const typeDefs = gql(`
    ${portfolioTypes}

    ${userTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
      user: User
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: Boolean
    }`);

  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio')),
        User: new User(mongoose.model('User')),
      },
    }),
  });

  return apolloServer;
};
