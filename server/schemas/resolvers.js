const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw AuthenticationError;
    },
    users: async (parent, args, context) => {
      const users = await User.find()
      return users
    },
    findUser: async (parent, args, context) => {
        const userData = await User.findOne({_id: args.id})
        return userData;
    }
  },
  Mutation: {
    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { user, token };
    },

    addUser: async (parent, args) => {
      const user = await User.create({username: args.username, email: args.email, password: args.password});
      console.log(user);
      if (!user) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { user, token };
    },
  
  },
};

module.exports = resolvers;
