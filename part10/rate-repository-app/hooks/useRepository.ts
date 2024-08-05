import { useQuery } from "@apollo/react-hooks";
import { GET_REPOSITORIES } from "@/graphql/queries";
import { RepositoriesData, orderBy, orderDirection } from "@/types";

const useRepositories = (
  orderBy: orderBy,
  orderDirection: orderDirection,
  search: string
) => {
  const { data, error, loading, fetchMore, refetch } =
    useQuery<RepositoriesData>(GET_REPOSITORIES, {
      fetchPolicy: "cache-and-network",
      variables: {
        first: 2,
        orderBy: orderBy,
        orderDirection: orderDirection,
        searchKeyword: search,
      },
    });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        first: 4,
        after: data.repositories.pageInfo.endCursor,
        orderBy: orderBy,
        orderDirection: orderDirection,
        searchKeyword: search,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
