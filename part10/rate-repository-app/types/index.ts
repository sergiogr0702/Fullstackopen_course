export interface NewRepositoryAction {
  type: string;
  payload: Repository;
}

export interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}
