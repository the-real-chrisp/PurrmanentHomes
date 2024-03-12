import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`
export const REMOVE_USER = gql`
    mutation removeUser($username: String!) {
        removeUser(username: $username) {
            _id
        }
    }
`
export const UPDATE_USER = gql`
    mutation updateUser($username: String!, $email: String!, $password: String!) {
        updateUser(username: $username, email: $email, password: $password) {
            _id
        }
    }
`
export const ADD_PET = gql`
    mutation createPet($name: String!, $species: String!, $color: String!, $age: String!, $gender: String!) {
        createPet(name: $name, species: $species, color: $color, age: $age, gender: $gender) {
            _id
        }
    }
`
export const REMOVE_PET = gql` 
    mutation removePet($id: ID!) {
        removePet(id: $id) {
            _id
        }
    }
`
export const UPDATE_PET = gql`
    mutation updatePet($id: ID!, $name: String!, $pic: String!, $species: String!, $color: String!, $age: String!, $gender: String!) {
        updatePet(id: $id, name: $name, pic: $pic, species: $species, color: $color, age: $age, gender: $gender) {
            _id
        } 
    }
`

