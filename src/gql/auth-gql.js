// Apollo
import { gql } from '@apollo/client';

// ==================================
export const CheckAuthQuery = gql`
  query {
    checkAuth
  }
`;

export const LoginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(user: { email: $email, password: $password }) {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const RegisterMutation = gql`
  mutation($email: String!, $password: String!) {
    register(user: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;
