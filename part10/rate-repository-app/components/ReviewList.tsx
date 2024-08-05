import { ReviewInfo, ReviewEdge } from "@/types";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ReviewItem } from "./ReviewItem";
import { ThemedText } from "./ThemedText";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  reviewData: ReviewInfo;
  onDelete?: (id: string) => void;
  alt?: boolean;
}

export function ReviewList({ reviewData, onDelete, alt }: Props) {
  const router = useRouter();
  const buttonColor = useThemeColor({}, "buttonPrimary");
  const buttonTextColor = useThemeColor({}, "primaryButtonText");

  const styles = StyleSheet.create({
    separator: {
      height: 15,
    },
    contentContainer: {
      paddingBottom: 15,
    },
    primaryButton: {
      backgroundColor: buttonColor,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      alignItems: "center",
    },
    deleteButton: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      alignItems: "center",
    },
    actionsContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      justifyContent: "center",
    },
    buttonText: {
      color: buttonTextColor,
    },
  });

  const ItemSeparator = () => <View style={styles.separator} />;

  const handleNavigate = (id: string) => {
    router.push({
      pathname: "/repositories/[id]",
      params: { id: id },
    });
  };

  const renderItem = ({ item }: { item: ReviewEdge }) => {
    if (alt && onDelete) {
      return (
        <ReviewItem review={item.node} alt>
          <View style={styles.actionsContainer}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => handleNavigate(item.node.repositoryId)}
            >
              <ThemedText type="description" style={styles.buttonText}>
                View repository
              </ThemedText>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => onDelete(item.node.id)}
            >
              <ThemedText type="description" style={styles.buttonText}>
                Delete
              </ThemedText>
            </Pressable>
          </View>
        </ReviewItem>
      );
    }
    return <ReviewItem review={item.node} />;
  };

  return (
    <FlatList
      data={reviewData.edges}
      keyExtractor={(item) => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.contentContainer}
      renderItem={renderItem}
    />
  );
}
