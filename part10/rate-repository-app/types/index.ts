export interface Repository {
  id: string;
  ownerName: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  openIssuesCount: number;
  watchersCount: number;
  ownerAvatarUrl: string;
  url: string;
  createdAt: string;
}

export interface RepositoryDetails {
  repository: RepositoryDataInfo;
}

export interface RepositoryDataInfo extends Repository {
  pageInfo: RepositoryPageInfo;
  totalCount: number;
  userHasReviewed: boolean;
  reviews: ReviewInfo;
}

export interface ReviewInfo {
  pageInfo: RepositoryPageInfo;
  totalCount: number;
  edges: ReviewEdge[];
}

export interface ReviewEdge {
  node: Review;
  cursor: string;
}

export interface Review {
  id: string;
  userId: string;
  repositoryId: string;
  rating: number;
  text: string;
  user: ReviewUserInfo;
  createdAt: string;
  repository: Repository;
}

export interface ReviewUserInfo {
  id: string;
  username: string;
  createdAt: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface RegisterFormValues extends LoginFormValues {
  passwordConfirmation: string;
}

export interface CreateUserVariables {
  user: {
    username: string;
    password: string;
  };
}

export interface CreateUserResponse {
  createUser: {
    id: string;
    username: string;
    createdAt: string;
  };
}

export interface RepositoryPageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface RepositoryEdge {
  node: Repository;
  cursor: string;
}

export interface RepositoriesData {
  repositories: {
    edges: RepositoryEdge[];
    pageInfo: RepositoryPageInfo;
    totalCount: number;
  };
}

export interface AuthenticateUserResponse {
  authenticate: {
    user: {
      id: string;
      username: string;
      createdAt: string;
    };
    accessToken: string;
    expiresAt: string;
  };
}

// Define the types for the mutation variables
export interface AuthenticateUserVariables {
  credentials: {
    username: string;
    password: string;
  };
}

export interface ME {
  me: {
    id: string;
    username: string;
  };
}

export interface AccessToken {
  token: string;
  expiresAt: Date;
}

export interface ReviewFormValues {
  ownerName: string;
  name: string;
  rating: number;
  review: string;
}

export interface CreateReviewResponse {
  createReview: {
    id: string;
    userId: string;
    repositoryId: string;
    rating: number;
    text: string;
    createdAt: string;
  };
}

export interface CreateReviewVariables {
  review: {
    ownerName: string;
    repositoryName: string;
    rating: number;
    text: string;
  };
}

export enum Filter {
  LATEST = "Latest repositories",
  HRATED = "Highest rated repositories",
  LRATED = "Lowest rated repositories",
}

export enum orderBy {
  CREATED_AT = "CREATED_AT",
  RATING_AVERAGE = "RATING_AVERAGE",
}

export enum orderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface UserReviews {
  id: string;
  username: string;
  reviews: ReviewInfo;
}

export interface UsersReviews {
  users: {
    edges: {
      node: UserReviews;
    }[];
  };
}
