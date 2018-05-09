/**
 * zdchen created in 2018/4/11
 */

import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux'
import store from '../../store'

import ListItem from './../../component/ListItem'
import Camera from 'react-native-camera'
import RNFS from 'react-native-fs'
import $$ from '../../common/Tools'
import 'whatwg-fetch';
import { captureScreen } from "react-native-view-shot";
let TimerMixin = require('react-timer-mixin');

class List extends Component {

  static navigationOptions = {
    title: '列表页',
  }

  constructor(props) {
    super(props)

    this.state = {
      cameraType: Camera.constants.Type.front,
      tokenList: [],
    };
  }

  componentDidMount(){

    const defaultState = []

    // for(let i = 0;i < 20; i++){
    //   defaultState.push(
    //     { img: `http://pic118.nipic.com/pic/20161221/15114570_141250313033_4.jpg`,
    //       title: `第${i + i + i + i + i}条标题`,
    //       content: `我是第${i + i + i + i + i}条内容，我是第${i + i + i + i + i}条内容，
    //           我是第${i + i + i + i + i}条内容，我是第${i + i + i + i + i}条内容，
    //           我是第${i + i + i + i + i}条内容，我是第${i + i + i + i + i}条内容，
    //           我是第${i + i + i + i + i}条内容，我是第${i + i + i + i + i}条内容，
    //           我是第${i + i + i + i + i}条内容，我是第${i + i + i + i + i}条内容，
    //           我是第${i + i + i + i + i}条内容。`
    //     }
    //   )
    // }
    //
    // store.dispatch({
    //   type: 'QUERY',
    //   info: {list: defaultState}
    // })

    this.poolingGetPic()
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer);
  }

  poolingGetPic() {
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log('执行快～～～～～')
      this.takePicture()
    }, 3000)
  }
  render() {
    return (
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            type={this.state.cameraType}
            aspect={Camera.constants.Aspect.fill}>
            <Text style={styles.capture} onPress={this.poolingGetPic.bind(this)}>[重新开始]</Text>
          </Camera>

          {/*<FlatList*/}
            {/*data={this.props.list}*/}
            {/*renderItem={({item, index}) => (*/}
              {/*<ListItem item={item} index={index} navigation={this.props.navigation}></ListItem>*/}
            {/*)}*/}
          {/*/>*/}

        </View>
    )
  }

  //切换前后摄像头
  switchCamera() {
    var state = this.state;
    if(state.cameraType === Camera.constants.Type.back) {
      state.cameraType = Camera.constants.Type.front;
    }else{
      state.cameraType = Camera.constants.Type.back;
    }
    this.setState(state);
  }

  //拍摄照片
  takePicture() {
    let that = this

    captureScreen({
      format: "jpg",
      quality: 0.5
    })
      .then(
        uri => {
          console.log("Image saved to", uri)
          // 图片转成base64码
          RNFS.readFile(uri, 'base64')
            .then((content) => {

              // content 为获取到的图片base64码
              that.searchApi(content, uri)
            })
            .catch((err) => {
              console.log("reading error: " + err);
            })
        },
        error => console.error("Oops, snapshot failed", error)
      );


    // const options = {jpegQuality: 30}
    //
    // this.camera.capture(options)
    //   .then(function(data){
    //     console.log('data: ', data)
    //     console.log('data: ', data.path)
    //
    //
    //     // 图片转成base64码
    //     RNFS.readFile(data.path, 'base64')
    //       .then((content) => {
    //
    //       // content 为获取到的图片base64码
    //         that.searchApi(content, data.path)
    //       })
    //       .catch((err) => {
    //         console.log("reading error: " + err);
    //       })
    //   })
    //   .catch(err => console.error(err));
  }

  searchApi(photoBase64, urlPath){
    let that = this
    fetch("https://api-cn.faceplusplus.com/facepp/v3/detect", {
      method: "POST",
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: param({
        "api_key": "tibSYho0duYAL3N6bPuLxIhZP2TmBjWI",
        "api_secret": "E8g0zkaCvFCOT5cXBuFxf2ONO1utcJhM",
        "image_base64": photoBase64
      })
    }).then((response) => response.json()).then(function (res) {

      // 数组中第一个元素的头最大
      console.log('faceId', res)
      if(res && res.faces && res.faces[0]){
        console.log("fetch request ", res.faces[0].face_token)
        alert('获取人脸成\n，得到的face_token：' + res.faces[0].face_token)
      }else {
        console.log('没脸拍照')
        that.poolingGetPic()
      }

      // 校验完后删除照片
      // RNFS.unlink(urlPath)
      //   .then(() => {
      //     console.log('FILE DELETED');
      //   })


    }).catch(function (e) {
      console.log("fetch fail", e)
    })
  }
}

let mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

const param = (obj, prefix) => {
  const str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push((v !== null && typeof v === "object") ? param(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};

export default connect( mapStateToProps )(List)