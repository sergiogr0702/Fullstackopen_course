import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RepositoryList } from "@/components/RepositoryList";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { AddButton } from "@/components/AddButton";

export default function RepositoriesScreen() {
  const deviceType = useAppSelector((state) => state.device);
  const repositories = useAppSelector((state) => state.repositories);

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
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
