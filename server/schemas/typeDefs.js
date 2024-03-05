const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Pet {
    _id: ID!
    name: String!
    pic: String!
    species: String!
    color: String!
    age: Int!
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
    createPet(name: String!, pic: String!, species: String!, color: String!, age: Int!, gender: String!): Pet!
  }
`;

module.exports = typeDefs;
