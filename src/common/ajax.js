import CONFIG from '../config/index'
import 'whatwg-fetch'

/**
 * AJAX
 * @prop url 请求地址的尾部
 * @prop args 参数, 下面为具体内容
 * @prop method GET OR POST
 * @prop data  GET DATA
 * @prop opts.headers REQUEST HEADER
 * @prop opts.body REQUEST POST DATA
 */
export default async (ajaxOptions) => {
  const {type = 'POST', data = {}} = ajaxOptions
  // 判断为get请求时，不能携带请求体（body），参数也要拼在url后面
  const isGet = type.toLowerCase() === 'get'
  const reqBody = isGet ? null : (param(data) || null)
  if (ajaxOptions.url && ajaxOptions.url.indexOf('http') === -1) {
    ajaxOptions.url = CONFIG.PREFIX + ajaxOptions.url
  }
  const url = isGet && param(data) ? ajaxOptions.url + '?' + param(data) : ajaxOptions.url
  let response = {}

  try {
    response = await fetch(url, {
      method: type,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: reqBody,
      credentials: 'same-origin'
    }).then(res => res.json())

    return response
  } catch (e) {
    console.log(e)
    return null
  }
}

/**
 * 对象转换成request paraments string
 * @param obj
 * @param prefix
 */
const param = (obj, prefix) => {
  const str = []
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p, v = obj[p]
      str.push((v !== null && typeof v === 'object') ? param(v, k)
        : encodeURIComponent(k) + '=' + encodeURIComponent(v))
    }
  }
  return str.join('&')
}
