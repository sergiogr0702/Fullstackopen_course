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

export interface LoginFormValues {
  username: string;
  password: string;
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
  };
  pageInfo: RepositoryPageInfo;
  totalCount: number;
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
