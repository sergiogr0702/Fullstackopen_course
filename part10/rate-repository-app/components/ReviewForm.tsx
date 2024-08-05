import { Pressable, StyleSheet } from "react-native";
import { FormikTextInput } from "./forms/FormikTextInput";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Formik, FormikHelpers } from "formik";
import { ReviewFormValues } from "@/types";
import { useThemeColor } from "@/hooks/useThemeColor";
import { reviewValidationSchema } from "@/validation/reviewValidationSchema";

interface Props {
  onSubmit: (
    values: ReviewFormValues,
    helpers: FormikHelpers<ReviewFormValues>
  ) => void;
}

export function ReviewForm({ onSubmit }: Props) {
  const buttonColor = useThemeColor({}, "buttonPrimary");
  const buttonTextColor = useThemeColor({}, "primaryButtonText");
  const initialValues: ReviewFormValues = {
    ownerName: "",
    name: "",
    rating: 0,
    review: "",
  };

  const styles = StyleSheet.create({
    submitButton: {
      backgroundColor: buttonColor,
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      marginBottom: 10,
      alignItems: "center",
    },
  });

  return (
    <ThemedView>
      <Formik
        validationSchema={reviewValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner name"
            />
            <FormikTextInput name="name" placeholder="Repository name" />
            <FormikTextInput
              name="rating"
              keyboardType="numeric"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput name="review" placeholder="Review" />
            <Pressable
              style={styles.submitButton}
              onPress={() => handleSubmit()}
            >
              <ThemedText
                type="defaultSemiBold"
                style={{ marginTop: 10, color: buttonTextColor }}
              >
                Create review
              </ThemedText>
            </Pressable>
          </>
        )}
      </Formik>
    </ThemedView>
  );
}

//
