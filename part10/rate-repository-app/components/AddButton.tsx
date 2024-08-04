import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  href: "/login" | "/create" | "/";
}

export function AddButton({ href }: Props) {
  const backgroundColor = useThemeColor({}, "buttonPrimary");
  const textColor = useThemeColor({}, "primaryButtonText");

  const styles = StyleSheet.create({
    addButton: {
      position: "absolute",
      bottom: 50,
      right: 50,
      alignSelf: "center",
      zIndex: 1,
      height: 80,
      width: 80,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor,
      color: textColor,
    },
  });

  return (
    <TouchableOpacity style={styles.addButton}>
      <Link href={href}>
        <Ionicons color={textColor} size={40} name="add"></Ionicons>
      </Link>
    </TouchableOpacity>
  );
}
