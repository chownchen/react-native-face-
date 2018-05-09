
 // mokeInterface

export default Reducer = (state = {list: []}, action) => {
  const { type, info } = action
  switch (type) {

    case 'QUERY':
      return Object.assign({}, state, {list: info.list})

    // 关键字查询
    case 'SEARCH':
      return state.list.filter(item => item.title.indexOf(info.keyword) > -1)

    // 删除操作
    case 'DELETE':
      let backup = state
      let { list } = backup
      list.splice(info.index, 1)

      // 对象中存在array，需要使用JSON.parse(JSON.stringfy(list)) 深拷贝
      backup.list = JSON.parse(JSON.stringify(list))
      return Object.assign({}, state, backup)

    default:
      return state
  }
}