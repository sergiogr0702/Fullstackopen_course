import { StyleSheet, TouchableOpacity } from "react-native";
import { FormikTextInput } from "./forms/FormikTextInput";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Formik, FormikHelpers } from "formik";
import { loginValidationSchema } from "@/validation/loginValidationSchema";
import { LoginFormValues } from "@/types";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  onSubmit: (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => void;
}

export function LoginForm({ onSubmit }: Props) {
  const buttonColor = useThemeColor({}, "buttonPrimary");
  const buttonTextColor = useThemeColor({}, "primaryButtonText");
  const initialValues: LoginFormValues = { username: "", password: "" };

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
        validationSchema={loginValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmit()}
            >
              <ThemedText
                type="defaultSemiBold"
                style={{ marginTop: 10, color: buttonTextColor }}
              >
                Log in
              </ThemedText>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ThemedView>
  );
}
