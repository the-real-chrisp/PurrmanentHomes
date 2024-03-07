const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Pet {
    _id: ID!
    name: String!
    pic: String
    species: String!
    color: String!
    age: String!
    gender: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    findUser(id: ID!): User
    getPets: [Pet!]!
    getPet(id: ID!): Pet
  }

  type Mutation {
    login(email: String!, password: String!):Auth
    addUser(username: String!, email: String!, password: String!):Auth
    removeUser(username: String!): User
    updateUser(id: ID!, username: String, email: String, password: String): User
    createPet(name: String!, species: String!, color: String!, age: String!, gender: String!): Pet
    updatePet(id: ID!, name: String, species: String, color: String, age: String, gender: String): Pet
    removePet(name: String!): Pet
  }
`;

module.exports = typeDefs;
