import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';

export default function ModalScreen({ navigation, route }) {

    const url = route.params.url 
    const publisher = route.params.publisher
    console.log("Modal")
    console.log(route.params)


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


            <Text style={styles.title}>{publisher.publisher}</Text>
            <Text style={styles.title}>{publisher.feed}</Text>

            <Pressable>
                <View>
                    <Text>Subscribe</Text>
                </View>
            </Pressable>

            <Image style={styles.newsPublisherIcon} resizeMode="cover" source={{ uri: publisher.icon_url || "https://www.n-tv.de/resources/57615475/responsive/img/touch/apple-touch-icon-144x144-precomposed.png" }} />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    newsPublisherIcon: {
        width: 200,
        height: 200,
        backgroundColor: "black"
      },
});
