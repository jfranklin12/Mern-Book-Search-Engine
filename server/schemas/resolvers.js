const { AuthenticationError } = require('apollo-server-express')
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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthentiacationError('No user found with this email address')
      }

      const correctPw = await user.isCorrectPassword(password);
      
      if(!correctPw) {
        throw new AuthenticationError('Incorrect password!')
      }

      const token = signToken(user);
      return { token, user };
      },
    
      saveBook: async (parent, { bookData }, context) => {

        if(context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: { bookData } } },
            { new: true }
          );
        }
        throw new AuthenticationError('Please log in!');
      },
    
      removeBook: async(parent, { bookData }, context) => {
        if(context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookData } } },
          { new: true }
        );
      }
      throw new AuthenticationError('Please log in!');
    },
    },
};

module.exports = resolvers;
