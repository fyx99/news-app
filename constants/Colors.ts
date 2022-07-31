import { DarkTheme, DefaultTheme } from "@react-navigation/native";



export default {
  light: {
    ...DefaultTheme.colors,
    
    primary: "blue",
    
    notification: "green",
    card: "white",
    tint: "blue",

    tabBarInactive: "#aaa",
    tabBarActive: "black"
  },
  dark: {
    ...DarkTheme.colors,
    
    tint: "blue",
    border:"white",
    card: "#111",

    
    tabBarInactive: "#aaa",
    tabBarActive: "white"
  },
};
