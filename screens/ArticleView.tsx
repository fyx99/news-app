import { StyleSheet, View, Text, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import layout from '../theme/layout';
import React, { useState } from 'react';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import storage from '../storage/storage'
import { Linking, Alert } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ArticleViewer = ({ navigation, route }: any) => {
    const url = route.params.url 

    const [ maxScroll, setMaxScroll ] = useState(0);

    const insets = useSafeAreaInsets();


    const onScrollArticleView = (evt) => {
        
        const fullHeight = evt.nativeEvent.contentSize.height
        const contentOffsetY = evt.nativeEvent.contentOffset.y
        const scrollRatio = contentOffsetY / fullHeight
        //route.params.onGoBack("asdasd");
        //navigation.state.params.onGoBack('123')
        const newMaxScroll = Math.max(maxScroll, scrollRatio)
        setMaxScroll(newMaxScroll)
        
        // storage.save({
        //     key: 'loginState', // Note: Do not use underscore("_") in key!
        //     data: {
        //       from: 'some other site',
        //       userid: 'some userid',
        //       token: 'some token'
        //     }
        //   });
        //   storage.save({
        //     key: 'loginState', // Note: Do not use underscore("_") in key!
        //     data: {
        //       from: 'some other site',
        //       userid: 'some userid',
        //       token: 'some token'
        //     },
          
        //     // if expires not specified, the defaultExpires will be applied instead.
        //     // if set to null, then it will never expire.
        //     expires: 1000 * 3600
        //   });
          
        //   // load
        //   storage
        //     .load({
        //       key: 'loginState',
          
        //       // autoSync (default: true) means if data is not found or has expired,
        //       // then invoke the corresponding sync method
        //       autoSync: true,
          
        //       // syncInBackground (default: true) means if data expired,
        //       // return the outdated data first while invoking the sync method.
        //       // If syncInBackground is set to false, and there is expired data,
        //       // it will wait for the new data and return only after the sync completed.
        //       // (This, of course, is slower)
        //       syncInBackground: true,
          
        //       // you can pass extra params to the sync method
        //       // see sync example below
        //       syncParams: {
        //         extraFetchOptions: {
        //           // blahblah
        //         },
        //         someFlag: true
        //       }
        //     })
        //     .then(ret => {
        //       // found data go to then()
        //       console.log(ret.userid);
        //     })
        //     .catch(err => {
        //       // any exception including data not found
        //       // goes to catch()
        //       console.warn(err.message);
        //       switch (err.name) {
        //         case 'NotFoundError':
        //           // TODO;
        //           break;
        //         case 'ExpiredError':
        //           // TODO
        //           break;
        //       }
        //     });
        //console.log(insets)

    }
    const openLink = async (url) => {
        await WebBrowser.openBrowserAsync(url);
      };
    return (
        <View style={{flex:1}}>
            {/* <View style={[layout.rowContainer, layout.headerContainer]}>
                <Pressable onPress={() => navigation.goBack()} hitSlop={50}>
                    <Text style={layout.regularText} >{"ᐸ"}</Text>
                </Pressable>
            </View> */}
            {/* <WebView source={{ uri: url }} style={{ flex: 1 }} onScroll={onScrollArticleView} allowsInlineMediaPlayback={true} mediaPlaybackRequiresUserAction={true} /> */}

            {openLink(url)}
            
        </View>

    );
}
/*            */
const styles = StyleSheet.create({

});

export default ArticleViewer;