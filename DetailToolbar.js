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
  _onPressShareButton: function() {
    // TODO:
    ToastAndroid.show('分享', ToastAndroid.SHORT);
  },
  _onPressCollectButton: function() {
    // TODO:
    ToastAndroid.show('收藏', ToastAndroid.SHORT);
  },
  _onPressCommentButton: function() {
    // TODO:
    ToastAndroid.show('分享', ToastAndroid.SHORT);
  },
  _onPressPriseButton: function() {
    // TODO:
    ToastAndroid.show('评论', ToastAndroid.SHORT);
  },
  render: function() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return(
      <View {...this.props}>
        <View style={styles.actionsContainer}>
          <TouchableElement onPress={this._onPressBackButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.backIcon}
                source={require('image!ic_back')}
                resizeMode='contain' />
            </View>
          </TouchableElement>
          <View style={{flex: 1}} />
          <TouchableElement onPress={this._onPressCommentButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIconWithCount}
                source={require('image!ic_action_share')}
                resizeMode='contain' />
              <Text style={styles.count}>
                {this.state.isLoading ? '...' : this.props.news.title}
              </Text>
            </View>
          </TouchableElement>
          <TouchableElement onPress={this._onPressPraiseButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIconWithCount}
                source={require('image!ic_action_chat')}
                resizeMode='contain' />
              <Text style={styles.count}>
                {this.state.isLoading ? '...' : this.state.extra.popularity}
              </Text>
            </View>
          </TouchableElement>
        </View>

      </View>
      // <ToolbarAndroid
      //   navIcon={require('image!ic_back')}
      //   onIconClicked={this.props.navigator.pop}
      //   titleColor="white"
      //   actions={[]} >
      // </ToolbarAndroid>
    );
  },

});

var styles = StyleSheet.create({
  actionsContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 32,
    height: 32,
    marginLeft: 8,
    marginRight: 8,
  },
  actionItem: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  actionIcon: {
    width: 32,
    height: 32,
  },
  actionIconWithCount: {
    width: 32,
    height: 32,
    marginLeft: 5,
  },
  count: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  },
});

module.exports = DetailToolbar;