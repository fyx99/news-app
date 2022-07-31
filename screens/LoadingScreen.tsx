import { StyleSheet } from 'react-native';

import { Text as ThemedText, View as ThemedView } from '../components/Themed';

export default function LoadingScreen() {
  return (
    <ThemedView style={styles.newsLogoContainer}>
        <ThemedView style={styles.newsLogoText}  >
            <ThemedText style={styles.title}>Tab Two</ThemedText>
            <ThemedText style={styles.title}>Tab Two</ThemedText>
        </ThemedView>
     
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    newsLogoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsLogoText: {

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
