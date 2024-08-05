import { StyleSheet } from "react-native";
import { Review } from "@/types";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { format } from "date-fns";

interface Props {
  review: Review;
  alt?: boolean;
  children?: React.ReactNode;
}

export function ReviewItem({ review, alt, children }: Props) {
  const color = useThemeColor({}, "cardBackground");
  const primaryColor = useThemeColor({}, "buttonPrimary");

  const styles = StyleSheet.create({
    cardContainer: {
      width: "100%",
      backgroundColor: color,
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    row1Card: {
      backgroundColor: color,
      padding: 10,
      display: "flex",
      flexDirection: "row",
      gap: 20,
    },
    ratingContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderColor: primaryColor,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color,
    },
    ratingText: {
      color: primaryColor,
      fontWeight: "bold",
    },
    reviewInfoContainer: {
      backgroundColor: color,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },
    dateText: {
      fontSize: 14,
      color: "#999",
    },
    userText: {
      marginTop: 10,
      fontSize: 16,
    },
  });

  return (
    <ThemedView style={styles.cardContainer}>
      <ThemedView style={styles.row1Card}>
        <ThemedView style={styles.ratingContainer}>
          <ThemedText style={styles.ratingText}>{review.rating}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.reviewInfoContainer}>
          <ThemedText type="defaultSemiBold">
            {alt ? review.repository.fullName : review.user.username}
          </ThemedText>
          <ThemedText type="description" style={styles.dateText}>
            {format(review.createdAt, "dd.mm.yyyy")}
          </ThemedText>
          <ThemedText style={styles.userText}>{review.text}</ThemedText>
        </ThemedView>
      </ThemedView>
      {children}
    </ThemedView>
  );
}
