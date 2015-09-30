'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Platform,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  ToastAndroid,
} = React;

var SwitchAndroid = require('SwitchAndroid');
var ToolbarAndroid = require('ToolbarAndroid');

var DetailToolbar = React.createClass({
  getInitialState: function() {
    return({
      isLoading: true,
      extra: null,
    });
  },
  componentDidMount: function() {
  },
  _onPressBackButton: function() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  },
  render: function() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return(
       <ToolbarAndroid
         navIcon={require('image!ic_action_back')}
         style={styles.toolbar}
         onIconClicked={this.props.navigator.pop}
         titleColor="white"
         title={this.props.news.title}
         actions={[]} >
       </ToolbarAndroid>
    );
  }

});

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#000000',
    height: 56,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  actionsContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

module.exports = DetailToolbar;