import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { DeviceType, getDeviceTypeAsync } from "expo-device";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setDevice } from "@/reducers/deviceReducer";
import { Link } from "expo-router";

export function AppBar() {
  const deviceType = useAppSelector((state) => state.device);
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const deviceTypeMap = {
    [DeviceType.UNKNOWN]: "unknown",
    [DeviceType.PHONE]: "phone",
    [DeviceType.TABLET]: "tablet",
    [DeviceType.DESKTOP]: "desktop",
    [DeviceType.TV]: "tv",
  };

  useEffect(() => {
    getDeviceTypeAsync().then((deviceType) => {
      dispatch(setDevice(deviceTypeMap[deviceType]));
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      paddingTop: 25,
      paddingBottom: 35,
      paddingLeft: 20,
      backgroundColor: Colors[colorScheme ?? "light"].appBar,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    appName: {
      position: "relative",
      top: 20,
      left: 10,
    },
    link: {
      position: "relative",
      textDecorationLine: "underline",
      top: 20,
      right: 40,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.appName} type="subtitle">
        Rate repository app
      </ThemedText>
      <ThemedText style={styles.link} type="defaultSemiBold">
        <Link href="/login">Log in</Link>
      </ThemedText>
    </ThemedView>
  );
}
