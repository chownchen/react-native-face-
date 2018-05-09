/**
 * zdchen created in 2018/4/11
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store/index'

import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import List from './pages/List';
import Detail from './pages/Detail';

const Wrap = StackNavigator(
  {
    List: {screen: List},
    Detail: {screen: Detail},
  },
  {
    initialRouteName: 'List',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitleStyle: {
        color: 'green',
        alignSelf: 'center' // 无效！！！～～
      },
    },
  }
)

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Wrap></Wrap>
      </Provider>
    )
  }
}