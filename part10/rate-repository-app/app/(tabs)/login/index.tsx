import { StyleSheet } from "react-native";
import { router } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { LoginForm } from "@/components/LoginForm";
import { FormikHelpers } from "formik";
import { LoginFormValues } from "@/types";
import useSignIn from "@/hooks/useSignIn";
import { getAccessToken } from "@/reducers/authReducer";
import { useApolloClient } from "@apollo/client";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export default function LogInScreen() {
  const { signIn } = useSignIn();
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClient();

  const handleSubmit = async (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const data = await signIn(values.username, values.password);
      const accessToken = await dispatch(getAccessToken());
      if (data && accessToken) {
        apolloClient.resetStore();
        router.replace("/");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }

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
