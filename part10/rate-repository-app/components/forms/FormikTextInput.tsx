import { useField } from "formik";
import { StyleSheet, TextInputProps } from "react-native";
import { TextInput } from "./TextInput";
import { ThemedText } from "../ThemedText";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: "#d73a4a",
  },
});

interface Props extends TextInputProps {
  name: string;
}

export function FormikTextInput({ name, ...rest }: Props) {
  const [field, meta, helpers] = useField<string>(name);
  const showError = Boolean(meta.touched && meta.error);

  return (
    <>
      <TextInput
        error={showError}
        onChangeText={(value: string) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        {...rest}
      />
      {showError && (
        <ThemedText style={styles.errorText}>{meta.error}</ThemedText>
      )}
    </>
  );
}
