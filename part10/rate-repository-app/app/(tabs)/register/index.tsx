import { StyleSheet } from "react-native";
import { router } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useSignIn from "@/hooks/useSignIn";
import { getAccessToken } from "@/reducers/authReducer";
import { useApolloClient, useMutation } from "@apollo/client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { FormikHelpers } from "formik";
import {
  CreateUserResponse,
  CreateUserVariables,
  RegisterFormValues,
} from "@/types";
import { CREATE_USER } from "@/graphql/mutations";
import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterScreen() {
  const { signIn } = useSignIn();
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClient();

  const [createUser, { data, loading, error }] = useMutation<
    CreateUserResponse,
    CreateUserVariables
  >(CREATE_USER);

  const handleSubmit = async (
    values: RegisterFormValues,
    helpers: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      const response = await createUser({
        variables: {
          user: {
            username: values.username,
            password: values.password,
          },
        },
      });

      if (response.data?.createUser) {
        const data = await signIn(
          response.data.createUser.username,
          values.password
        );
        const accessToken = await dispatch(getAccessToken());
        if (data && accessToken) {
          apolloClient.resetStore();
          router.replace("/");
        }
      } else {
        console.error("Something unexpected happened in the server");
      }
    } catch (err) {
      console.error("Sign-up error:", err);
    }

    helpers.setSubmitting(false);
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Register an account</ThemedText>
      </ThemedView>
      <RegisterForm onSubmit={handleSubmit} />
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
