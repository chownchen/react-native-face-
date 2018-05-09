/**
 * Created by Coderge on 2017/5/10.
 */
import React from 'react';
import 'whatwg-fetch';
import {
  ToastAndroid,
  NativeModules,
} from 'react-native';

const $$ = {};
$$.navigator = {};
$$.globalConfig = {}

/**
 * fetch方法再封装，url必填
 * @param ajaxOptions
 */
$$.getAjax = (ajaxOptions) => {
  const {type = 'POST', data = {}, success, successErr, error} = ajaxOptions;
  // 判断为get请求时，不能携带请求体（body），参数也要拼在url后面
  const isGet = type.toLowerCase() === 'get';
  const reqBody = isGet ? null : ($$.param(data) || null);
  let start_time = new Date().getTime();

  fetch(
    ajaxOptions.url, {
    method: type,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: reqBody,
    credentials: 'same-origin'
  }).then(res => res.json()).then(json => {
    success(json);
  }).catch(ex => {
  });
};

export default $$;
