'use strict';

var React = require('react-native');
var {
  AsyncStorage,
  Platform,
  Dimensions,
  ListView,
  Image,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  ToastAndroid,
  BackAndroid,
} = React

var TimerMixin = require('react-timer-mixin');
var NewsItem = require('./NewsItem');

var DRAWER_WIDTH_LEFT = 56;

var NEWS_URL = 'http://jandan.net/?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,comment_count,custom_fields&custom_fields=thumb_c,views&dev=1&page=';
var page = 1;

var ListScreen = React.createClass({
  mixins: [TimerMixin],
    getInitialState: function() {
      var dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });

      return {
        isLoading: false,
        isLoadingTail: false,
        dataSource: dataSource,
      };
    },
  componentWillMount: function() {
      BackAndroid.addEventListener('hardwareBackPress', false);
    },
  componentDidMount: function() {
    this.fetchData(true);
  },
  fetchData: function(isRefresh) {
    var url = NEWS_URL + page;
    fetch(url)
      .then((response) => response.json())
      .catch((error) => {
        LOADING[themeId] = false;
          this.setState({
            isLoading: (isRefresh ? false : this.state.isLoading),
            isLoadingTail: (isRefresh ? this.state.isLoadingTail : false),
            dataSource: this.state.dataSource,
          });
      })
    .then((responseData) => {
      this.setState({
        isLoading: (isRefresh ? false : this.state.isLoading),
        isLoadingTail: (isRefresh ? this.state.isLoadingTail : false),
        dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
      });
    })
    .done();
  },
  renderSectionHeader: function(sectionData: Object,
      sectionID: number | string) {
      if (this.state.theme) {
        return (
          <View></View>
        );
      } else {
        return (
          <Text style={styles.sectionHeader}>
            {'新鲜事'}
          </Text>
        );
      }
    },
  onSelectNews: function(news: Object){
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: news.title,
        component: StoryScreen,
        passProps: {news},
      });
    } else {
      this.props.navigator.push({
        title: news.title,
        name: 'news',
        news: news,
      });
    }
  },
  renderRow: function(
      news: Object,
      sectionID: number | string,
      rowID: number | string,
      highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
    ) {
      return (
        <NewsItem
          key={news.id}
          onSelect={() => this.onSelectNews(news)}
          onHighlight={() => highlightRowFunc(sectionID, rowID)}
          onUnhighlight={() => highlightRowFunc(null, null)}
          news={news}
        />
      );
    },
    onEndReached: function() {
      console.log('onEndReached() ' + this.state.isLoadingTail);
      if (this.state.isLoadingTail) {
        return;
      }
      page ++;
      this.fetchData(false);
    },
  render: function() {
      var content = this.state.dataSource.getRowCount() === 0 ?
        <View style={styles.container}></View> :
        <ListView
          ref="listview"
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onEndReached={this.onEndReached}
          renderSectionHeader={this.renderSectionHeader}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
        />;
      var title = '新鲜事';
        return (
          <DrawerLayoutAndroid
            ref={(drawer) => { this.drawer = drawer; }}
            drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
            keyboardDismissMode="on-drag"
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => <Text>jiandan</Text>}>
            <View style={styles.container}>
              <ToolbarAndroid
                title={title}
                titleColor="white"
                navIcon={require('image!ic_drawer')}
                style={styles.toolbar}
                onIconClicked={() => this.drawer.openDrawer()}
                onActionSelected={this.onActionSelected} />
              {content}
            </View>
          </DrawerLayoutAndroid>
        );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  toolbar: {
    backgroundColor: '#000000',
    height: 56,
  },
  rator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 14,
    color: '#888888',
    margin: 10,
    marginLeft: 16,
  }
});

module.exports = ListScreen;