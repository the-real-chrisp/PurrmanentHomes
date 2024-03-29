import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query findUser($id: ID!) {
        findUser(id: $id) {
            _id
            username
            email
            password
        }
    }
`

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
            password
        }
    }
`

export const GET_PET = gql`
    query getPet($id: ID!) {
        getPet(id: $id) {
            _id
            name
            species
            color
            age
            gender
        }
    }
`

export const GET_PETS = gql`
    query getPets {
        getPets {
            _id
            name
            species
            color
            age
            gender
        }
    }
`
