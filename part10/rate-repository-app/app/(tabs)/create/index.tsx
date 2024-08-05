import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ReviewForm } from "@/components/ReviewForm";
import {
  CreateReviewResponse,
  CreateReviewVariables,
  ReviewFormValues,
} from "@/types";
import { FormikHelpers } from "formik";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "@/graphql/mutations";
import { GET_REPOSITORIES, GET_REPOSITORY_INFO } from "@/graphql/queries";
import { useRouter } from "expo-router";

export default function CreateReviewScreen() {
  const router = useRouter();
  const [createReview, { data, loading, error }] = useMutation<
    CreateReviewResponse,
    CreateReviewVariables
  >(CREATE_REVIEW);

  const handleSubmit = async (
    values: ReviewFormValues,
    helpers: FormikHelpers<ReviewFormValues>
  ) => {
    try {
      const response = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.name,
            rating: Number(values.rating),
            text: values.review,
          },
        },
        refetchQueries: [
          { query: GET_REPOSITORIES },
          {
            query: GET_REPOSITORY_INFO,
            variables: { repositoryId: data?.createReview?.repositoryId },
          },
        ],
      });

      if (response.data?.createReview) {
        router.push({
          pathname: "/repositories/[id]",
          params: { id: response.data.createReview.repositoryId },
        });
      }
    } catch (err) {
      if (err instanceof ApolloError) {
        console.error("ApolloError:", err.message);
      } else {
        console.error("Unexpected Error:", err);
      }
      throw err;
    }
    helpers.setSubmitting(false);
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Create new review</ThemedText>
      </ThemedView>
      <ReviewForm onSubmit={handleSubmit} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
