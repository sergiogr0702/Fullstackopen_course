import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from "react-native";

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    borderColor: "red",
    borderWidth: 1,
  },
});

interface Props extends NativeTextInputProps {
  error?: boolean;
  style?: StyleProp<TextStyle>;
}

export function TextInput({ style, error, ...rest }: Props) {
  const textInputStyle = [style, styles.input, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...rest} />;
}
