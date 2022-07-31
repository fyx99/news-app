import { CurrentRenderContext } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight, RefreshControl, Dimensions, Pressable, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text as ThemedText, View as ThemedView } from '../components/Themed';
//import NewsAPI from '../services/news'

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useColorScheme from '../hooks/useColorScheme';

import MockArticles from '../mock/mock.json';
import { api } from '../util';
import Colors from '../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { formatDateString, formatTooLongText } from '../theme/formatters';

export default function NewsScreen(props: any) {
  return (<>
    <NewsScreenInner {...props} />
  </>)
}

interface IState {
  articles: object[];
  refreshing: boolean;
  scrollViewHeight: number;
  offset: number;
  impressions: object[];
  reads: object[];
  currentItem: number;
  currentViewStartTime: any;
  currentReadStartTime: any;
  currentReadItem: any;
  publisherModalVisible: boolean;
}

class NewsScreenInner extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      articles: [],
      refreshing: true,
      scrollViewHeight: 0,
      offset: 0,
      impressions: [],
      reads: [],
      currentItem: 0,
      currentViewStartTime: 0,
      currentReadItem: false,
      currentReadStartTime: false,
      publisherModalVisible: false
    };
  }
  async getArticles(offset = 0) {
    let articles = await api("/feed?offset=" + offset, undefined) || []

    // articles = articles.splice(45)
    //   .map(value => ({ value, sort: Math.random() }))
    //   .sort((a, b) => a.sort - b.sort)
    //   .map(({ value }) => value)
    //console.log(articles)
    return articles
  }

  async componentDidMount() {
    // const articles = MockArticles
    this.props.navigation.addListener('focus', this.read.bind(this));

    this.setState({ articles: await this.getArticles(), refreshing: false, currentViewStartTime: new Date().toJSON() });

  }

  async onRefresh() {
    this.setState({ refreshing: true })
    let newArticles = await this.getArticles()
    this.setState({ refreshing: false, articles: newArticles })
  }

  async onLoadMore() {
    const newOffset = this.state.offset + 20
    let newArticles = await this.getArticles(newOffset)
    this.setState({ articles: this.state.articles.concat(newArticles), offset: newOffset })

  }

  async impression(position) {
    if (position != this.state.currentItem && this.state.articles.length) {
      // console.log("impression")
      // console.log(position)
      await this.setState({ impressions: [...this.state.impressions, { article: this.state.articles[position]["id"], startTime: this.state.currentViewStartTime, endTime: new Date().toJSON() }], currentItem: position, currentViewStartTime: new Date().toJSON() })
      // console.log(this.state.impressions)
    }
  }


  onScroll(evt) {
    console.log("scroll " + evt.nativeEvent.contentOffset)

    let contentOffset = evt.nativeEvent.contentOffset.y
    let layoutHeight = evt.nativeEvent.layoutMeasurement.height
    let currentItem = Math.floor(contentOffset / layoutHeight)
    let nextItem = currentItem + 1
    let nextVisibility = (contentOffset % layoutHeight) / layoutHeight
    let currentVisibility = 1 - nextVisibility

    if (contentOffset % layoutHeight == 0) {
      this.impression(currentItem)
    }

  }

  async read() {
    console.log("ROUTE ------------------")
    console.log(this.props)
    const para = this.props.route.params

    console.log(this.props.route)
    if (this.state.currentReadItem) {
      await this.setState({ reads: [...this.state.reads, { article_id: this.state.currentReadItem, startTime: this.state.currentReadStartTime, endTime: new Date().toJSON() }], currentReadItem: false, currentReadStartTime: false })
      console.log(this.state.reads)
    }

  }
  refresh(a) {
    console.log("REFRESH")
    console.log(a)
    console.log(this.props)
  }

  async onPressArticle(item) {
    const navigation = this.props.navigation;

    //navigation.navigate('Webview', { url: item.amp_url || item.url })
    //https://docs.expo.dev/versions/latest/sdk/webbrowser/#webbrowseropenoptions
    const openoptions: WebBrowser.WebBrowserOpenOptions = {
      dismissButtonStyle: 'cancel',
      readerMode: true
    };

    const res = await WebBrowser.openBrowserAsync(item.amp_url || item.url, openoptions);
    console.log(res)

    this.setState({ currentReadStartTime: new Date().toJSON(), currentReadItem: item.id })
  }
  //, height: this.state.scrollViewHeight 

  onPressPublisher(item, e) {
    console.log(item)
    console.log(e)
    //this.setState({ publisherModalVisible: true })
    const navigation = this.props.navigation;
    navigation.navigate('Modal', { publisher: item })
  }

  render() {

    const news = (
      <>

        {
          this.state.articles.map((item: any, index: number) => {
            //rconsole.log(item.amp_url)
            return (<TouchableHighlight key={index + "a"} onPress={this.onPressArticle.bind(this, item)} activeOpacity={1} underlayColor="rgba(255,255,255,0.1)" delayPressOut={40} delayPressIn={80} >
              <View style={{ ...styles.newsItem, height: this.state.scrollViewHeight }} >

                <Image style={{ width: '100%', height: 350, }} resizeMode="cover" source={{ uri: item.image_url || "https://picsum.photos/id/362/600/1300/" }} />
                <View style={styles.newsTextPart}>

                  <View style={styles.newsPublisherBlock} >
                    <Pressable style={styles.newsPublisherBlockPressable} onPress={this.onPressPublisher.bind(this, item)}>
                      <Image style={styles.newsPublisherIcon} resizeMode="cover" source={{ uri: item.icon_url || "https://www.n-tv.de/resources/57615475/responsive/img/touch/apple-touch-icon-144x144-precomposed.png" }} />
                      <ThemedText style={styles.newsPublisherUrl}>{item.publisher}</ThemedText>
                    </Pressable>
                  </View>

                  <ThemedText style={styles.newsTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.newsbody}>{formatTooLongText(item.summary)}</ThemedText>
                  <Text style={styles.newsDate}>{formatDateString(item.publish_date, "DE")}</Text>


                  <View style={styles.newsInteractionBar}>
                    <View style={styles.newsInteractionItem}>
                      <Ionicons name={"heart-dislike-circle-outline"} size={30} color={"grey"} />
                    </View>
                    <View style={styles.newsInteractionItem}>
                      <Ionicons name={"share-social-outline"} size={30} color={"grey"} />
                    </View>
                    <View style={styles.newsInteractionItem}>
                      <Ionicons name={"ellipsis-vertical-sharp"} size={30} color={"grey"} />
                    </View>
                  </View>
                </View>

              </View>
            </TouchableHighlight>)
          })}
      </>
    );
    //pagingEnabled={true} 
    return (
      <ThemedView style={{ ...styles.newsContainer, }} >

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.publisherModalVisible}
          onRequestClose={() => {
            this.setState({ publisherModalVisible: !this.state.publisherModalVisible })
          }}
        >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Helo</Text>
            </View>
          </View>



        </Modal>
        <ScrollView style={{ flex: 1 }} onScrollEndDrag={this.onLoadMore.bind(this)} pagingEnabled={false} scrollEventThrottle={100} onScroll={this.onScroll.bind(this)} showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        } onLayout={(evt) => {
          const { height } = evt.nativeEvent.layout;
          this.setState({ scrollViewHeight: height })
        }}>
          <View style={{ ...styles.newsItem, height: this.state.refreshing ? this.state.scrollViewHeight : 0, }} ></View>
          {news}
        </ScrollView>
      </ThemedView>
    );
  }
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    height: "70%",
    width: "100%",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  newsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  newsItem: {
    justifyContent: "center",
    flexDirection: "column",

  },
  newsPublisherUrl: {
    fontSize: 17,
    fontFamily: "RobotoSlab-Bold",
    marginStart: 8
  },
  newsTextPart: {
    paddingHorizontal: 15,
    paddingTop: 10
  },
  newsPublisherBlock: {
    flexDirection: 'row',
  },
  newsPublisherBlockPressable: {
    flexDirection: 'row',
    padding: 5,
  },
  newsPublisherIcon: {
    width: 24,
    height: 24,
  },
  newsTitle: {
    textAlign: "auto",
    fontFamily: "RobotoSlab-Bold",
    fontSize: 26,
  },
  newsbody: {
    lineHeight: 24,
    textAlign: "auto",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 16,
  },
  newsDate: {
    marginTop: 5,
    color: "#aaa",
    fontSize: 10,
    fontFamily: "RobotoSlab-Light"
  },

  newsInteractionBar: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-end",

  },
  newsInteractionItem: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    padding: 4,
    paddingLeft: 10
  }

});
