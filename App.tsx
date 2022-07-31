//import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
//import Navigation from './navigation';
import {  StatusBar,  } from 'react-native';

import AppNavigation from './navigation/app';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider >
        <AppNavigation />
        <StatusBar animated={true} barStyle={colorScheme == "light" ? "dark-content" : "light-content"} hidden={false} />
      </SafeAreaProvider>
    );
  }
}
