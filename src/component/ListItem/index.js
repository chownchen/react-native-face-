/**
 * zdchen created in 2018/4/11
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native'
import store from '../../store'

export default class ListItem extends Component {

  // props作为item数据源
  constructor(props) {
    super(props)
  }

  deleteItem(e){

    store.dispatch({
      type: 'DELETE',
      info: {index: this.props.index}
    })
  }

  jumpToDetail(){
    this.props.navigation.navigate('Detail', {item: this.props.item})
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, styles.centerCenter]}
                        onPress={this.jumpToDetail.bind(this)}>
        <View style={[styles.flexLeft]}>
          <Image style={[styles.images]}
                 source={{uri: this.props.item.img}}/>
        </View>
        <View style={[styles.flexCenter]}>
          <Text style={styles.title}>
            {this.props.item.title}
          </Text>
          <Text style={styles.instructions} numberOfLines={2}>
            {this.props.item.content}
          </Text>
        </View>
        <View style={[styles.centerCenter, {paddingRight: 10}]}>
          <Text style={styles.delete} onPress={this.deleteItem.bind(this)}>删除</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

// 传参校验
// ListItem.propTypes = {
//   item: PropTypes.json
// }

// notes
// 样式格式可以写成混合形式 {[styles.centerCenter, {paddingRight: 5}]}
// 组合样式如'1px solid #e3e3e3', 一般不能这么写，具体需要查询相关api(部分以前的api也不一定有，不是简单的'-'换驼峰)

const styles = StyleSheet.create({
  centerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    marginBottom: 5
  },
  flexLeft: {
    padding: 5,
  },
  flexCenter: {
    flex: 1,
    padding: 5,
  },
  flexRight: {
    backgroundColor: '#aae444',
  },
  images: {
    width: 50,
    height: 50
  },
  delete: {
    color: 'red',
    fontSize: 20,
    padding: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#666666',
    borderRadius: 6
  },
  title: {
    color: '#333333',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  instructions: {
    color: '#666666',
    marginBottom: 5,
    fontSize: 12,
  }
});
