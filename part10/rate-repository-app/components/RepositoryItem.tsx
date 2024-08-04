import { Repository } from "@/types";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

interface Props {
  repository: Repository;
}

export function RepositoryItem({ repository }: Props) {
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
      gap: 20,
      marginTop: 10,
      marginBottom: 10,
    },
    row2Container: {
      display: "flex",
      flexDirection: "row",
      gap: 20,
      paddingHorizontal: 35,
      marginBottom: 10,
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    repositoryInfoContainer: {
      flex: 1,
      display: "flex",
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

  return (
    <View style={styles.cardContainer}>
      <View style={styles.row1Container}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.ownerAvatar}
          alt={repository.fullName}
        />
        <View style={styles.repositoryInfoContainer}>
          <ThemedText
            type="defaultSemiBold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {repository.fullName}
          </ThemedText>
          <ThemedText type="description" numberOfLines={2} ellipsizeMode="tail">
            {repository.description}
          </ThemedText>
          <TouchableOpacity style={styles.languageButton}>
            <ThemedText
              type="defaultSemiBold"
              lightColor={Colors.light.primaryButtonText}
              darkColor={Colors.dark.primaryButtonText}
            >
              {repository.language}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row2Container}>
        <View style={styles.statsContainer}>
          <ThemedText type="defaultSemiBold">
            {formatNumber(repository.stargazersCount)}
          </ThemedText>
          <ThemedText type="description">Stars</ThemedText>
        </View>
        <View style={styles.statsContainer}>
          <ThemedText type="defaultSemiBold">
            {formatNumber(repository.forksCount)}
          </ThemedText>
          <ThemedText type="description">Forks</ThemedText>
        </View>
        <View style={styles.statsContainer}>
          <ThemedText type="defaultSemiBold">
            {formatNumber(repository.reviewCount)}
          </ThemedText>
          <ThemedText type="description">Reviews</ThemedText>
        </View>
        <View style={styles.statsContainer}>
          <ThemedText type="defaultSemiBold">
            {formatNumber(repository.ratingAverage)}
          </ThemedText>
          <ThemedText type="description">Rating</ThemedText>
        </View>
      </View>
    </View>
  );
}
