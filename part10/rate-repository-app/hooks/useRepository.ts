import { useQuery } from "@apollo/react-hooks";
import { GET_REPOSITORIES } from "@/graphql/queries";
import { RepositoriesData } from "@/types";

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery<RepositoriesData>(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    repositories: data?.repositories?.edges?.map(({ node }) => node),
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
