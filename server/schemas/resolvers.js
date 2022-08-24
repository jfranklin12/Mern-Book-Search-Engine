const { User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async () => {
      return User.find({});
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }, context) => {
      const user = await User.finOne({ email });
      if (!user) {
        throw new AuthentiacationError('No user found with this email address')
      }
      if(context.user) {

      const matchup = await Matchup.create(args);
      return matchup;
      }
      // you still need to import appolo
      throw new AuthenticationError('There was problem with login');
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;
