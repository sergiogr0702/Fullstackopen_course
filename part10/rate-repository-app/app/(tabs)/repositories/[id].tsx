import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  StyleSheet,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLazyQuery } from "@apollo/client";
import { GET_REPOSITORY_INFO } from "@/graphql/queries";
import { useEffect } from "react";
import { Repository, RepositoryDetails } from "@/types";
import { RepositoryItem } from "@/components/RepositoryItem";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ReviewList } from "@/components/ReviewList";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function RepositoryDetailsScreen() {
  const deviceType = useAppSelector((state) => state.device);
  const { id } = useLocalSearchParams();
  const primaryButtonColor = useThemeColor({}, "buttonPrimary");
  const primaryTextColor = useThemeColor({}, "primaryButtonText");

  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: "column",
      gap: 8,
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    primaryButton: {
      backgroundColor: primaryButtonColor,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginTop: 16,
      alignItems: "center",
      cursor: "pointer",
    },
    primaryButtonText: {
      color: primaryTextColor,
      fontSize: 16,
    },
  });

  const [getRepositoryInfo, { loading, data, error }] =
    useLazyQuery<RepositoryDetails>(GET_REPOSITORY_INFO, {
      fetchPolicy: "cache-and-network",
    });

  useEffect(() => {
    if (id) {
      getRepositoryInfo({ variables: { repositoryId: id } });
    }
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText>Error loading repository data: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  if (data) {
    const repositoryData = data.repository;

    const repository: Repository = {
      id: repositoryData.id,
      ownerName: repositoryData.ownerName,
      ownerAvatarUrl: repositoryData.ownerAvatarUrl,
      fullName: repositoryData.fullName,
      description: repositoryData.description,
      stargazersCount: repositoryData.stargazersCount,
      forksCount: repositoryData.forksCount,
      reviewCount: repositoryData.reviewCount,
      ratingAverage: repositoryData.ratingAverage,
      language: repositoryData.language,
      url: repositoryData.url,
      createdAt: repositoryData.createdAt,
      openIssuesCount: repositoryData.openIssuesCount,
      watchersCount: repositoryData.watchersCount,
      name: repositoryData.name,
    };

    const repositoryInfo = (
      <ThemedView style={styles.titleContainer}>
        <RepositoryItem repository={repository}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => Linking.openURL(repository.url)}
          >
            <ThemedText type="default" style={styles.primaryButtonText}>
              Open in GitHub
            </ThemedText>
          </Pressable>
        </RepositoryItem>
        <ReviewList reviewData={repositoryData.reviews} />
      </ThemedView>
    );

    if (deviceType === "desktop" || deviceType === "tv") {
      return <ParallaxScrollView>{repositoryInfo}</ParallaxScrollView>;
    } else {
      return repositoryInfo;
    }
  }

  return null;
}
