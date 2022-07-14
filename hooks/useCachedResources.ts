import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';



export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'RobotoSlab-Black': require('../assets/fonts/RobotoSlab-Black.ttf'),
          'RobotoSlab-Bold': require('../assets/fonts/RobotoSlab-Bold.ttf'),
          'RobotoSlab-ExtraBold': require('../assets/fonts/RobotoSlab-ExtraBold.ttf'),
          'RobotoSlab-ExtraLight': require('../assets/fonts/RobotoSlab-ExtraLight.ttf'),
          'RobotoSlab-Light': require('../assets/fonts/RobotoSlab-Light.ttf'),
          'RobotoSlab-Medium': require('../assets/fonts/RobotoSlab-Medium.ttf'),
          'RobotoSlab-Regular': require('../assets/fonts/RobotoSlab-Regular.ttf'),
          'RobotoSlab-SemiBold': require('../assets/fonts/RobotoSlab-SemiBold.ttf'),
          'RobotoSlab-Thin': require('../assets/fonts/RobotoSlab-Thin.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
