import { CurrentRenderContext } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight, RefreshControl, Dimensions } from 'react-native';
//import NewsAPI from '../services/news'

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MockArticles from '../mock/mock.json';
import { api } from '../util';

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
      currentReadStartTime: false
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

  onPressArticle(item) {
    const navigation = this.props.navigation;

    navigation.navigate('Webview', { url: item.amp_url || item.url })
    this.setState({ currentReadStartTime: new Date().toJSON(), currentReadItem: item.id })
  }
  //, height: this.state.scrollViewHeight 

  formatDateString(json_date, language = "DE") {
    const date = new Date(json_date)
    const currentDate = new Date()
    const diff = currentDate.getTime() - date.getTime()



    if ((diff / 1000) <= 60) {
      return this.secondsAgo(language)
    }
    else if ((diff / 1000 / 60) < 60) {
      //minutes ago
      return this.minutesAgo(Math.floor((diff / 1000 / 60)).toString(), language)
    }
    else if ((diff / 1000 / 60 / 60) < 24) {
      //hours ago
      return this.hoursAgo(Math.floor((diff / 1000 / 60 / 60)).toString(), language)
    }
    else if ((diff / 1000 / 60 / 60 / 24) < 10) {
      //hours ago
      return this.daysAgo(Math.floor((diff / 1000 / 60 / 60 / 24)).toString(), language)
    }

    return date.toLocaleDateString()
  }

  secondsAgo(language) {
    switch (language) {
      case "DE":
        return "Vor wenigen Sekunden"
      case "EN":
        return "Seconds ago"

      default:
        break;
    }
  }
  minutesAgo(number, language) {
    switch (language) {
      case "DE": if (number == 1) {
        return "Vor " + number + " Minute"
      }
        return "Vor " + number + " Minuten"
      case "EN":
        if (number == 1) {
          return number + " minute ago"
        }
        return number + " minutes ago"

      default:
        break;
    }
  }
  hoursAgo(number, language) {

    switch (language) {
      case "DE":
        if (number == 1) {
          return "Vor " + number + " Stunde"
        }
        return "Vor " + number + " Stunden"
      case "EN":
        if (number == 1) {
          return number + " hour ago"
        }
        return number + " hours ago"

      default:
        break;

    }
    return "break"
  }

  daysAgo(number, language) {
    switch (language) {
      case "DE":
        return "Vor " + number + " Tagen"
      case "EN":
        return number + " days ago"

      default:
        break;
    }
  }

  render() {

    const news = (
      <>

        {
          this.state.articles.map((item: any, index: number) => {
            //rconsole.log(item.amp_url)
            return (<TouchableHighlight key={index + "a"} onPress={this.onPressArticle.bind(this, item)} activeOpacity={1} underlayColor="rgba(255,255,255,0.1)" delayPressOut={40} delayPressIn={80} >
              <View style={{ ...styles.newsItem, height: this.state.scrollViewHeight }} >
                <Text style={styles.newsUrl}>{item.publisher}</Text>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Image style={{ width: '100%', height: 350, marginVertical: 10 }} resizeMode="cover" source={{ uri: item.image_url || "https://picsum.photos/id/362/600/1300/" }} />
                <Text style={styles.newsbody}>{item.summary.substring(0, 500)}</Text>
                <Text style={styles.newsDate}>{this.formatDateString(item.publish_date, "DE")}</Text>
              </View>
            </TouchableHighlight>)
          })}
      </>
    );
    //pagingEnabled={true} 
    return (
      <View style={{ ...styles.container, marginTop: 44 }} >

        <ScrollView style={{ flex: 1 }} onScrollEndDrag={this.onLoadMore.bind(this)} pagingEnabled={true} scrollEventThrottle={100} onScroll={this.onScroll.bind(this)} showsVerticalScrollIndicator={false} refreshControl={
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
      </View>
    );
  }
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  listItemKpiBox: {
    justifyContent: "flex-end",
  },
  row: {
    padding: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  rowVertical: {
    width: 150
  },
  text: {
    color: "#fff"
  },


  newsContainer: {
    backgroundColor: '#000',
    width: "100%",
  },
  listTitle: {
    padding: 30,
    paddingLeft: 10,
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold"
  },
  newsItem: {
    color: "#fff",
    padding: 10,
    justifyContent: "center",
    flexDirection: "column",

  },
  newsUrl: {
    color: "#aaa",
    fontSize: 15,
    fontFamily: "RobotoSlab-Light"

  },
  newsTitle: {
    textAlign: "auto",
    fontFamily: "RobotoSlab-Bold",
    color: "white",
    fontSize: 26,
  },
  newsbody: {
    lineHeight: 24,
    textAlign: "auto",
    fontFamily: "RobotoSlab-Regular",
    color: "white",
    fontSize: 16,
  },
  newsDate: {
    marginTop: 5,
    color: "#aaa",
    fontSize: 10,
    fontFamily: "RobotoSlab-Light"
  },


  listItem: {

    color: "#fff",
    height: 60,

    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

  },
  listItemText: {

    color: "#fff",
  },
  lable: {
    color: "#888",
    fontWeight: "normal",
    fontSize: 16,
    flex: 5
  },
  value: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    flex: 3
  },
  rowItem: {
    flex: 1,
    flexDirection: "row"
  },
});
