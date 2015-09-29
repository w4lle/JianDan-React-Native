/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  StyleSheet,
  ToolbarAndroid,
  ToastAndroid,
  BackAndroid,
} = React;

var ToolbarAndroid = require('ToolbarAndroid');

var TimerMixin = require('react-timer-mixin');

var SplashScreen = require('./SplashScreen');
var NewsScreen = require('./NewsScreen');
var NewsDetailScreen = require('./NewsDetailScreen');

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});


var backHandler = {
  handler: null,
}

var JianDanReactNative = React.createClass({
  mixins: [TimerMixin],
  componentDidMount: function() {
    this.setTimeout(
      () => {
        this.setState({splashed: true});
      },
      2000,
    );
  },
  RouteMapper: function(route, navigationOperations, onComponentRef) {
      _navigator = navigationOperations;
      if (route.name === 'home') {
        return (
          <View style={styles.container}>
            <NewsScreen navigator={navigationOperations}/>
          </View>
        );
      } else if (route.name === 'news') {
        return (
          <View style={styles.container}>
            <NewsDetailScreen
              style={{flex: 1}}
              navigator={navigationOperations}
              news={route.news} />
          </View>
        );
      }
    },
    getInitialState: function() {
      return {
        splashed: false,
      };
    },
    onActionSelected: function(position) {
    },
  render: function() {
      if (this.state.splashed) {
        var initialRoute = {name: 'home'};
        return (
          <Navigator
            style={styles.container}
            initialRoute={initialRoute}
            configureScene={() => Navigator.SceneConfigs.FadeAndroid}
            renderScene={this.RouteMapper}
          />
        );
      } else {
        return (
          <SplashScreen />
        );
      }
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('JianDanReactNative', () => JianDanReactNative);
