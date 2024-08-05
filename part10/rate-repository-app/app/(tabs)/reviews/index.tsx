import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ME as MeType, UsersReviews } from "@/types";
import {
  GET_REPOSITORIES,
  GET_REPOSITORY_INFO,
  GET_USERS_REVIEWS,
  ME,
} from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ReviewList } from "@/components/ReviewList";
import { DELETE_REVIEW } from "@/graphql/mutations";
import { ApolloError } from "apollo-boost";

export default function PersonalReviewScreen() {
  const deviceType = useAppSelector((state) => state.device);
  const {
    data: meData,
    error: errorMe,
    loading: loadingMe,
  } = useQuery<MeType>(ME, {
    fetchPolicy: "cache-and-network",
  });

  const {
    data: reviewData,
    loading: loadingReview,
    error: errorReview,
  } = useQuery<UsersReviews>(GET_USERS_REVIEWS, {
    fetchPolicy: "cache-and-network",
  });

  const [deleteReview, { data, loading, error }] = useMutation<
    boolean,
    {
      deleteReviewId: string;
    }
  >(DELETE_REVIEW);

  if (loadingMe || errorMe || loadingReview || errorReview) {
    return null;
  }

  if (meData?.me && reviewData?.users) {
    const personalData = reviewData?.users.edges.find((userNode) => {
      if (userNode.node.id === meData.me.id) {
        return userNode.node.reviews.edges;
      }
    });

    if (personalData) {
      const personalReviews = personalData.node.reviews;

      const handleDelete = async (id: string) => {
        try {
          await deleteReview({
            variables: {
              deleteReviewId: id,
            },
            refetchQueries: [
              { query: GET_USERS_REVIEWS },
              { query: GET_REPOSITORIES },
              { query: GET_REPOSITORY_INFO },
            ],
          });
        } catch (err) {
          if (err instanceof ApolloError) {
            console.error("ApolloError:", err.message);
          } else {
            console.error("Unexpected Error:", err);
          }
          throw err;
        }
      };

      if (deviceType === "desktop" || deviceType === "tv") {
        return (
          <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
              <ReviewList
                reviewData={personalReviews}
                onDelete={handleDelete}
                alt
              />
            </ThemedView>
          </ParallaxScrollView>
        );
      }

      return (
        <ThemedView style={styles.titleContainer}>
          <ReviewList
            reviewData={personalReviews}
            onDelete={handleDelete}
            alt
          />
        </ThemedView>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
