import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../theme/variables';


import Webview from '../screens/WebviewTest';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ArticleViewer from '../screens/ArticleView';
import { Button } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements'



const Stack = createNativeStackNavigator();

const HomeNavigation = () => {

  const stackNavScreenOptions = {
    headerShown: false,
    gestureEnabled: true, 
    style: {
      backgroundColor: "#sdfsdf",
      borderTopColor: Colors.background,
      color:"#sdfs4f"
    },
    activeTintColor: Colors.white,
    inactiveTintColor: Colors.gray,
    title: "BRand",
    headerTintColor: "green",
    headerPressColor: "green",
    headerRightContainerStyle: {
      color: "green",
      backgroundColor: "yellow"
    }


  }

  const tabNavBarOptions = {
    activeTintColor: Colors.white,
    inactiveTintColor: Colors.gray,
    style: {
      backgroundColor: Colors.background,
      borderTopColor: Colors.background,
    },
  }

  return (
    <Stack.Navigator screenOptions={stackNavScreenOptions} >
      {/* <Stack.Screen name="Test1" component={Webview} /> */}
      <Stack.Screen name="Home" component={TabOneScreen} />
      <Stack.Screen name="Webview" component={ArticleViewer} options={({navigation, route }) => ({
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="green"
          />
        ),
        headerLeft: () => (
          <HeaderBackButton onPress={() => navigation.navigate("Home", route.params)} />
        ),

      })} />

    </Stack.Navigator>
  );
};
// const NewsNavigation = () => {

//   const stackNavScreenOptions = { headerShown: false, gestureEnabled: false }

//   return (
//     <Stack.Navigator screenOptions={stackNavScreenOptions}>
//       <Stack.Screen name="News" component={NewsScreen} />
//       <Stack.Screen name="Webview" component={ArticleViewer} />
//     </Stack.Navigator>
//   );
// };
// const SearchNavigation = () => {

//   const stackNavScreenOptions = { headerShown: false, gestureEnabled: false }

//   return (
//     <Stack.Navigator screenOptions={stackNavScreenOptions}>
//       <Stack.Screen name="Search" component={SearchScreen} />
//       <Stack.Screen name="Detail" component={DetailScreen} />
//     </Stack.Navigator>
//   );
// };

const Tab = createBottomTabNavigator();



const AppNavigation = () => {

  const tabNavScreenOptions = ({ route }: any) => ({
    tabBarIcon: ({ focused, color, size }: any) => {
      let iconName = "";
      switch (route.name) {
        case "Feed":
          iconName = "newspaper-sharp"
          break;
        case "News":
          iconName = "newspaper-sharp"
          break;
        case "Trending":
          iconName = "rocket-sharp"
          break;
        case "Search":
          iconName = "search-sharp"
          break;
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    headerShown: false,
    activeTintColor: Colors.white,
    inactiveTintColor: Colors.gray,
  })

  const tabNavBarOptions = {
    activeTintColor: Colors.white,
    inactiveTintColor: Colors.gray,
    style: {
      backgroundColor: Colors.background,
      borderTopColor: Colors.background,
    },
  }

  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.white,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator screenOptions={tabNavScreenOptions}>
        <Tab.Screen name="Feed" component={HomeNavigation} />
        <Tab.Screen name="Search" component={TabTwoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );


}

export default AppNavigation;
