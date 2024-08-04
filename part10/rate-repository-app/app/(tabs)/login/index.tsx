import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { LoginForm } from "@/components/LoginForm";
import { FormikHelpers } from "formik";
import { LoginFormValues } from "@/types";

export default function LogInScreen() {
  const handleSubmit = (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => {
    console.log(values);

    helpers.setSubmitting(false);
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Log in</ThemedText>
      </ThemedView>
      <LoginForm onSubmit={handleSubmit} />
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
