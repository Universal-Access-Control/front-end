import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GET_USER = gql`
  query {
    me {
      _id
      email
      firstName
      lastName
    }
  }
`;
