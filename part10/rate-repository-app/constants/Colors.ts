/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    buttonPrimary: "#0a7ea4",
    primaryButtonText: "#fff",
    background: "#f1f1f1",
    tint: tintColorLight,
    appBar: tintColorLight,
    cardBackground: "#fff",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    buttonPrimary: "#022a54",
    primaryButtonText: "#fff",
    background: "#151718",
    tint: tintColorDark,
    appBar: "#151718",
    cardBackground: "#9BA1A6",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
