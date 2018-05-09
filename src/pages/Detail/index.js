/**
 * zdchen created in 2018/4/11
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class List extends Component {

  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: '详情页',
  }

  render() {

    const {item} = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor:'#ee3333'}}>
          <Image style={[styles.images, {resizeMode: Image.resizeMode.stretch}]}
                 source={{uri: item.img}}/>
        </View>
        <View>
          <Text style={styles.title}>
            item.title
          </Text>
          <Text>
            item.content
          </Text>
        </View>
        <View style={{flex: 1, backgroundColor:'#ee3333'}}>
          <Image style={[styles.images, {resizeMode: Image.resizeMode.stretch}]}
                 source={{uri: item.img}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#F5FCFF',
  },
  images: {
    flex: 1,
    height: 120
  },
  title: {
    color: '#333333',
    marginBottom: 5,
    fontWeight: 'bold'
  },
});

