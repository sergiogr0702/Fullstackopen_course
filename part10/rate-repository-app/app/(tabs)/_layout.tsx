import { Tabs } from "expo-router";
import React from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const deviceType = useAppSelector((state) => state.device);

  const colorScheme = useColorScheme();
  const color = useThemeColor({}, "cardBackground");

  let screenOptions: BottomTabNavigationOptions = {
    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    tabBarStyle: {
      backgroundColor: color,
      height: 65,
      position: "relative",
      bottom: 10,
      alignItems: "center",
      marginHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 20,
      borderCurve: "continuous",
      shadowRadius: 10,
      shadowOpacity: 0.1,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 10,
    },
    headerShown: false,
  };

  // Additional styles for desktop or tv
  if (deviceType === "desktop" || deviceType === "tv") {
    const newProperties: BottomTabNavigationOptions = {
      tabBarStyle: {
        height: 0,
        flexDirection: "row",
        justifyContent: "space-between",
      },
    };
    screenOptions = { ...screenOptions, ...newProperties };
  }

  return (
    <Tabs screenOptions={{ ...screenOptions }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Repositories",
          href: deviceType === "desktop" || deviceType === "tv" ? null : "/",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list" : "list-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create/index"
        options={{
          title: "Create a review",
          href:
            deviceType === "desktop" || deviceType === "tv" ? null : "/create",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="login/index"
        options={{
          title: "Log In",
          href: null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-add" : "person-add-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
