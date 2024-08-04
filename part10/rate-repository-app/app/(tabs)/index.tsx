import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RepositoryList } from "@/components/RepositoryList";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { AddButton } from "@/components/AddButton";
import useRepositories from "@/hooks/useRepository";
import { ThemedText } from "@/components/ThemedText";

export default function RepositoriesScreen() {
  const deviceType = useAppSelector((state) => state.device);
  const { repositories, loading, error, refetch } = useRepositories();

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

  if (repositories) {
    if (deviceType === "desktop" || deviceType === "tv") {
      return (
        <>
          <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
              <RepositoryList repositories={repositories} />
            </ThemedView>
          </ParallaxScrollView>
          <AddButton href="/create" />
        </>
      );
    }

    return (
      <ThemedView style={styles.titleContainer}>
        <RepositoryList repositories={repositories} />
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
