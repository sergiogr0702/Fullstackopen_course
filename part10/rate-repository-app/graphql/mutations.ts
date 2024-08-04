import { gql } from "@apollo/client";

export const AUHTENTICATE_USER = gql`
  mutation authenticateUser($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      user {
        id
        username
        createdAt
      }
      accessToken
      expiresAt
    }
  }
`;
