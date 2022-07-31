import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ColorsOld } from '../theme/variables';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text as ThemedText, View as ThemedView } from '../components/Themed';


import Colors from '../constants/Colors';


import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ArticleViewer from '../screens/ArticleView';
import { Button, View, Text } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements'
import useColorscheme from '../hooks/useColorScheme';
import { CustomTheme } from '../components/Themed';
import ModalScreen from '../screens/PublisherModal';



const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  // this style is useless
  const stackNavScreenOptions = {
    headerShown: false,
    gestureEnabled: false,
    style: {
      backgroundColor: "#sdfsdf",
      borderTopColor: ColorsOld.background,
      color: "#sdfs4f"
    },
    activeTintColor: ColorsOld.white,
    inactiveTintColor: ColorsOld.gray,
    title: "BRand",
    headerTintColor: "green",
    headerPressColor: "green",
    headerRightContainerStyle: {
      color: "green",
      backgroundColor: "yellow"
    }


  }

  const publisherModalOptions = {
    presentation: "modal"
  }

  const tabNavBarOptions = {
    activeTintColor: ColorsOld.white,
    inactiveTintColor: ColorsOld.gray,
    style: {
      backgroundColor: ColorsOld.background,
      borderTopColor: ColorsOld.background,
    },
  }

  return (
    <Stack.Navigator screenOptions={stackNavScreenOptions} >
      <Stack.Screen name="Home" component={TabOneScreen} />
      <Stack.Screen name="Modal" component={ModalScreen} options={{presentation: 'card'}} />


    </Stack.Navigator>
  );
};


const Tab = createBottomTabNavigator();



const AppNavigation = () => {

  const colorscheme = useColorscheme();
  const insets = useSafeAreaInsets();

  const tabNavScreenOptions  = ({ route }: any) => ({
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

    tabBarLabelStyle: {
      fontFamily: "RobotoSlab-Black"
    },
    tabBarActiveTintColor: Colors[colorscheme].tabBarActive,
    tabBarInactiveTintColor: Colors[colorscheme].tabBarInactive,
    header: ({ navigation, route, options, back }) => {

      return (
        <>
          <ThemedView style={{paddingTop: insets.top, paddingStart: insets.left, paddingEnd: insets.right, paddingBottom: 10,  alignItems: "center", justifyContent: "center", borderBottomWidth: 0.5, borderBottomColor: "white"}}>
            <View><ThemedText style={{fontSize: 23, fontFamily: "RobotoSlab-Black"}}>{"HEAD LINES"}</ThemedText></View>
            
          </ThemedView>
        </>
      );
    }

  })



  return (
    <NavigationContainer theme={CustomTheme[colorscheme]} >
      <Tab.Navigator screenOptions={tabNavScreenOptions}>
        <Tab.Screen name="Feed" component={HomeNavigation} options={{ title: 'My home' }} />
        <Tab.Screen name="Search" component={TabTwoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );

}

export default AppNavigation;
