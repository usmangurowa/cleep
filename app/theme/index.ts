import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const dark = {
  colors: {
    primary: "rgb(255, 179, 182)",
    onPrimary: "rgb(104, 0, 26)",
    primaryContainer: "rgb(146, 0, 40)",
    onPrimaryContainer: "rgb(255, 218, 218)",
    secondary: "rgb(230, 189, 190)",
    onSecondary: "rgb(68, 41, 43)",
    secondaryContainer: "rgb(93, 63, 64)",
    onSecondaryContainer: "rgb(255, 218, 218)",
    tertiary: "rgb(230, 192, 141)",
    onTertiary: "rgb(67, 44, 6)",
    tertiaryContainer: "rgb(92, 66, 26)",
    onTertiaryContainer: "rgb(255, 221, 178)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(32, 26, 26)",
    onBackground: "rgb(236, 224, 223)",
    surface: "rgb(32, 26, 26)",
    onSurface: "rgb(236, 224, 223)",
    surfaceVariant: "rgb(82, 67, 67)",
    onSurfaceVariant: "rgb(215, 193, 194)",
    outline: "rgb(159, 140, 140)",
    outlineVariant: "rgb(82, 67, 67)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(236, 224, 223)",
    inverseOnSurface: "rgb(54, 47, 47)",
    inversePrimary: "rgb(190, 0, 55)",
    elevation: {
      level0: "transparent",
      level1: "rgb(43, 34, 34)",
      level2: "rgb(50, 38, 39)",
      level3: "rgb(57, 43, 43)",
      level4: "rgb(59, 44, 45)",
      level5: "rgb(63, 47, 48)",
    },
    surfaceDisabled: "rgba(236, 224, 223, 0.12)",
    onSurfaceDisabled: "rgba(236, 224, 223, 0.38)",
    backdrop: "rgba(59, 45, 45, 0.4)",
  },
};

export const light = {
  colors: {
    primary: "rgb(190, 0, 55)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 218, 218)",
    onPrimaryContainer: "rgb(64, 0, 12)",
    secondary: "rgb(118, 86, 87)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 218, 218)",
    onSecondaryContainer: "rgb(44, 21, 22)",
    tertiary: "rgb(118, 89, 47)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 221, 178)",
    onTertiaryContainer: "rgb(41, 24, 0)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(32, 26, 26)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 26)",
    surfaceVariant: "rgb(244, 221, 221)",
    onSurfaceVariant: "rgb(82, 67, 67)",
    outline: "rgb(133, 115, 115)",
    outlineVariant: "rgb(215, 193, 194)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(54, 47, 47)",
    inverseOnSurface: "rgb(251, 238, 237)",
    inversePrimary: "rgb(255, 179, 182)",
    elevation: {
      level0: "transparent",
      level1: "rgb(252, 238, 245)",
      level2: "rgb(250, 231, 239)",
      level3: "rgb(248, 223, 233)",
      level4: "rgb(247, 221, 231)",
      level5: "rgb(246, 216, 227)",
    },
    surfaceDisabled: "rgba(32, 26, 26, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 26, 0.38)",
    backdrop: "rgba(59, 45, 45, 0.4)",
  },
};

const theme = (mode: "dark" | "light" = "light") => {
  const colors = mode === "dark" ? dark.colors : light.colors;
  const _theme: typeof DefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
    },
    dark: mode === "dark",
    roundness: 10,
  };
  return _theme;
};

export default theme;
