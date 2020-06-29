const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const {
  mixedQueries,
  portfolioQueries,
  portfolioMutations,
  userMutations,
  userQueries,
  forumQueries,
  forumMutations,
} = require('./resolvers');
const { portfolioTypes, userTypes, forumTypes } = require('./types');
const { buildAuthContext } = require('./context');
const Portfolio = require('./models/portfolio');
const User = require('./models/user');
const ForumCategory = require('./models/forumCategory');
const Topic = require('./models/topic');
const Post = require('./models/post');

exports.createApolloServer = () => {
  const typeDefs = gql(`
    ${portfolioTypes}

    ${userTypes}

    ${forumTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
      userPortfolios: [Portfolio]
      user: User
      forumCategories: [ForumCategory]
      topicsByCategory(category: String): [Topic]
      topicBySlug(slug: String): Topic
      postsByTopic(slug: String, pageNum: Int, pageSize: Int): PagPosts
      highlight(limit: Int): HighlightRes
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      createTopic(input: TopicInput): Topic

      createPost(input: PostInput): Post

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: Boolean
    }`);

  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries,
      ...forumQueries,
      ...mixedQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
      ...forumMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio'), req.user),
        User: new User(mongoose.model('User')),
        ForumCategory: new ForumCategory(mongoose.model('ForumCategory')),
        Topic: new Topic(mongoose.model('Topic'), req.user),
        Post: new Post(mongoose.model('Post'), req.user),
      },
    }),
  });

  return apolloServer;
};
