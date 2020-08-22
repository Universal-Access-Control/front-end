import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
  query {
    me {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation($firstName: String, $lastName: String) {
    updateMe(user: { firstName: $firstName, lastName: $lastName }) {
      firstName
      lastName
      _id
      email
    }
  }
`;
