import { useEffect } from "react";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DeviceType, getDeviceTypeAsync } from "expo-device";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setDevice } from "@/reducers/deviceReducer";
import { Link } from "expo-router";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "@/graphql/queries";
import { ME as MeType } from "@/types";
import { getAccessToken, removeAccessToken } from "@/reducers/authReducer";

export function AppBar() {
  const { data, error, loading } = useQuery<MeType>(ME, {
    fetchPolicy: "cache-and-network",
  });
  const apolloClient = useApolloClient();
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

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await dispatch(getAccessToken());
      if (accessToken) {
        const expirationDate = new Date(accessToken.expiresAt);
        const now = new Date();

        if (now >= expirationDate) {
          // Token is expired, log out the user
          handleLogOut();
        }
      }
    };

    // Check the token validity immediately and then every 5 minutes
    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 5 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
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

  const handleLogOut = async () => {
    await dispatch(removeAccessToken());
    await apolloClient.resetStore();
    router.replace("/");
  };

  if (loading || error) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.appName} type="subtitle">
        Rate repository app
      </ThemedText>

      {data?.me ? (
        <TouchableOpacity onPress={handleLogOut}>
          <ThemedText style={styles.link} type="defaultSemiBold">
            Log out
          </ThemedText>
        </TouchableOpacity>
      ) : (
        <ThemedText style={styles.link} type="defaultSemiBold">
          <Link href="/login">Log in</Link>
        </ThemedText>
      )}
    </ThemedView>
  );
}
