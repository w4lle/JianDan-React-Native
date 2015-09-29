'use strict';

var React = require('react-native');
var {
  AppRegistry,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Image,
  ToolbarAndroid,
  TouchableHighlight,
} = React;

var precomputeStyle = require('precomputeStyle');

var WebView = require('./WebView');
var DetailToolbar = require('./DetailToolbar');
var REF_HEADER = 'header';
var PIXELRATIO = PixelRatio.get();

var NewsDetailScreen = React.createClass({
  getInitialState: function() {
    return({
      isLoading: false,
      detail: null,
      scrollY: 0,
    });
  },
  componentDidMount: function() {
    this.fetchStroyDetail();
  },
  fetchStroyDetail: function() {
    var reqUrl = this.props.news.url;
    this.setState({
      isLoading: true,
      detail: null,
    });
  },
  onWebViewScroll: function(event) {
    //console.log('ScrollY: ' + event);
    var scrollY = -event / PIXELRATIO;
    var nativeProps = precomputeStyle({transform: [{translateY: scrollY}]});
    this.refs[REF_HEADER].setNativeProps(nativeProps);
  },
  render: function() {
    var toolbar = <DetailToolbar navigator={this.props.navigator} style={styles.toolbar}
      news={this.props.news}/>;
        return (
          <View {...this.props} style={styles.container}>
            <WebView
            automaticallyAdjustContentInsets={false}
            url={this.props.news.url}
            javaScriptEnabledAndroid={true}
            onNavigationStateChange={this.onNavigationStateChange}
            startInLoadingState={true}
            scalesPageToFit={this.state.scalesPageToFit}
            style={styles.content}
            onScrollChange={this.onWebViewScroll}/>
            {toolbar}
          </View>
        );
    },
});

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 56,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  headerImage: {
    height: 200,
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 56,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top:56,
  },
});

module.exports = NewsDetailScreen;