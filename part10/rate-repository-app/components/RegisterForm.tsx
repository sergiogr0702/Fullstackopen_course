import { Pressable, StyleSheet } from "react-native";
import { FormikTextInput } from "./forms/FormikTextInput";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Formik, FormikHelpers } from "formik";
import { registerValidationSchema } from "@/validation/registerValidationSchema";
import { RegisterFormValues } from "@/types";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  onSubmit: (
    values: RegisterFormValues,
    helpers: FormikHelpers<RegisterFormValues>
  ) => void;
}

export function RegisterForm({ onSubmit }: Props) {
  const buttonColor = useThemeColor({}, "buttonPrimary");
  const buttonTextColor = useThemeColor({}, "primaryButtonText");
  const initialValues: RegisterFormValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
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
        validationSchema={registerValidationSchema}
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
            <FormikTextInput
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              secureTextEntry
            />
            <Pressable
              style={styles.submitButton}
              onPress={() => handleSubmit()}
            >
              <ThemedText
                type="defaultSemiBold"
                style={{ marginTop: 10, color: buttonTextColor }}
              >
                Sign up
              </ThemedText>
            </Pressable>
          </>
        )}
      </Formik>
    </ThemedView>
  );
}
