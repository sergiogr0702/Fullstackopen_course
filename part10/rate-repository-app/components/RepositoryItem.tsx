import { Repository } from "@/types";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ThemedView } from "./ThemedView";

interface Props {
  repository: Repository;
  children?: React.ReactNode;
}

export function RepositoryItem({ repository, children }: Props) {
  const router = useRouter();
  const color = useThemeColor({}, "cardBackground");
  const buttonPrimaryColor = useThemeColor({}, "buttonPrimary");

  const styles = StyleSheet.create({
    cardContainer: {
      width: "100%",
      backgroundColor: color,
      padding: 10,
    },
    row1Container: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: color,
      gap: 20,
      marginTop: 10,
      marginBottom: 10,
    },
    row2Container: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: color,
      gap: 20,
      paddingHorizontal: 35,
      marginBottom: 10,
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    repositoryInfoContainer: {
      flex: 1,
      display: "flex",
      backgroundColor: color,
      flexDirection: "column",
      gap: 15,
    },
    ownerAvatar: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginLeft: 10,
      marginTop: 5,
    },
    statsContainer: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: color,
      gap: 10,
      alignItems: "center",
    },
    languageButton: {
      backgroundColor: buttonPrimaryColor,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      alignSelf: "flex-start",
    },
  });

  const formatNumber = (number: number) => {
    return number >= 1000
      ? `${(number / 1000).toFixed(1)}k`
      : number.toString();
  };

  const handleNavigate = () => {
    router.push({
      pathname: "/repositories/[id]",
      params: { id: repository.id },
    });
  };

  if (repository) {
    const repositoryCard = (
      <ThemedView style={{ backgroundColor: color }}>
        <ThemedView style={styles.row1Container}>
          <Image
            source={{ uri: repository.ownerAvatarUrl }}
            style={styles.ownerAvatar}
            alt={repository.fullName}
          />
          <ThemedView style={styles.repositoryInfoContainer}>
            <ThemedText
              type="defaultSemiBold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {repository.fullName}
            </ThemedText>
            <ThemedText
              type="description"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {repository.description}
            </ThemedText>
            <Pressable style={styles.languageButton}>
              <ThemedText
                type="defaultSemiBold"
                lightColor={Colors.light.primaryButtonText}
                darkColor={Colors.dark.primaryButtonText}
              >
                {repository.language}
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.row2Container}>
          <ThemedView style={styles.statsContainer}>
            <ThemedText type="defaultSemiBold">
              {formatNumber(repository.stargazersCount)}
            </ThemedText>
            <ThemedText type="description">Stars</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statsContainer}>
            <ThemedText type="defaultSemiBold">
              {formatNumber(repository.forksCount)}
            </ThemedText>
            <ThemedText type="description">Forks</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statsContainer}>
            <ThemedText type="defaultSemiBold">
              {formatNumber(repository.reviewCount)}
            </ThemedText>
            <ThemedText type="description">Reviews</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statsContainer}>
            <ThemedText type="defaultSemiBold">
              {formatNumber(repository.ratingAverage)}
            </ThemedText>
            <ThemedText type="description">Rating</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );

    if (children) {
      return (
        <ThemedView style={styles.cardContainer}>
          {repositoryCard}
          {children}
        </ThemedView>
      );
    } else {
      return (
        <ThemedView style={styles.cardContainer}>
          <Pressable onPress={handleNavigate}>{repositoryCard}</Pressable>
        </ThemedView>
      );
    }
  }
  return null;
}
