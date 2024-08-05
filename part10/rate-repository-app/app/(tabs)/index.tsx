import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useAppSelector } from "@/hooks/useAppSelector";
import RepositoryList from "@/components/RepositoryList";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { AddButton } from "@/components/AddButton";
import useRepositories from "@/hooks/useRepository";
import { ThemedText } from "@/components/ThemedText";
import { Filter, ME as MeType } from "@/types";
import { ME } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getQueryVariables } from "@/utils/getQueryVariables";
import { useDebounce } from "use-debounce";

export default function RepositoriesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounce applied here
  const [filter, setFilter] = useState<Filter>(Filter.LATEST);

  const {
    data,
    error: errorMe,
    loading: loadingMe,
  } = useQuery<MeType>(ME, {
    fetchPolicy: "cache-and-network",
  });

  const deviceType = useAppSelector((state) => state.device);

  const queryVariables = getQueryVariables(filter);
  const { repositories, fetchMore, loading, error, refetch } = useRepositories(
    queryVariables.orderBy,
    queryVariables.orderDirection,
    debouncedSearchQuery
  );

  useEffect(() => {
    refetch(queryVariables);
  }, [filter, debouncedSearchQuery, refetch]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  if (loading) {
    return (
      <ThemedView>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView>
        <ThemedText>Error: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  if (loadingMe || errorMe) {
    return null;
  }

  const onEndReach = () => {
    fetchMore();
  };

  if (repositories) {
    if (deviceType === "desktop" || deviceType === "tv") {
      return (
        <>
          <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
              <RepositoryList
                onEndReach={onEndReach}
                repositoriesData={repositories.edges}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                filter={filter}
                onFilterChange={handleFilterChange}
              />
            </ThemedView>
          </ParallaxScrollView>
          {data?.me && <AddButton href="/create" />}
        </>
      );
    }

    return (
      <ThemedView style={styles.titleContainer}>
        <RepositoryList
          onEndReach={onEndReach}
          repositoriesData={repositories.edges}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filter={filter}
          onFilterChange={handleFilterChange}
        />
      </ThemedView>
    );
  } else {
    return (
      <ThemedView>
        <ThemedText>No data to display</ThemedText>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
