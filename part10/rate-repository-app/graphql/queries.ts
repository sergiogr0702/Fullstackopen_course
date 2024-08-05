import { gql } from "@apollo/client";
import { REPOSITORY_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY_INFO = gql`
  query getRepository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      reviews {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            userId
            repositoryId
            rating
            createdAt
            text
            user {
              id
              username
              createdAt
            }
          }
        }
      }
      userHasReviewed
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_USERS_REVIEWS = gql`
  query getUsersReviews {
    users {
      edges {
        node {
          id
          username
          reviews {
            edges {
              node {
                id
                userId
                repositoryId
                rating
                text
                createdAt
                user {
                  id
                  username
                  createdAt
                }
                repository {
                  id
                  ownerName
                  name
                  createdAt
                  fullName
                  ratingAverage
                  reviewCount
                  stargazersCount
                  watchersCount
                  forksCount
                  openIssuesCount
                  url
                  ownerAvatarUrl
                  description
                  language
                  userHasReviewed
                }
              }
              cursor
            }
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
            totalCount
          }
        }
      }
    }
  }
`;
