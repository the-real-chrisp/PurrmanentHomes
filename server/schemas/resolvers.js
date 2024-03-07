const { User, Pet } = require('../models');
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
      const userData = await User.findOne({ _id: args.id })
      return userData;
    },
    getPet: async (parent, args, context) => {
      const pet = await Pet.findOne({ _id: args.id })
      return pet;
    },
    getPets: async (parent, args, context) => {
      const pets = await Pet.find()
      return pets
    },
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
        const user = await User.create({ username: args.username, email: args.email, password: args.password });
        console.log(user);
        if (!user) {
          throw AuthenticationError;
        }
        const token = signToken(user);
        return { user, token };
      },

      removeUser: async (parent, args) => {
        return User.findOneAndDelete({ username: args.username })
      },

      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, {
            new: true,
          });
        }
  
        throw AuthenticationError;
      },

      createPet: async (_, { name, species, color, age, gender }) => {
        try {
          const newPet = new Pet({
            name,
            species,
            color,
            age,
            gender,
          });
          const savedPet = await newPet.save();
          return savedPet;
        } catch (error) {
          throw new Error('Failed to create pet');
        }

      },
      updatePet: async (_, { id, ...args }, context) => {
        if (context.user) {
          try {
            const updatedPet = await Pet.findByIdAndUpdate(id, args, { new: true });
            return updatedPet;
          } catch (error) {
            throw new Error('Failed to update pet');
          }
        } else {
          throw new AuthenticationError('Not authenticated');
        }
      },
      removePet: async (parent, args) => {
        return Pet.findOneAndDelete({ name: args.name })
      },
    }
  };

module.exports = resolvers;
